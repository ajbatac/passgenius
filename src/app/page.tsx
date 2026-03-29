"use client";

import { PasswordGenerator } from "@/components/password-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";

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
      <nav className="absolute top-0 w-full p-4 z-20 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex-1 flex justify-start items-center">
          <Link href="/">
            <Image 
              src="/passgenius-logo.png" 
              alt="PassGenius Logo" 
              width={240} 
              height={60} 
              className="h-12 w-auto md:h-16 hover:opacity-90 transition-opacity" 
              priority
            />
          </Link>
        </div>
        
        <div className="hidden sm:flex flex-1 justify-center items-center">
          <a 
            href="https://github.com/ajbatac/passgenius" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform active:scale-95 group"
          >
            <Badge variant="default" className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-bold text-[11px] tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] group-hover:scale-105 transition-all border-none flex items-center gap-2">
              <Github size={13} className="fill-current" />
              100% Open Source
            </Badge>
          </a>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-5xl mt-4 md:mt-6 lg:scale-[1.02] flex-grow flex flex-col justify-center">
        <div className="space-y-8 p-4 md:p-12 pb-0 pt-0">
          <header className="text-center mb-10 mt-0">
            <h1 className="font-brand text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text animate-mesh-gradient pb-2 drop-shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              PassGenius
            </h1>
            <p className="mt-4 text-base md:text-lg text-foreground/90 font-medium max-w-2xl mx-auto">
              PassGenius creates powerful, private passwords right on your screen, working 100% offline with no cloud, no database, and zero logins required.
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
        </div>
      </div>
      <Footer />
    </main>
  );
}
