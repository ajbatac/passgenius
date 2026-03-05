
"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { PasswordOptions } from "@/lib/types";
import { wordlist } from "@/lib/wordlist";

type StrengthIndicatorProps = {
  password?: string;
  options: PasswordOptions;
  mode: 'random' | 'pronounceable';
  wordCount?: number;
};

type StrengthLevel = {
  level: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong" | "N/A";
  score: number;
  color: string;
};

export function StrengthIndicator({ password, options, mode, wordCount }: StrengthIndicatorProps) {
  const strength = useMemo<StrengthLevel>(() => {
    if (!password) return { level: "N/A", score: 0, color: "bg-muted" };

    let score = 0;
    
    if (mode === 'random') {
      const len = options.length;
      score += len * 2;

      let types = 0;
      if (options.includeUppercase) types++;
      if (options.includeLowercase) types++;
      if (options.includeNumbers) types++;
      if (options.includeSymbols) types++;
      
      score += types * 10;
      if (types === 4) score += 10; // Extra bonus for all types

    } else { // 'pronounceable'
      const entropy = (wordCount || 0) * Math.log2(wordlist.length);
      score = (entropy / 128) * 100 * 2; // Normalize against a high benchmark (128 bits)
    }

    const normalizedScore = Math.min(Math.round(score), 100);

    if (normalizedScore < 25) return { level: "Very Weak", score: 20, color: "bg-chart-1" };
    if (normalizedScore < 50) return { level: "Weak", score: 40, color: "bg-chart-2" };
    if (normalizedScore < 75) return { level: "Medium", score: 60, color: "bg-chart-3" };
    if (normalizedScore < 90) return { level: "Strong", score: 80, color: "bg-chart-4" };
    return { level: "Very Strong", score: 100, color: "bg-chart-5" };
  }, [password, options, mode, wordCount]);

  return (
    <div className="space-y-2">
      <Progress value={strength.score} className="h-2" indicatorClassName={cn("transition-all duration-300", strength.color)} />
      <p className="text-right text-sm font-medium text-muted-foreground" aria-live="polite">
        Strength: <span className={cn(strength.color.replace('bg-', 'text-'))}>{strength.level}</span>
      </p>
    </div>
  );
}
