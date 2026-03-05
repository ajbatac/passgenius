
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clipboard, RefreshCcw, ClipboardCopy, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StrengthIndicator } from "./strength-indicator";
import { AiSuggester } from "./ai-suggester";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { wordlist } from "@/lib/wordlist";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { PasswordOptions, PronounceableOptions } from "@/lib/types";

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

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(INITIAL_OPTIONS);
  const [pronounceableOptions, setPronounceableOptions] = useState<PronounceableOptions>(INITIAL_PRONOUNCEABLE_OPTIONS);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState<number | null>(null);
  const [isAllCopied, setIsAllCopied] = useState(false);
  const [generatorMode, setGeneratorMode] = useState<'random' | 'pronounceable'>('random');

  const generatePassword = useCallback(() => {
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
        setPasswords(Array(6).fill('Select a character set'));
        return;
      }
      
      const charsetLength = charset.length;
      const newPasswords: string[] = [];

      for (let j = 0; j < 6; j++) {
          let newPassword = '';
          const randomValues = new Uint32Array(options.length);
          window.crypto.getRandomValues(randomValues);

          for (let i = 0; i < options.length; i++) {
            newPassword += charset[randomValues[i] % charsetLength];
          }
          newPasswords.push(newPassword);
      }
      setPasswords(newPasswords);
    } else { // 'pronounceable'
      const { wordCount, separator } = pronounceableOptions;
      if (wordCount === 0) {
        setPasswords(Array(6).fill('Select number of words'));
        return;
      }

      const newPasswords: string[] = [];
      const wordlistLength = wordlist.length;

      for (let j = 0; j < 6; j++) {
        const passphraseWords: string[] = [];
        const randomValues = new Uint32Array(wordCount);
        window.crypto.getRandomValues(randomValues);
        for (let i = 0; i < wordCount; i++) {
          passphraseWords.push(wordlist[randomValues[i] % wordlistLength]);
        }
        newPasswords.push(passphraseWords.join(separator));
      }
      setPasswords(newPasswords);
    }
  }, [options, generatorMode, pronounceableOptions]);

  useEffect(() => {
    generatePassword();
  }, [options, pronounceableOptions, generatorMode, generatePassword]);

  const handleCopy = (password: string, index: number) => {
    if (password && !password.startsWith('Select') && password !== '...') {
      navigator.clipboard.writeText(password);
      setIsCopied(index);
      setTimeout(() => setIsCopied(null), 2000);
    }
  };

  const handleCopyAll = () => {
    const allPasswords = passwords.join('\n');
    if (allPasswords && passwords.every(p => !p.startsWith("Select") && p !== "...")) {
      navigator.clipboard.writeText(allPasswords);
      setIsAllCopied(true);
      setTimeout(() => setIsAllCopied(false), 2000);
    }
  };

  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const handlePronounceableOptionChange = (key: keyof PronounceableOptions, value: string | number) => {
    setPronounceableOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleApplySuggestion = (suggestion: Partial<PasswordOptions>) => {
    setOptions(prev => ({...prev, ...suggestion}));
  }

  const strengthIndicatorOptions: PasswordOptions = generatorMode === 'random'
    ? options
    : {
        length: pronounceableOptions.wordCount,
        includeUppercase: false,
        includeLowercase: true,
        includeNumbers: false,
        includeSymbols: !!pronounceableOptions.separator && !'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(pronounceableOptions.separator),
        excludeAmbiguous: false,
      };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>
              Select your preferred password generation method.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Tabs value={generatorMode} onValueChange={(value) => setGeneratorMode(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="random">Random</TabsTrigger>
                <TabsTrigger value="pronounceable">Pronounceable</TabsTrigger>
              </TabsList>
              <TabsContent value="random" className="pt-6">
                 <div className="space-y-6">
                    <div className="space-y-4 px-1">
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
                    <div className="space-y-4 rounded-lg bg-muted/50 p-6">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="uppercase" className="text-base font-normal">Uppercase (A-Z)</Label>
                        <Switch id="uppercase" checked={options.includeUppercase} onCheckedChange={(checked) => handleOptionChange('includeUppercase', checked)} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="lowercase" className="text-base font-normal">Lowercase (a-z)</Label>
                        <Switch id="lowercase" checked={options.includeLowercase} onCheckedChange={(checked) => handleOptionChange('includeLowercase', checked)} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="numbers" className="text-base font-normal">Numbers (0-9)</Label>
                        <Switch id="numbers" checked={options.includeNumbers} onCheckedChange={(checked) => handleOptionChange('includeNumbers', checked)} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="symbols" className="text-base font-normal">Symbols (!@#...)</Label>
                        <Switch id="symbols" checked={options.includeSymbols} onCheckedChange={(checked) => handleOptionChange('includeSymbols', checked)} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="ambiguous" className="text-base font-normal">Exclude Ambiguous</Label>
                          <TooltipProvider>
                              <Tooltip>
                                  <TooltipTrigger>
                                      <Info className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                      <p>Excludes: l, 1, I, O, 0</p>
                                  </TooltipContent>
                              </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Switch id="ambiguous" checked={options.excludeAmbiguous} onCheckedChange={(checked) => handleOptionChange('excludeAmbiguous', checked)} />
                      </div>
                    </div>
                 </div>
              </TabsContent>
              <TabsContent value="pronounceable" className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-4 px-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="word-count" className="text-base">Number of Words</Label>
                      <span className="font-headline text-xl text-primary">{pronounceableOptions.wordCount}</span>
                    </div>
                    <Slider
                      id="word-count"
                      min={3}
                      max={8}
                      step={1}
                      value={[pronounceableOptions.wordCount]}
                      onValueChange={(value) => handlePronounceableOptionChange('wordCount', value[0])}
                      aria-label={`Number of words: ${pronounceableOptions.wordCount}`}
                    />
                  </div>
                  <div className="space-y-2 px-1">
                      <Label htmlFor="separator" className="text-base">Word Separator</Label>
                      <Input
                        id="separator"
                        value={pronounceableOptions.separator}
                        onChange={(e) => handlePronounceableOptionChange('separator', e.target.value)}
                        maxLength={3}
                        className="bg-muted/50"
                      />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {generatorMode === 'random' && <AiSuggester onSuggestionApplied={handleApplySuggestion} />}
      </div>

      {/* Right Column */}
      <div className="space-y-8 lg:sticky lg:top-8 h-min">
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Passwords</CardTitle>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyAll}
                        aria-label="Copy all passwords"
                        disabled={!passwords.length || passwords.some(p => p.startsWith("Select") || p === "...")}
                      >
                        {isAllCopied ? <Check className="h-5 w-5 text-green-500" /> : <ClipboardCopy className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy all</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={generatePassword}
                        aria-label="Generate new passwords"
                      >
                        <RefreshCcw className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Regenerate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pb-0">
            <div className="space-y-3">
              {(passwords.length > 0 ? passwords : Array(6).fill("...")).map((password, index) => (
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
            <StrengthIndicator 
              password={passwords[0] || ""} 
              options={strengthIndicatorOptions} 
              mode={generatorMode}
              wordCount={pronounceableOptions.wordCount}
            />
          </CardContent>
          <CardFooter className="p-6">
            <Button
              onClick={generatePassword}
              className="w-full"
              size="lg"
            >
              <RefreshCcw className="h-5 w-5" />
              Regenerate Passwords
            </Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  );
}
