
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clipboard, RefreshCcw, Info, ShieldAlert, ShieldCheck, LoaderCircle, AlertTriangle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StrengthIndicator } from "./strength-indicator";
import { CrackTimeEstimator } from "./crack-time-estimator";
import { wordlist } from "@/lib/wordlist";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { PasswordOptions, PronounceableOptions } from "@/lib/types";
import { checkPwnedHash } from "@/app/actions";
import { cn } from "@/lib/utils";

const INITIAL_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: true,
};

const INITIAL_PRONOUNCEABLE_OPTIONS: PronounceableOptions = {
  wordCount: 4,
  separator: "-",
};

type PwnedStatus = number | 'loading' | 'error';

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(INITIAL_OPTIONS);
  const [pronounceableOptions, setPronounceableOptions] = useState<PronounceableOptions>(INITIAL_PRONOUNCEABLE_OPTIONS);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [displayPasswords, setDisplayPasswords] = useState<string[]>([]);
  const [isScrambling, setIsScrambling] = useState(false);
  const [isCopied, setIsCopied] = useState<number | null>(null);
  const [generatorMode, setGeneratorMode] = useState<'random' | 'pronounceable'>('random');
  const [pwnedStatus, setPwnedStatus] = useState<PwnedStatus[]>([]);
  const [history, setHistory] = useState<string[][]>([]);

  const sha1 = async (str: string): Promise<string> => {
    const buffer = new TextEncoder().encode(str);
    const hash = await window.crypto.subtle.digest('SHA-1', buffer);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generatePasswords = useCallback(() => {
    let newPasswords: string[] = [];
    if (generatorMode === 'random') {
      const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lower = 'abcdefghijklmnopqrstuvwxyz';
      const nums = '0123456789';
      const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
      const ambiguous = 'l1IO0';

      let charset = '';
      if (options.includeUppercase) charset += upper;
      if (options.includeLowercase) charset += lower;
      if (options.includeNumbers) charset += nums;
      if (options.includeSymbols) charset += syms;

      if (options.excludeAmbiguous) {
        charset = charset.split('').filter(char => !ambiguous.includes(char)).join('');
      }

      if (charset.length === 0) {
        return Array(5).fill('Select a character set');
      }
      
      const charsetLength = charset.length;
      for (let j = 0; j < 5; j++) {
          let newPassword = '';
          const randomValues = new Uint32Array(options.length);
          window.crypto.getRandomValues(randomValues);
          for (let i = 0; i < options.length; i++) {
            newPassword += charset[randomValues[i] % charsetLength];
          }
          newPasswords.push(newPassword);
      }
    } else {
      const { wordCount, separator } = pronounceableOptions;
      if (wordCount === 0) {
        return Array(5).fill('Select number of words');
      }
      const wordlistLength = wordlist.length;
      for (let j = 0; j < 5; j++) {
        const passphraseWords: string[] = [];
        const randomValues = new Uint32Array(wordCount);
        window.crypto.getRandomValues(randomValues);
        for (let i = 0; i < wordCount; i++) {
          passphraseWords.push(wordlist[randomValues[i] % wordlistLength]);
        }
        newPasswords.push(passphraseWords.join(separator));
      }
    }
    return newPasswords;
  }, [options, generatorMode, pronounceableOptions]);

  const generateAndCheckPasswords = useCallback(async () => {
    setIsScrambling(true);
    let scrambleInterval: NodeJS.Timeout;
    let scrambleTicks = 0;
    const maxTicks = 10; // ~400ms at 40ms/tick

    // Scrambling effect
    scrambleInterval = setInterval(() => {
      scrambleTicks++;
      const randomChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const scrambled = Array(5).fill(0).map(() => 
        Array.from({length: options.length || 16}, () => randomChars[Math.floor(Math.random() * randomChars.length)]).join('')
      );
      setDisplayPasswords(scrambled);
      
      if (scrambleTicks >= maxTicks) {
        clearInterval(scrambleInterval);
        const finalPasswords = generatePasswords();
        setPasswords(prev => {
          if (prev.length > 0 && prev[0] && !prev[0].startsWith('Select') && prev[0] !== '...') {
            setHistory(h => [prev, ...h].slice(0, 5));
          }
          return finalPasswords;
        });
        setDisplayPasswords(finalPasswords);
        setIsScrambling(false);
        checkBreaches(finalPasswords);
      }
    }, 40);

  }, [generatePasswords, options.length]);

  const checkBreaches = async (newPasswords: string[]) => {
    setPwnedStatus(Array(newPasswords.length).fill('loading'));
    const results = await Promise.all(
      newPasswords.map(async (p) => {
        if (!p || p.startsWith('Select')) return 0;
        try {
          const hash = await sha1(p);
          const prefix = hash.substring(0, 5);
          const suffix = hash.substring(5).toUpperCase();
          return await checkPwnedHash(prefix, suffix);
        } catch {
          return 'error' as PwnedStatus;
        }
      })
    );
    setPwnedStatus(results);
  };

  useEffect(() => {
    generateAndCheckPasswords();
  }, [options, generatorMode, pronounceableOptions, generateAndCheckPasswords]);

  const handleRegenerate = () => {
    generateAndCheckPasswords();
  };

  const handleCopy = (password: string, index: number) => {
    if (password && !password.startsWith('Select') && password !== '...') {
      navigator.clipboard.writeText(password);
      setIsCopied(index);
      setTimeout(() => setIsCopied(null), 2000);
    }
  };

  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };



  // Calculate overall strength
  const calculateStrength = () => {
    let score = 0;
    
    if (generatorMode === 'random') {
      const len = options.length;
      score += len * 2;
      let types = 0;
      if (options.includeUppercase) types++;
      if (options.includeLowercase) types++;
      if (options.includeNumbers) types++;
      if (options.includeSymbols) types++;
      score += types * 10;
      if (types === 4) score += 10;
    } else {
      const entropy = (pronounceableOptions.wordCount || 0) * Math.log2(wordlist.length);
      score = (entropy / 128) * 100 * 2;
    }
    
    const normalizedScore = Math.min(Math.round(score), 100);
    
    if (normalizedScore < 25) return { color: "var(--destructive)", shadow: "0 0 20px rgba(244,63,94,0.4)" }; // Alert Red
    if (normalizedScore < 50) return { color: "var(--chart-2)", shadow: "0 0 20px rgba(249,115,22,0.4)" }; // Orange
    if (normalizedScore < 75) return { color: "var(--secondary)", shadow: "0 0 20px rgba(147,51,234,0.4)" }; // Cyber Purple
    if (normalizedScore < 90) return { color: "var(--primary)", shadow: "0 0 30px rgba(79,70,229,0.5)" }; // Bright Indigo
    return { color: "var(--success)", shadow: "0 0 30px rgba(16,185,129,0.5)" }; // Acid Emerald
  };

  const currentStrength = calculateStrength();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 items-start relative z-10">
      {/* Configuration Panel */}
      <div 
        className="rounded-[2rem] p-6 md:p-8 bg-foreground/[0.02] backdrop-blur-[15px] border border-foreground/10 transition-shadow duration-500 flex flex-col gap-8 flex-1 h-full"
        style={{ boxShadow: currentStrength.shadow }}
      >
        <h2 className="text-2xl font-headline tracking-wide text-foreground mb-2">Password Options</h2>
        <Tabs value={generatorMode} onValueChange={(v) => setGeneratorMode(v as 'random' | 'pronounceable')} className="flex-grow flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-foreground/5 border border-foreground/10 mb-6 relative hover:bg-foreground/10 transition-colors">
             <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <TabsTrigger value="random" className="data-[state=active]:bg-foreground/10 data-[state=active]:text-primary transition-all font-headline tracking-widest text-xs uppercase data-[state=active]:shadow-[inset_0_-2px_0_rgba(79,70,229,0.8)]">Random</TabsTrigger>
            <TabsTrigger value="pronounceable" className="data-[state=active]:bg-foreground/10 data-[state=active]:text-primary transition-all font-headline tracking-widest text-xs uppercase data-[state=active]:shadow-[inset_0_-2px_0_rgba(79,70,229,0.8)]">Pronounceable</TabsTrigger>
          </TabsList>
          
          <TabsContent value="random" className="space-y-6 flex-grow outline-none mt-0">
          {/* Length Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-foreground/80">
              <Label htmlFor="length" className="text-base tracking-wide">Password Length</Label>
              <div className="bg-foreground/5 border border-foreground/10 px-3 py-1 rounded-md text-primary font-code shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                {options.length}
              </div>
            </div>
            <Slider
              id="length"
              min={8}
              max={64}
              step={1}
              value={[options.length]}
              onValueChange={(value) => handleOptionChange('length', value[0])}
              aria-label={`Password length: ${options.length}`}
            />
          </div>

          <div className="space-y-6 pt-4">
            {/* Toggles */}
            <div className="flex items-center justify-between group">
              <Label htmlFor="uppercase" className="font-normal text-base text-foreground/80 group-hover:text-foreground transition-colors cursor-pointer">Uppercase (A-Z)</Label>
              <Switch id="uppercase" checked={options.includeUppercase} onCheckedChange={(checked) => handleOptionChange('includeUppercase', checked)} />
            </div>
            <div className="flex items-center justify-between group">
              <Label htmlFor="lowercase" className="font-normal text-base text-foreground/80 group-hover:text-foreground transition-colors cursor-pointer">Lowercase (a-z)</Label>
              <Switch id="lowercase" checked={options.includeLowercase} onCheckedChange={(checked) => handleOptionChange('includeLowercase', checked)} />
            </div>
            <div className="flex items-center justify-between group">
              <Label htmlFor="numbers" className="font-normal text-base text-foreground/80 group-hover:text-foreground transition-colors cursor-pointer">Numbers (0-9)</Label>
              <Switch id="numbers" checked={options.includeNumbers} onCheckedChange={(checked) => handleOptionChange('includeNumbers', checked)} />
            </div>
            <div className="flex items-center justify-between group">
              <Label htmlFor="symbols" className="font-normal text-base text-foreground/80 group-hover:text-foreground transition-colors cursor-pointer">Symbols (!@#...)</Label>
              <Switch id="symbols" checked={options.includeSymbols} onCheckedChange={(checked) => handleOptionChange('includeSymbols', checked)} />
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <Label htmlFor="ambiguous" className="font-normal text-base text-foreground/80 group-hover:text-foreground transition-colors cursor-pointer">Exclude Ambiguous</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="h-4 w-4 text-foreground/40 hover:text-foreground/80 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-background/95 backdrop-blur-md border border-foreground/10 text-foreground font-code">
                            <p>Excludes: l, 1, I, O, 0</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
              <Switch id="ambiguous" checked={options.excludeAmbiguous} onCheckedChange={(checked) => handleOptionChange('excludeAmbiguous', checked)} />
            </div>
          </div>
          </TabsContent>

          <TabsContent value="pronounceable" className="space-y-6 flex-grow outline-none mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-foreground/80">
                <Label htmlFor="wordCount" className="text-base tracking-wide">Word Count</Label>
                <div className="bg-foreground/5 border border-foreground/10 px-3 py-1 rounded-md text-primary font-code shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
                  {pronounceableOptions.wordCount}
                </div>
              </div>
              <Slider
                id="wordCount"
                min={2}
                max={10}
                step={1}
                value={[pronounceableOptions.wordCount]}
                onValueChange={(value) => setPronounceableOptions(prev => ({ ...prev, wordCount: value[0] }))}
                aria-label={`Word count: ${pronounceableOptions.wordCount}`}
              />
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center text-foreground/80">
                <Label htmlFor="separator" className="text-base tracking-wide">Separator String</Label>
              </div>
              <Input 
                id="separator" 
                value={pronounceableOptions.separator} 
                onChange={(e) => setPronounceableOptions(prev => ({ ...prev, separator: e.target.value }))}
                className="bg-background/40 border-foreground/10 text-foreground font-code h-12 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all font-bold text-lg px-4"
                placeholder="e.g. -, _, space"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <CrackTimeEstimator 
            mode={generatorMode} 
            options={options} 
            pronounceableOptions={pronounceableOptions} 
          />
        </div>
      </div>

      {/* Vault Panel */}
      <div 
        className="rounded-[2rem] p-6 md:p-8 bg-foreground/[0.02] backdrop-blur-[15px] border border-foreground/10 transition-shadow duration-500 h-full flex flex-col"
        style={{ boxShadow: currentStrength.shadow }}
      >
        <h2 className="text-2xl font-headline tracking-wide text-secondary mb-6">Results Vault</h2>
        <div className="space-y-4 flex-grow">
          {(displayPasswords.length > 0 ? displayPasswords : Array(5).fill("...")).map((password, index) => {
            const status = pwnedStatus[index];
            const isDisabled = isScrambling || !password || password.startsWith("Select") || password === "...";

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-foreground/10 bg-background/40 p-3.5 transition-all group",
                  isScrambling ? "animate-scramble" : "hover:border-primary/50 hover:bg-background/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
                )}
              >
                <p
                  className="flex-grow font-code text-lg tracking-wider text-foreground break-all"
                  aria-live="polite"
                >
                  {password}
                </p>

                {!isDisabled && (
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {status === 'loading' && <LoaderCircle className="h-4 w-4 animate-spin text-foreground/40" />}
                            {typeof status === 'number' && status > 0 && <ShieldAlert className="h-5 w-5 text-destructive drop-shadow-[0_0_5px_rgba(244,63,94,0.8)]" />}
                            {typeof status === 'number' && status === 0 && <ShieldCheck className="h-5 w-5 text-success drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />}
                            {status === 'error' && <AlertTriangle className="h-5 w-5 text-destructive" />}
                        </TooltipTrigger>
                        <TooltipContent className="bg-background/90 backdrop-blur-md border border-foreground/10 text-foreground font-code">
                            {status === 'loading' && <p>Checking...</p>}
                            {typeof status === 'number' && status > 0 && <p>Compromised in breaches!</p>}
                            {typeof status === 'number' && status === 0 && <p>Safe & Secure</p>}
                            {status === 'error' && <p>Check failed</p>}
                        </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <TooltipProvider>
                  <Tooltip open={isCopied === index ? true : undefined}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-colors h-8 w-8 rounded-lg"
                        onClick={() => handleCopy(password, index)}
                        aria-label={`Copy password ${index + 1}`}
                        disabled={isDisabled}
                      >
                        {isCopied === index ? (
                          <Check className="h-4 w-4 text-success drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                        ) : (
                          <Clipboard className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-success text-white border-0 font-code font-bold shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                      <p className="flex items-center gap-2"><Check className="h-4 w-4"/> Encrypted & Copied</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>

        {/* Liquid Strength Gauge */}
        <div className="mt-8 mb-6 relative">
          <StrengthIndicator 
            password={passwords[0] || ""} 
            options={options} 
            mode={generatorMode}
            wordCount={pronounceableOptions.wordCount}
          />
        </div>

        <Button
          onClick={handleRegenerate}
          className="w-full h-12 rounded-xl bg-transparent border-2 border-primary/50 text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 font-headline uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] active:scale-95 group overflow-hidden relative"
          disabled={isScrambling}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <RefreshCcw className={cn("h-4 w-4 mr-2", isScrambling ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500")} />
          Regenerate
        </Button>

        {history.length > 0 && (
          <div className="mt-6 pt-6 border-t border-foreground/10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="history" className="border-b-0">
                <AccordionTrigger className="text-secondary hover:text-primary transition-colors hover:no-underline font-headline tracking-widest text-sm uppercase py-2">
                  View Password History
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-4">
                    {history.map((histGroup, grpIdx) => (
                      <div key={grpIdx} className="space-y-2 p-3 rounded-lg bg-background/20 border border-foreground/5 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="text-xs text-foreground/40 mb-2 uppercase tracking-wide font-headline">Generation {history.length - grpIdx}</div>
                        {histGroup.map((histPass, pIdx) => (
                          <div key={pIdx} className="flex items-center justify-between group/hist rounded px-2 hover:bg-foreground/5 transition-colors">
                             <span className="font-code text-foreground/70 text-sm truncate pr-4">{histPass}</span>
                             <TooltipProvider>
                               <Tooltip open={isCopied === Number(`99${grpIdx}${pIdx}`) ? true : undefined}>
                                 <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover/hist:opacity-100 transition-opacity text-foreground/50 hover:text-foreground hover:bg-foreground/10"
                                      onClick={() => handleCopy(histPass, Number(`99${grpIdx}${pIdx}`))}
                                    >
                                      {isCopied === Number(`99${grpIdx}${pIdx}`) ? <Check className="h-3 w-3 text-success drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]"/> : <Clipboard className="h-3 w-3"/>}
                                    </Button>
                                 </TooltipTrigger>
                                 <TooltipContent className="bg-success text-white border-0 font-code font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                                    <p className="flex items-center gap-2"><Check className="h-3 w-3"/> Copied</p>
                                 </TooltipContent>
                               </Tooltip>
                             </TooltipProvider>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
