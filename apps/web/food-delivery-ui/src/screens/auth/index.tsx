"use client"

import LoginForm from "@/app/shared/auth/login";
import RegisterForm from "@/app/shared/auth/register";
import Verification from "@/app/shared/auth/verification";
import { useState } from "react";

const AuthScreen = ({ setOpen }: { setOpen: (e: boolean) => void }) => {
  const [activeState, setActiveState] = useState("Signup");

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
        {activeState === "Verification" && (
          <Verification setActiveState={setActiveState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;