import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Terms of Service | PassGenius',
  description: 'Terms of Service for PassGenius.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
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
    </LegalLayout>
  );
}
