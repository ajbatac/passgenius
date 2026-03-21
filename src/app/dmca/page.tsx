import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'DMCA Policy | PassGenius',
  description: 'DMCA Policy for PassGenius.',
};

export default function DmcaPage() {
  return (
    <LegalLayout title="DMCA Policy">
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
    </LegalLayout>
  );
}
