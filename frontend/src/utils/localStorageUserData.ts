export const setLocalStorageUserData = (userData: object) => {
  console.log("localStorage userData: ", userData);
  const expirationTime = new Date().getTime() + 20 * 1000;
  userData = {
    ...userData,
    expirationTime,
  };
  console.log("userData: ", userData);
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const clearLocalStorage = () => {
  localStorage.removeItem("userData");
};

export const getLocalStorageUserData = (): object | null => {
  const userDataString = localStorage.getItem("userData");
  if (!userDataString) {
    console.log("No user data found in local storage.");
    return null;
  }

  const userData = JSON.parse(userDataString);
  const currentTime = new Date().getTime();

  if (currentTime > userData.expirationTime) {
    console.log("Stored user data has expired.");
    localStorage.removeItem("userData"); // Optional: remove expired data from storage
    return null;
  }

  console.log("Retrieved user data: ", userData);
  return userData;
};
