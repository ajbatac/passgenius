import { PasswordGenerator } from "@/components/password-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter bg-gradient-to-br from-primary via-chart-3 to-chart-2 text-transparent bg-clip-text md:text-7xl">
            PassGenius
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Generate secure, unique passwords with ease.
          </p>
        </header>

        <PasswordGenerator />
        
        <footer className="text-center text-sm text-muted-foreground">
          <p>
            An Open Source project.
          </p>
        </footer>
      </div>
    </main>
  );
}
