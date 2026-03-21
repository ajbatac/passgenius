import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | PassGenius',
  description: 'Privacy Policy for PassGenius.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
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
             <h3 className="font-semibold text-xl pt-4">5. Verifiable Security</h3>
            <p>
              PassGenius operates with complete transparency in its local execution context. Our security model relies on proven cryptographic APIs within your browser, ensuring your data remains impenetrable.
            </p>
    </LegalLayout>
  );
}
