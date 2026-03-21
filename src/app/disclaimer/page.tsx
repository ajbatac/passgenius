import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Disclaimer | PassGenius',
  description: 'Disclaimer for PassGenius.',
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer">
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
    </LegalLayout>
  );
}
