import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | PassGenius',
  description: 'Disclaimer for PassGenius.',
};

export default function DisclaimerPage() {
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
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>Last Updated: March 5, 2026</p>
            <p>
              The information and tools provided by PassGenius are for general purposes only.
            </p>
            <h3 className="font-semibold text-xl pt-4">1. No Warranty</h3>
            <p>
              The PassGenius application is provided "as is," without any warranty of any kind, express or implied. We do not warrant that the service will be error-free or that the generated passwords will be unbreakable or fit for any particular purpose.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. Security Responsibility</h3>
            <p>
              The security of your online accounts depends on many factors, including the password you choose and how you manage it. While our tool is designed to help you create strong passwords, you are ultimately responsible for your own security practices. PassGenius cannot be held responsible for any security breaches or damages incurred.
            </p>
            <h3 className="font-semibold text-xl pt-4">3. AI Suggestions</h3>
            <p>
              The AI-powered suggestions are provided for convenience and are based on general security best practices. They do not constitute professional security advice. You should always use your own judgment when selecting a password configuration.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
