import React, { useEffect, useState } from "react";
import { useTestAuthQuery } from "../../store/mainApi";
import Cookies from "js-cookie";

const TestAuth = () => {
  const { data, error, isLoading } = useTestAuthQuery();
  const [timer, setTimer] = useState("");

  useEffect(() => {
    const decodeJWT = (token: any) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    };

    const updateTimer = () => {
      const token = Cookies.get("isAuthenticated");
      if (!token) {
        console.log("No authentication token found.");
        return;
      }

      const { exp } = decodeJWT(token);
      const expirationTime = exp * 1000;
      const countdown = () => {
        const currentTime = new Date().getTime();
        const distance = expirationTime - currentTime;

        if (distance < 0) {
          clearInterval(intervalId);
          setTimer("Expired");
          return;
        }

        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const milliseconds = Math.floor(distance % 1000);

        setTimer(`${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`);
      };

      countdown(); // Initial call to set timer immediately
      const intervalId = setInterval(countdown, 1); // Update every millisecond, but consider changing interval

      return () => clearInterval(intervalId);
    };

    updateTimer();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>You Are Not Authenticated!</div>;
  }

  return (
    <div>{timer ? <div>Cookie expires in: {timer}</div> : <div>Yes</div>}</div>
  );
};

export default TestAuth;
