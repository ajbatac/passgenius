import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { AlertTriangle, Clock, ShieldX, ShieldCheck, ShieldAlert } from 'lucide-react';
import type { PasswordOptions, PronounceableOptions } from '@/lib/types';
import { Progress } from './ui/progress';

interface CrackTimeEstimatorProps {
  mode: 'random' | 'pronounceable';
  options: PasswordOptions;
  pronounceableOptions: PronounceableOptions;
}

export function CrackTimeEstimator({ mode, options, pronounceableOptions }: CrackTimeEstimatorProps) {
  
  const estimate = useMemo(() => {
    let entropy = 0;

    if (mode === 'random') {
      let poolSize = 0;
      if (options.includeLowercase) poolSize += 26;
      if (options.includeUppercase) poolSize += 26;
      if (options.includeNumbers) poolSize += 10;
      if (options.includeSymbols) poolSize += 32;
      
      if (poolSize === 0) poolSize = 1; // Fallback
      entropy = options.length * Math.log2(poolSize);
    } 
    else if (mode === 'pronounceable') {
      // Using EFF large wordlist (7776 words)
      entropy = pronounceableOptions.wordCount * Math.log2(7776);
    }

    // Assume an attacker can compute 100 billion (1e11) hashes per second (fast offline attack)
    const guessesPerSecond = 100_000_000_000;
    
    // Total possible combinations = 2^entropy
    // Average guesses to crack = (2^entropy) / 2
    const totalGuesses = Math.pow(2, entropy);
    const secondsToCrack = (totalGuesses / 2) / guessesPerSecond;

    return {
      entropy,
      seconds: secondsToCrack
    };
  }, [mode, options, pronounceableOptions]);

  const formatTime = (seconds: number) => {
    if (seconds < 1) return { text: "Instantly", color: "text-destructive", icon: ShieldAlert };
    if (seconds < 60) return { text: `${Math.round(seconds)} seconds`, color: "text-destructive", icon: ShieldAlert };
    
    let minutes = seconds / 60;
    if (minutes < 60) return { text: `${Math.round(minutes)} minutes`, color: "text-orange-500", icon: AlertTriangle };
    
    let hours = minutes / 60;
    if (hours < 24) return { text: `${Math.round(hours)} hours`, color: "text-orange-500", icon: AlertTriangle };
    
    let days = hours / 24;
    if (days < 30) return { text: `${Math.round(days)} days`, color: "text-yellow-500", icon: Clock };
    
    let months = days / 30;
    if (months < 12) return { text: `${Math.round(months)} months`, color: "text-yellow-500", icon: Clock };
    
    let years = days / 365;
    if (years < 1000) return { text: `${Math.round(years)} years`, color: "text-green-500", icon: ShieldCheck };
    if (years < 1e6) return { text: `${Math.round(years / 1000)} thousand years`, color: "text-primary", icon: ShieldCheck };
    if (years < 1e9) return { text: `${Math.round(years / 1e6)} million years`, color: "text-primary", icon: ShieldCheck };
    if (years < 1e12) return { text: `${Math.round(years / 1e9)} billion years`, color: "text-primary", icon: ShieldCheck };
    
    return { text: "Trillions of years", color: "text-primary", icon: ShieldCheck };
  };

  const timeResult = formatTime(estimate.seconds);
  const Icon = timeResult.icon;

  // Calculate a 0-100 score for the progress bar based on entropy
  // Entropy > 80 is considered extremely strong
  const strengthScore = Math.min(100, Math.max(0, (estimate.entropy / 100) * 100));

  return (
    <Card className="bg-background/40 backdrop-blur-md border-border/10 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <span>Crack Time Estimate</span>
        </CardTitle>
        <CardDescription>
          Estimated time for a massive botnet (100 Billion guesses/sec) to crack this specific configuration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3 bg-secondary/10 px-4 py-3 rounded-xl border border-secondary/20">
            <Icon className={`w-8 h-8 ${timeResult.color} animate-pulse`} />
            <div className="flex flex-col">
              <span className={`text-2xl font-black font-headline tracking-wider ${timeResult.color}`}>
                {timeResult.text}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Complexity: ~{Math.round(estimate.entropy)} bits of entropy
              </span>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>Weak</span>
              <span>Unbreakable</span>
            </div>
            <Progress 
              value={strengthScore} 
              className="h-2 w-full" 
              indicatorClassName={
                strengthScore < 40 ? "bg-destructive" : 
                strengthScore < 70 ? "bg-yellow-500" :
                "bg-primary"
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
