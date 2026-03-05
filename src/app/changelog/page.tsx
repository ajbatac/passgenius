import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Changelog | PassGenius',
  description: "See what's new in PassGenius.",
};

export default function ChangelogPage() {
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
        <header className="mb-8 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter bg-gradient-to-br from-primary via-chart-3 to-chart-2 text-transparent bg-clip-text">
            What's New
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Recent updates to PassGenius.
          </p>
        </header>

        <Card className="bg-card/80 shadow-lg backdrop-blur-xl border border-border/10">
          <CardHeader>
            <CardTitle>Version 0.1 (March 5, 2026)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-card-foreground">
            <div>
              <h3 className="font-semibold text-xl mb-3">✨ New Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Smart Suggestions:</strong> Get smart, AI-powered password recommendations based on the type of website you're using it for (like banking or social media).
                </li>
                <li>
                  <strong>Fresh New Look:</strong> We've completely redesigned the app with a modern, clean interface and a cool new color scheme.
                </li>
                 <li>
                  <strong>Dark Mode:</strong> You can now switch between light and dark themes for a more comfortable viewing experience, day or night.
                </li>
                 <li>
                  <strong>More Choices:</strong> We now generate four password options at a time to give you more to choose from.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-3">🚀 Improvements</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Better Layout:</strong> The app now uses a two-column layout, making it easier to see your options and the results at a glance.
                </li>
                <li>
                  <strong>Bigger Regenerate Button:</strong> We've added a large, easy-to-click button to generate new passwords.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-3">🐞 Bug Fixes</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  We squashed a few minor bugs to make the app run more smoothly and fixed compatibility issues to ensure a stable experience.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
