export const Header = ({ label }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <h1 className="font-bold text-3xl">Authentication</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
