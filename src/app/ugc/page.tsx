import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'User Generated Content | PassGenius',
  description: 'User Generated Content (UGC) Disclaimer for PassGenius.',
};

export default function UgcDisclaimerPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Card className="bg-card/80 shadow-lg backdrop-blur-xl border border-border/10">
          <CardHeader>
            <CardTitle>User Generated Content (UGC) Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>Last Updated: March 5, 2026</p>
            <h3 className="font-semibold text-xl pt-4">1. No Publicly Hosted Content</h3>
            <p>
              PassGenius does not host, display, or share any user-generated content. The application is a tool that operates privately within your browser.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. AI Suggester Interaction</h3>
            <p>
              The "Smart Suggestions" feature involves user input (selecting a service type) to generate an AI recommendation. This interaction is considered transient and private. The input you provide is sent to a generative AI model to create a suggestion, but neither the input nor the output is stored, logged, or associated with you in any way. It is processed in real-time and then discarded.
            </p>
            <p>
              No other user will ever see your inputs or the suggestions you receive.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
