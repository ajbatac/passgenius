import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA Policy | PassGenius',
  description: 'DMCA Policy for PassGenius.',
};

export default function DmcaPage() {
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
            <CardTitle>DMCA Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>Last Updated: March 5, 2026</p>
            <p>
              PassGenius respects the intellectual property rights of others.
            </p>
            <h3 className="font-semibold text-xl pt-4">1. No User-Hosted Content</h3>
            <p>
              Our application, PassGenius, is a client-side tool. It does not host, store, or display any content from users. All operations occur locally within the user's browser. As such, there is no platform for users to upload content that could infringe on copyrights.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. Reporting Infringement</h3>
            <p>
              In the unlikely event that you believe any material associated with our service infringes upon your copyright, please contact us. While we do not host third-party content, we take all legal concerns seriously. Please provide a description of the copyrighted work and where the infringing material is located.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
