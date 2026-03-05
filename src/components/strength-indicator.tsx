"use client";

import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type StrengthIndicatorProps = {
  password?: string;
  options: {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  };
};

type StrengthLevel = {
  level: "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong" | "N/A";
  score: number;
  color: string;
};

export function StrengthIndicator({ password, options }: StrengthIndicatorProps) {
  const strength = useMemo<StrengthLevel>(() => {
    if (!password) return { level: "N/A", score: 0, color: "bg-muted" };

    let score = 0;
    const len = options.length;

    // Length score
    score += len * 2;

    // Character type score
    let types = 0;
    if (options.includeUppercase) types++;
    if (options.includeLowercase) types++;
    if (options.includeNumbers) types++;
    if (options.includeSymbols) types++;
    
    score += types * 10;
    
    if (types === 4) score += 10; // Extra bonus for all types

    // Normalize to 100
    const normalizedScore = Math.min(Math.round(score * 1.2), 100);

    if (normalizedScore < 25) return { level: "Very Weak", score: 20, color: "bg-red-500" };
    if (normalizedScore < 50) return { level: "Weak", score: 40, color: "bg-orange-500" };
    if (normalizedScore < 75) return { level: "Medium", score: 60, color: "bg-yellow-500" };
    if (normalizedScore < 90) return { level: "Strong", score: 80, color: "bg-lime-500" };
    return { level: "Very Strong", score: 100, color: "bg-green-500" };
  }, [password, options]);

  return (
    <div className="space-y-2">
      <Progress value={strength.score} className="h-2" indicatorClassName={cn("transition-all duration-300", strength.color)} />
      <p className="text-right text-sm font-medium text-muted-foreground">
        Strength: <span className={cn(strength.color.replace('bg-', 'text-'))}>{strength.level}</span>
      </p>
    </div>
  );
}
