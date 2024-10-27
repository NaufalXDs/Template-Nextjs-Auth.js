"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutBtn } from "@/components/auth/logout-btn";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
export const UserBtn = ({ DropdownSide, DropdownAlign }) => {
  const user = useCurrentUser();
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-col items-center gap-y-2">
          <Avatar>
            <AvatarImage src={`${user?.image || ""}`} />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-card text-foreground w-40"
        align={DropdownAlign}
        side={DropdownSide}
      >
        <DropdownMenuItem className="cursor-pointer justify-center gap-x-2">
          <Button
            className="w-full"
            variant={pathname === "/profile" ? "default" : "outline"}
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </DropdownMenuItem>
        <LogoutBtn>
          <DropdownMenuItem className="cursor-pointer bg-red-500 text-white hover:bg-red-600">
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
