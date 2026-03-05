import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PassGenius',
  description: 'Privacy Policy for PassGenius.',
};

export default function PrivacyPage() {
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
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>Last Updated: March 5, 2026</p>
            <p>
              PassGenius ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains our principles regarding data.
            </p>
            <h3 className="font-semibold text-xl pt-4">1. No Data Collection</h3>
            <p>
              We do not collect, store, log, or transmit any personal data. The core functionality of our application runs entirely on your device within your web browser.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. Local Processing</h3>
            <p>
              All password generation, including any settings you select or inputs you provide to the AI suggester, is processed locally. This information never leaves your computer and is not visible to us or any third party.
            </p>
            <h3 className="font-semibold text-xl pt-4">3. No Accounts or Login</h3>
            <p>
              PassGenius does not require user accounts, registration, or logins. The service is completely anonymous to use.
            </p>
            <h3 className="font-semibold text-xl pt-4">4. No Cookies for Tracking</h3>
            <p>
              We do not use cookies for tracking, advertising, or analytics. The application may use your browser's `localStorage` to save non-personal preferences, such as your selected theme (light or dark mode), but this data is stored only on your device.
            </p>
             <h3 className="font-semibold text-xl pt-4">5. Open Source</h3>
            <p>
              PassGenius is open-source software. You are free to inspect the code yourself to verify that we stand by our privacy promises.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
