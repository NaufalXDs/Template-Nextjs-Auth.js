import { BadgeCheck } from "lucide-react";

export const FormSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-success bg-success p-2 rounded-md my-6 transition-all duration-300 hover:bg-success/80 hover:shadow-md">
      <BadgeCheck size={20} className="text-success-foreground" />
      <p className="text-success-foreground">{message}</p>
    </div>
  );
};
