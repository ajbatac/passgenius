import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'User Generated Content | PassGenius',
  description: 'User Generated Content (UGC) Disclaimer for PassGenius.',
};

export default function UgcDisclaimerPage() {
  return (
    <LegalLayout title="User Generated Content (UGC) Disclaimer">
            <p>Last Updated: March 5, 2026</p>
            <h3 className="font-semibold text-xl pt-4">1. No Publicly Hosted Content</h3>
            <p>
              PassGenius does not host, display, or share any user-generated content. The application is a tool that operates privately within your browser.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. AI Suggester Interaction</h3>
            <p>
              The "Smart Suggestions" feature involves user input (selecting a service type) to generate an AI recommendation. This interaction is considered transient and private. The input you provide is sent to a generative AI model to create a suggestion, but neither the input nor the output is stored, logged, or associated with you in any way. It is processed in real-time and then discarded.
            </p>
            <p>
              No other user will ever see your inputs or the suggestions you receive.
            </p>
    </LegalLayout>
  );
}
