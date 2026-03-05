import { PasswordGenerator } from "@/components/password-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-5xl rounded-xl bg-card/80 shadow-lg backdrop-blur-xl border border-border/10">
        <div className="space-y-8 p-8 md:p-12">
          <header className="text-center">
            <h1 className="font-headline text-5xl font-bold tracking-tighter bg-gradient-to-br from-primary via-chart-3 to-chart-2 text-transparent bg-clip-text">
              PassGenius
            </h1>
            <p className="mt-2 text-base text-muted-foreground font-normal">
              A free, private, and open-source password generator. Create secure passwords locally. No cloud, no login.
            </p>
          </header>

          <PasswordGenerator />
          
          <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>
              &copy; 2026 PassGenius v<Link href="/changelog" className="font-medium text-primary hover:underline">0.1</Link>
            </p>
            <p className="mt-1">
              A free and open-source project. Your privacy is respected.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
