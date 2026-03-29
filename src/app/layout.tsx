import type {Metadata} from 'next';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://passgenius.techhive.net'),
  title: {
    default: 'PassGenius | Absolute Local Security',
    template: '%s | PassGenius'
  },
  description: 'Generate private, powerful passwords locally with AI-powered configurations and zero cloud dependency. Uncompromising safety for the digital vanguard.',
  applicationName: 'PassGenius',
  authors: [{ name: 'AJ Batac', url: 'https://ajbatac.github.io' }],
  generator: 'Next.js',
  keywords: ['Password Generator', 'AI Password Config', 'Local Security', 'Offline Password', 'Cyber-Futuristic UI', 'Password Sidebar', 'Open Source Security'],
  referrer: 'origin-when-cross-origin',
  creator: 'AJ Batac',
  publisher: 'PassGenius',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'PassGenius | Absolute Local Security',
    description: 'Generate private, powerful passwords locally with AI-powered configurations and zero cloud dependency.',
    url: 'https://passgenius.techhive.net',
    siteName: 'PassGenius',
    images: [
      {
        url: '/og.jpeg?v=0.3.0',
        width: 1200,
        height: 630,
        alt: 'PassGenius | Absolute Local Security - Secure Password Generation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PassGenius | Absolute Local Security',
    description: 'Powerful, private passwords generated 100% locally. No cloud, no database, no logs.',
    creator: '@ajbatac',
    images: ['/og.jpeg?v=0.3.0'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#4f46e5',
      },
    ],
  },
};

export const viewport = {
  themeColor: '#4f46e5',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Genos:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5Z72CP71KY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5Z72CP71KY');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
