"use client";

import { useRouter } from "next/navigation";

export const LoginBtn = ({ children }) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/auth/login`);
  };

  return (
    <span className="text-foreground cursor-pointer" onClick={clickHandler}>
      {children}
    </span>
  );
};
