import express, { Request, Response, Router } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, CreateUserInput } from "./users.d";

export const userRouter: Router = express.Router();

// Make sure these are put in a .env file
const ACCESS_KEY = process.env.ACCESS_KEY as string;
const REFRESH_KEY = process.env.REFRESH_KEY as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const ACCESS_COOKIE_EXPIRY = parseInt(
  process.env.ACCESS_COOKIE_EXPIRY || "900000",
  10
); // Convert string to integer
const REFRESH_COOKIE_EXPIRY = parseInt(
  process.env.REFRESH_COOKIE_EXPIRY || "604800000",
  10
); // Convert string to integer

if (!process.env.ACCESS_KEY) {
  throw new Error("ACCESS_KEY environment variable is not defined.");
}

if (!process.env.REFRESH_KEY) {
  throw new Error("REFRESH_KEY environment variable is not defined.");
}

/****************************************
 * * Get All Users
 * @returns {User[]} - Array of all users
 ****************************************/
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users: User[] = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/******************************************
 * * Create New User
 * @returns {User} - The newly created user
 ******************************************/
userRouter.post("/create", async (req: Request, res: Response) => {
  const { name, email, password }: CreateUserInput = req.body;
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const existingUser: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    const user: User = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    delete user.password;

    // Tokens are created to authenticate the user
    const accessToken: string = jwt.sign({ userId: user.id }, ACCESS_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken: string = jwt.sign({ userId: user.id }, REFRESH_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: ACCESS_COOKIE_EXPIRY,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_COOKIE_EXPIRY,
    });

    res.cookie("isAuthenticated", "True", {
      httpOnly: false,
      maxAge: ACCESS_COOKIE_EXPIRY,
    });

    res.cookie("isRefreshable", "True", {
      httpOnly: false,
      maxAge: REFRESH_COOKIE_EXPIRY,
    });

    res.json(user);
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**************************************************
 * * Get A User By ID
 * @returns {User} - The user with the specified ID
 **************************************************/
userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (user === null) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    delete user.password;
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/************************************
 * * Delete A User By ID
 * @returns {User} - The deleted user
 ***********************************/
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user: User = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/********************************************
 * * Login User
 * @returns {newAccessToken, newRefreshToken}
 *******************************************/
userRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: User | null = await prisma.user.findUnique({
    where: { email },
  });

  if (user === null) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.password === undefined) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch: Boolean = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken: string = jwt.sign({ userId: user.id }, ACCESS_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken: string = jwt.sign({ userId: user.id }, REFRESH_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: ACCESS_COOKIE_EXPIRY,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_COOKIE_EXPIRY,
  });

  res.cookie("isAuthenticated", 'True', {
    httpOnly: false,
    maxAge: ACCESS_COOKIE_EXPIRY,
  });

  res.cookie("isRefreshable", 'True', {
    httpOnly: false,
    maxAge: REFRESH_COOKIE_EXPIRY,
  });

  delete user.password;

  console.log("user: ", user);

  res.json(user);
});

/********************************************
 * * Refresh Tokens
 * @returns {newAccessToken, newRefreshToken}
 *******************************************/
userRouter.post("/refresh", async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"];

  console.log("refreshToken: ", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const decoded = jwt.verify(refreshToken, REFRESH_KEY) as JwtPayload;

  const user: User | null = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = jwt.sign({ userId: user.id }, ACCESS_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const newRefreshToken = jwt.sign({ userId: user.id }, REFRESH_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: ACCESS_COOKIE_EXPIRY,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: REFRESH_COOKIE_EXPIRY,
  });

  res.cookie("isAuthenticated", 'True', {
    httpOnly: false,
    maxAge: ACCESS_COOKIE_EXPIRY,
  });

  res.cookie("isRefreshable", 'True', {
    httpOnly: false,
    maxAge: REFRESH_COOKIE_EXPIRY,
  });

  delete user.password;

  console.log("user: ", user);

  res.json(user);
});

/********************************************
 * * Logout User
 * @returns {message}
 *******************************************/
userRouter.post("/logout", (req: Request, res: Response) => {
  // Clear the accessToken cookie
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Clear the refreshToken cookie
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  // Clear the isAuthenticated cookie
  res.cookie("isAuthenticated", "", {
    httpOnly: false,
    expires: new Date(0),
  });

  // Clear the isRefreshable cookie
  res.cookie("isRefreshable", "", {
    httpOnly: false,
    expires: new Date(0),
  });

  // Send a response indicating the user was logged out
  res.status(200).json({ message: "Logged out successfully" });
});
