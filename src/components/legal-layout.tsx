import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function LegalLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center p-4 md:p-8 overflow-hidden bg-background">
      {/* Animated Mesh Gradient Background (Static version) */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 40%),
                       radial-gradient(circle at 80% 70%, hsl(var(--secondary)) 0%, transparent 40%)`,
          transform: `scale(1.1)`,
        }}
      />
      
      {/* Circuit-Board Lines */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="fixed inset-0 z-0 pointer-events-none animate-circuit-pulse bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTBoODB2ODBoLTgwem00MCAwdjgwIiBzdHJva2U9InJnYmEoNzksNzAsMjI5LDAuMikiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgLz48L3N2Zz4=')] opacity-30 mix-blend-screen" />

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full p-4 z-50 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image 
              src="/passgenius-logo.png" 
              alt="PassGenius Logo" 
              width={160} 
              height={40} 
              className="h-8 w-auto md:h-10 hover:opacity-90 transition-opacity" 
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-4xl mt-24 md:mt-32 pb-16">
        <div className="mb-8 relative z-50">
          <Button asChild variant="ghost" className="hover:bg-white/10 dark:hover:bg-white/10 dark:text-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border/20 bg-card/70 shadow-2xl backdrop-blur-xl text-card-foreground">
          <div className="flex flex-col space-y-1.5 p-6 border-b border-border/10">
            <h3 className="font-semibold leading-none tracking-tight text-3xl font-brand">{title}</h3>
          </div>
          <div className="p-6 space-y-4 text-card-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
