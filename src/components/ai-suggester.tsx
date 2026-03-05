"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Sparkles, ShieldCheck } from "lucide-react";
import { getAiSuggestion } from "@/app/actions";
import type { SuggestOptimalPasswordConfigOutput } from "@/ai/flows/suggest-optimal-password-config";
import { useToast } from "@/hooks/use-toast";

type PasswordOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

type AiSuggesterProps = {
  onSuggestionApplied: (suggestion: Partial<PasswordOptions>) => void;
};

export function AiSuggester({ onSuggestionApplied }: AiSuggesterProps) {
  const [serviceType, setServiceType] = useState("");
  const [suggestion, setSuggestion] = useState<SuggestOptimalPasswordConfigOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSelectChange = (value: string) => {
    setServiceType(value);
    setSuggestion(null); // Clear previous suggestion
    startTransition(async () => {
      const result = await getAiSuggestion({ serviceType: value });
      if (result.error) {
        toast({
          variant: "destructive",
          title: "AI Suggestion Error",
          description: result.error,
        });
      } else if (result.success) {
        setSuggestion(result.success);
      }
    });
  };
  
  const handleApply = () => {
    if (suggestion) {
      onSuggestionApplied(suggestion);
      toast({
        title: "Suggestion Applied",
        description: `Password options updated for ${serviceType}.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>Smart Password Suggestions</span>
        </CardTitle>
        <CardDescription>
          Get AI-powered recommendations for strong passwords based on service type.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={handleSelectChange} value={serviceType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a service type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Banking">Banking & Finance</SelectItem>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Social Media">Social Media</SelectItem>
            <SelectItem value="E-commerce">E-commerce</SelectItem>
            <SelectItem value="General">General/Low-security</SelectItem>
          </SelectContent>
        </Select>

        {isPending && (
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            <LoaderCircle className="h-8 w-8 animate-spin" />
          </div>
        )}

        {suggestion && !isPending && (
          <div className="space-y-4 rounded-lg border bg-card-foreground/5 p-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-green-400 mt-1" />
              <p className="text-sm text-muted-foreground">{suggestion.recommendation}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <p>Length: <strong>{suggestion.length}</strong></p>
                <p>Uppercase: <strong>{suggestion.includeUppercase ? "Yes" : "No"}</strong></p>
                <p>Numbers: <strong>{suggestion.includeNumbers ? "Yes" : "No"}</strong></p>
                <p>Symbols: <strong>{suggestion.includeSymbols ? "Yes" : "No"}</strong></p>
            </div>
            <Button onClick={handleApply} className="w-full">
              Apply Suggestion
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
