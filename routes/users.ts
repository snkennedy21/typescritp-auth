import express, { Express, Request, Response, Router } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userRouter: Router = express.Router();

interface CreateUserInput {
  name: string;
  email: string;
  age: number;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password?: string;
}

// ************* //
// Get all users //
// ************* //
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users: User[] = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ***************** //
// Create a new user //
// ***************** //
userRouter.post("/create", async (req: Request, res: Response) => {
  const { name, email, age, password }: CreateUserInput = req.body;
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
        age,
        password: hashedPassword,
      },
    });
    delete user.password;
    res.json(user);
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// *********************** //
// Get a single user by ID //
// *********************** //
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

// ******************* //
// Delete a user by ID //
// ******************* //
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

// ************ //
// Login a user //
// ************ //
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

  const accessToken: string = jwt.sign(
    { userId: user.id },
    "super_secret_access_key",
    {
      expiresIn: "1m",
    }
  );
  const refreshToken: string = jwt.sign(
    { userId: user.id },
    "super_secret_refresh_key",
    {
      expiresIn: "1m",
    }
  );

  res.json({ accessToken, refreshToken });
});

// ******************* //
// Refresh User Tokens //
// ******************* //
userRouter.post("/refresh", async (req: Request, res: Response) => {
  const refreshToken: string | undefined =
    req.headers.authorization?.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const decoded = jwt.verify(
    refreshToken,
    "super_secret_refresh_key"
  ) as JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = jwt.sign(
    { userId: user.id },
    "super_secret_access_key",
    {
      expiresIn: "1m",
    }
  );
  const newRefreshToken = jwt.sign(
    { userId: user.id },
    "super_secret_refresh_key",
    {
      expiresIn: "1m",
    }
  );

  res.json({ newAccessToken, newRefreshToken });
});
