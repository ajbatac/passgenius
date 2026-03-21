import { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: 'Cookie Policy | PassGenius',
  description: 'Cookie Policy for PassGenius.',
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy">
            <p>Last Updated: March 5, 2026</p>
            <p>
              This page explains how PassGenius uses cookies and local storage.
            </p>
            <h3 className="font-semibold text-xl pt-4">1. We Do Not Use Tracking Cookies</h3>
            <p>
              PassGenius does not use cookies for tracking, analytics, or advertising purposes. Your activity on our site is not monitored or shared.
            </p>
            <h3 className="font-semibold text-xl pt-4">2. Use of Local Storage</h3>
            <p>
              Our application uses your browser's local storage to save your preferences. This is limited to functional settings, such as remembering your choice for light or dark mode. This data is stored exclusively on your device and is not transmitted to us or any third parties. It is used solely to improve your user experience on your next visit.
            </p>
            <h3 className="font-semibold text-xl pt-4">3. What is Local Storage?</h3>
            <p>
              Local storage is a standard web technology that allows a website or application to store information locally within your own browser. Unlike cookies, this data is not automatically sent to the server with every request. In our case, it never leaves your computer.
            </p>
    </LegalLayout>
  );
}
