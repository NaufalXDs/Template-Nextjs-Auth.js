export default function AuthLayout({ children }) {
  return (
    <main className="flex h-full w-full items-center justify-center text-foreground bg-background">
      {children}
    </main>
  );
}