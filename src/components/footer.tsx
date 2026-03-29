import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-center text-xs text-muted-foreground/50 pt-16 pb-8 relative z-10 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
          <div>
            <p>
              &copy; {new Date().getFullYear()} PassGenius v<Link href="/changelog" className="font-medium text-primary/70 hover:text-primary transition-colors">0.2.0</Link> Uncompromising privacy and security.
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

        <div className="my-6">
          <a 
            href="https://github.com/ajbatac/passgenius" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group hover:text-foreground transition-colors duration-300"
          >
            <Github size={14} className="group-hover:rotate-[360deg] transition-transform duration-500" />
            <span className="font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">PROUDLY OPEN-SOURCE</span>
          </a>
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-semibold mb-1">Support the Developer</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <a 
              href='https://ko-fi.com/N4N11N420X' 
              target='_blank' 
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform active:scale-95"
            >
              <img 
                height='36' 
                style={{ border: '0px', height: '36px' }} 
                src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' 
                alt='Buy Me a Coffee at ko-fi.com' 
              />
            </a>
            <a 
              href="https://www.buymeacoffee.com/emailsig" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform active:scale-95"
            >
              <img 
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                alt="Buy Me A Coffee" 
                style={{ height: '36px', width: 'auto' }} 
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
