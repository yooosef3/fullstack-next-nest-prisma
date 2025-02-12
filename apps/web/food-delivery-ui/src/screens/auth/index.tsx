"use client"

import LoginForm from "@/app/shared/auth/login";
import RegisterForm from "@/app/shared/auth/register";
import { useState } from "react";

const AuthScreen = ({ setOpen }: { setOpen: (e: boolean) => void }) => {
  const [activeState, setActiveState] = useState("Login");

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "screen") {
      setOpen(false);
    }
  };

  return (
    <div
      className="flex items-center justify-centerl"
      id="screen"
      onClick={handleClose}
    >
      <div className="w-full">
        {activeState === "Login" && (
          <LoginForm setActiveState={setActiveState}/>
        )}
        {activeState === "Signup" && (
          <RegisterForm setActiveState={setActiveState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;