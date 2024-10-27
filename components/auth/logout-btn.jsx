"use client";

import { logout } from "@/actions/logout";

export const LogoutBtn = ({ children }) => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <button onClick={handleLogout} className="text-foreground cursor-pointer">
      {children}
    </button>
  );
};
