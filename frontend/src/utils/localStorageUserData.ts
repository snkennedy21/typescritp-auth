export const setLocalStorageUserData = (userData: object) => {
  const expirationTime = new Date().getTime() + 20 * 1000;
  userData = {
    ...userData,
    expirationTime,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const clearLocalStorageUserData = () => {
  localStorage.removeItem("userData");
};

export const getLocalStorageUserData = (): object | null => {
  const userDataString = localStorage.getItem("userData");
  if (!userDataString) {
    return null;
  }

  const userData = JSON.parse(userDataString);
  const currentTime = new Date().getTime();

  if (currentTime > userData.expirationTime) {
    localStorage.removeItem("userData");
    return null;
  }

  return userData;
};
