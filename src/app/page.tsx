import { PasswordGenerator } from "@/components/password-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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
             <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
               <div>
                <h4 className="font-semibold mb-2 text-card-foreground">General</h4>
                 <div className="flex flex-col gap-1">
                  <p>
                    &copy; 2026 PassGenius v<Link href="/changelog" className="font-medium text-primary hover:underline">0.1</Link>
                  </p>
                  <p>
                    A free and open-source project.
                  </p>
                 </div>
               </div>
               <Separator orientation="vertical" className="h-12 hidden md:block" />
               <div>
                 <h4 className="font-semibold mb-2 text-card-foreground">Legal</h4>
                 <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                   <Link href="/terms" className="hover:underline">Terms of Service</Link>
                   <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                   <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
                   <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
                   <Link href="/dmca" className="hover:underline">DMCA</Link>
                   <Link href="/ugc" className="hover:underline">UGC</Link>
                 </div>
               </div>
             </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
