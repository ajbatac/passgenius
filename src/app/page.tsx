"use client";

import { PasswordGenerator } from "@/components/password-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";

import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Github, CornerRightUp } from "lucide-react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bookmarkletRef = useRef<HTMLAnchorElement>(null);

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

  // Set bookmarklet href directly on the DOM to bypass React's javascript: URL sanitization
  useEffect(() => {
    if (bookmarkletRef.current) {
      const code = `javascript:(function(){var w=420;var h=window.screen.height;var left=window.screen.width-w;window.open('https://passgenius.techhive.net','PassGeniusSidebar','width='+w+',height='+h+',top=0,left='+left+',scrollbars=yes,resizable=yes');})();`;
      bookmarkletRef.current.setAttribute('href', code);
    }
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

          {/* Bookmarklet Section */}
          <div className="mt-24 mb-16 w-full relative">
            <div className="relative group p-[1px] rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-primary/30 via-secondary/30 to-primary/30 hover:from-primary hover:via-secondary hover:to-primary transition-all duration-700 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
              <div className="relative p-12 md:p-20 rounded-[3.5rem] bg-black/95 backdrop-blur-3xl flex flex-col items-center gap-10 text-center border border-white/5">
                
                {/* Integrated Curved Arrow */}
                <div className="absolute top-8 right-12 flex flex-col items-center gap-1 group-hover:translate-y-[-4px] transition-transform duration-500 pointer-events-none">
                  <CornerRightUp className="text-primary w-8 h-8 drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]" />
                  <p className="text-[10px] font-mono tracking-[0.3em] text-primary/70 font-bold uppercase">Drag To Bar</p>
                </div>

                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-brand font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary text-transparent bg-clip-text animate-mesh-gradient">
                    PassGenius Sidebar
                  </h3>
                  <p className="text-muted-foreground/90 text-sm md:text-lg lg:text-xl font-medium leading-relaxed">
                    Generate secure passwords without leaving your current tab. Drag the button below to your bookmarks bar for instant access as a sidebar.
                  </p>
                </div>

                <div className="relative group/btn-container">
                  <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse pointer-events-none" />
                  <a 
                    ref={bookmarkletRef}
                    href="#"
                    className="relative px-12 py-6 bg-primary text-primary-foreground font-black rounded-[2rem] flex items-center gap-6 shadow-[0_0_30px_rgba(79,70,229,0.7)] hover:shadow-[0_0_50px_rgba(79,70,229,1)] transition-all transform hover:-translate-y-3 active:translate-y-0 cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 group/btn"
                    title="Drag and Drop to Your Bookmarks Bar"
                    draggable={true}
                  >
                    <div className="p-1 rounded-lg">
                      <Image 
                        src="/favicon.svg" 
                        alt="" 
                        width={36} 
                        height={36} 
                        className="w-9 h-9" 
                      />
                    </div>
                    <span className="tracking-[0.2em] uppercase text-lg sm:text-2xl drop-shadow-md">PassGenius</span>
                  </a>
                </div>
                
                <div className="flex flex-col gap-3 opacity-50 hover:opacity-100 transition-opacity">
                  <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase font-mono font-black">
                    Drag & Drop To Your Bar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
