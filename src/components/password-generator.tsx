"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check, Clipboard, RefreshCcw, ShieldCheck } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StrengthIndicator } from "./strength-indicator";
import { AiSuggester } from "./ai-suggester";
import { cn } from "@/lib/utils";

type PasswordOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
};

const INITIAL_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
  excludeAmbiguous: true,
};

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(INITIAL_OPTIONS);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = useCallback(() => {
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
      setPassword('');
      return;
    }

    let newPassword = '';
    const charsetLength = charset.length;
    
    // For better randomness than Math.random()
    const randomValues = new Uint32Array(options.length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < options.length; i++) {
      newPassword += charset[randomValues[i] % charsetLength];
    }
    setPassword(newPassword);
  }, [options]);

  useEffect(() => {
    generatePassword();
  }, [options, generatePassword]);

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const handleApplySuggestion = (suggestion: Partial<PasswordOptions>) => {
    setOptions(prev => ({...prev, ...suggestion}));
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="flex items-center bg-card-foreground/5 p-4 sm:p-6">
            <p 
              key={password} 
              className="font-headline text-2xl sm:text-4xl text-accent-foreground flex-1 break-all pr-4 animate-fade-in"
              aria-live="polite"
            >
              {password || '...'}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={generatePassword}
                aria-label="Generate new password"
              >
                <RefreshCcw className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                aria-label="Copy password"
                disabled={!password}
              >
                {isCopied ? <Check className="h-5 w-5 text-green-400" /> : <Clipboard className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
            <StrengthIndicator password={password} options={options} />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="length" className="text-base">Password Length</Label>
                <span className="font-headline text-xl text-accent-foreground">{options.length}</span>
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
        </CardContent>
        <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-card-foreground/5 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase" className="text-base">Uppercase (A-Z)</Label>
            <Switch id="uppercase" checked={options.includeUppercase} onCheckedChange={(checked) => handleOptionChange('includeUppercase', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="lowercase" className="text-base">Lowercase (a-z)</Label>
            <Switch id="lowercase" checked={options.includeLowercase} onCheckedChange={(checked) => handleOptionChange('includeLowercase', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers" className="text-base">Numbers (0-9)</Label>
            <Switch id="numbers" checked={options.includeNumbers} onCheckedChange={(checked) => handleOptionChange('includeNumbers', checked)} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="symbols" className="text-base">Symbols (!@#...)</Label>
            <Switch id="symbols" checked={options.includeSymbols} onCheckedChange={(checked) => handleOptionChange('includeSymbols', checked)} />
          </div>
          <div className="flex items-center justify-between sm:col-span-2">
            <Label htmlFor="ambiguous" className="text-base">Exclude Ambiguous Characters (l, 1, I, O, 0)</Label>
            <Switch id="ambiguous" checked={options.excludeAmbiguous} onCheckedChange={(checked) => handleOptionChange('excludeAmbiguous', checked)} />
          </div>
        </CardFooter>
      </Card>
      
      <AiSuggester onSuggestionApplied={handleApplySuggestion} />

    </div>
  );
}
