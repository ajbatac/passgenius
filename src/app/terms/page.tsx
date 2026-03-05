import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | PassGenius',
  description: 'Terms of Service for PassGenius.',
};

export default function TermsPage() {
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
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>Last Updated: March 5, 2026</p>
            <p>
              Welcome to PassGenius. By using our application, you agree to these Terms of Service. Please read them carefully.
            </p>
            <h3 className="font-semibold text-xl pt-4">1. Use of Service</h3>
            <p>
              PassGenius is a free-to-use password generator provided "as is" without any warranties. You are permitted to use the application for personal and commercial use to generate passwords.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. Privacy and Data</h3>
            <p>
              Our service is designed with privacy as a core principle. All password generation and calculations are performed locally in your browser. No data, including the passwords you generate or the options you select, is ever sent to our servers, stored in the cloud, or tracked. We do not require you to create an account or log in.
            </p>
            <h3 className="font-semibold text-xl pt-4">3. User Responsibility</h3>
            <p>
              You are solely responsible for the security of the passwords you generate and how you use them. While PassGenius is designed to create strong and secure passwords, it is your responsibility to keep them confidential and use them appropriately. We are not liable for any loss or damage arising from your failure to comply with this responsibility.
            </p>
            <h3 className="font-semibold text-xl pt-4">4. Limitation of Liability</h3>
            <p>
              In no event shall PassGenius or its creators be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
            </p>
            <h3 className="font-semibold text-xl pt-4">5. Changes to Terms</h3>
            <p>
              We may update these terms from time to time. We will notify you of any changes by posting the new Terms of Service on this page. You are advised to review this page periodically for any changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
