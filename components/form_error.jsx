import { TriangleAlert } from "lucide-react";

export const FormError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center gap-2 text-destructive bg-destructive p-2 rounded-md my-6 transition-all duration-300 hover:bg-destructive/80 hover:shadow-md">
      <TriangleAlert size={20} className="text-destructive-foreground" />
      <p className="text-destructive-foreground">{error}</p>
    </div>
  );
};
