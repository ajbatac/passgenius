"use client";

import { PasswordGenerator } from "@/components/password-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-background">
      {/* Animated Mesh Gradient Background */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 40%),
                       radial-gradient(circle at 80% 70%, hsl(var(--secondary)) 0%, transparent 40%)`,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
        }}
      />
      
      {/* Circuit-Board Lines */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="fixed inset-0 z-0 pointer-events-none animate-circuit-pulse bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTBoODB2ODBoLTgwem00MCAwdjgwIiBzdHJva2U9InJnYmEoNzksNzAsMjI5LDAuMikiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgLz48L3N2Zz4=')] opacity-30 mix-blend-screen" />

      {/* Top Navigation */}
      <nav className="absolute top-0 w-full p-4 z-20 flex justify-between items-center max-w-7xl mx-auto">
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

      <div className="relative z-10 w-full max-w-5xl mt-12 md:mt-0 lg:scale-[1.02]">
        <div className="space-y-8 p-4 md:p-12 pb-0 pt-0">
          <header className="text-center mb-10 mt-8">
            <h1 className="font-brand text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text animate-mesh-gradient pb-2 drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              PassGenius
            </h1>
            <p className="mt-4 text-base md:text-lg text-foreground/90 font-medium max-w-2xl mx-auto">
              An advanced password generator engineered to secure your credentials entirely on your device.
            </p>
            <div className="mt-5 flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-xs md:text-sm text-primary/80 font-mono tracking-widest uppercase">
              <span>Offline</span>
              <span className="text-primary/40">◆</span>
              <span>No Cloud</span>
              <span className="text-primary/40">◆</span>
              <span>No Login</span>
              <span className="text-primary/40">◆</span>
              <span>Local</span>
              <span className="text-primary/40">◆</span>
              <span>Secure & Private</span>
            </div>
          </header>

          <PasswordGenerator />
          
          <footer className="text-center text-xs text-muted-foreground/50 pt-16 pb-8">
             <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
               <div>
                  <p>
                    &copy; 2026 PassGenius v<Link href="/changelog" className="font-medium text-primary/70 hover:text-primary transition-colors">0.2.0</Link> Uncompromising privacy and security.
                  </p>
               </div>
               <Separator orientation="vertical" className="h-4 hidden md:block bg-border/30" />
               <div>
                 <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                   <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                   <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                   <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                   <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
                   <Link href="/dmca" className="hover:text-foreground transition-colors">DMCA</Link>
                   <Link href="/ugc" className="hover:text-foreground transition-colors">UGC</Link>
                 </div>
               </div>
             </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
