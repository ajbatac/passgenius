import { PasswordGenerator } from "@/components/password-generator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-background p-4 md:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-5xl space-y-8 mt-16">
        <header className="text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter bg-gradient-to-br from-primary via-chart-3 to-chart-2 text-transparent bg-clip-text md:text-7xl">
            PassGenius
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Generate secure, unique passwords with ease.
          </p>
        </header>

        <PasswordGenerator />
        
        <footer className="text-center text-sm text-muted-foreground pt-8">
          <p>
            An Open Source project.
          </p>
        </footer>
      </div>
    </main>
  );
}
