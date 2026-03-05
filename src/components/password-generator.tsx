"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clipboard, RefreshCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StrengthIndicator } from "./strength-indicator";
import { AiSuggester } from "./ai-suggester";

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
  includeSymbols: true,
  excludeAmbiguous: true,
};

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(INITIAL_OPTIONS);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState<number | null>(null);

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
      setPasswords(Array(3).fill('Select a character set'));
      return;
    }
    
    const charsetLength = charset.length;
    const newPasswords: string[] = [];

    for (let j = 0; j < 3; j++) {
        let newPassword = '';
        const randomValues = new Uint32Array(options.length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < options.length; i++) {
          newPassword += charset[randomValues[i] % charsetLength];
        }
        newPasswords.push(newPassword);
    }
    setPasswords(newPasswords);
  }, [options]);

  useEffect(() => {
    generatePassword();
  }, [options, generatePassword]);

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
  
  const handleApplySuggestion = (suggestion: Partial<PasswordOptions>) => {
    setOptions(prev => ({...prev, ...suggestion}));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>
              Use the options below to configure your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="length" className="text-base">Password Length</Label>
                <span className="font-headline text-xl text-primary">{options.length}</span>
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
          <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-muted/50 p-4 sm:p-6">
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
              <Label htmlFor="ambiguous" className="text-base">Exclude Ambiguous (l, 1, I, O, 0)</Label>
              <Switch id="ambiguous" checked={options.excludeAmbiguous} onCheckedChange={(checked) => handleOptionChange('excludeAmbiguous', checked)} />
            </div>
          </CardFooter>
        </Card>
        
        <AiSuggester onSuggestionApplied={handleApplySuggestion} />
      </div>

      {/* Right Column */}
      <div className="space-y-8 lg:sticky lg:top-8 h-min">
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Passwords</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={generatePassword}
                aria-label="Generate new passwords"
              >
                <RefreshCcw className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {(passwords.length > 0 ? passwords : Array(3).fill("...")).map((password, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-muted/50 p-3"
                >
                  <p
                    className="flex-grow font-headline text-xl text-primary break-all"
                    aria-live="polite"
                  >
                    {password}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(password, index)}
                    aria-label={`Copy password ${index + 1}`}
                    disabled={!password || password.startsWith("Select") || password === "..."}
                  >
                    {isCopied === index ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clipboard className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <StrengthIndicator password={passwords[0] || ""} options={options} />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
