import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Changelog | PassGenius',
  description: "See what's new in PassGenius.",
};

export default function ChangelogPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex-grow">
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
          <div className="mt-6 flex justify-center">
            <Link href="/changelog/rss" className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
              Subscribe to this feed
            </Link>
          </div>
        </header>

        <Card className="bg-card/80 shadow-lg backdrop-blur-xl border border-border/10 mb-8">
          <CardHeader>
            <CardTitle>Version 0.2.0 (March 21, 2026)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-card-foreground">
            <div>
              <h3 className="font-semibold text-xl mb-3">🛡️ Security & Privacy Focus</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Absolute Local Security:</strong> Emphasized our commitment to local processing. We've refined our messaging to ensure you know your data never touches the cloud.
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-3">🎨 UI & Design Enhancements</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Redesigned Legal Pages:</strong> Upgraded our legal documents with a continuous, unified cyber-futuristic theme. 
                </li>
                <li>
                  <strong>Polished Interface Text:</strong> Refined wording throughout the app (like "Password Options" and "Results Vault") to match our premium aesthetic.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-3">🌟 Shareability</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Social Sharing:</strong> Added high-quality previews that look beautiful when you share PassGenius on social media.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

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
      <Footer />
    </main>
  );
}
