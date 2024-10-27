import { CardWarp } from "@/components/auth/card";
import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
  return (
    <CardWarp
      header="Something went wrong"
      backhref="/auth/login"
      backlabel="Back to Login"
    >
      <div className="flex items-center justify-center w-full">
        <TriangleAlert className="w-10 h-10 text-red-500" />
      </div>
    </CardWarp>
  );
};
