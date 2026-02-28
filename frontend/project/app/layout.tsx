import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: {
    default: 'Bank Marketing Prediction - ML-Powered Insights',
    template: '%s | Bank Marketing Prediction'
  },
  description:
    'Advanced machine learning platform for predicting customer subscription to term deposits. Make data-driven marketing decisions with real-time predictions and comprehensive analytics.',
  keywords: ['machine learning', 'bank marketing', 'term deposit prediction', 'customer analytics', 'ML models', 'data science'],
  authors: [{ name: 'Bank Marketing Team' }],
  creator: 'Bank Marketing Prediction',
  publisher: 'Bank Marketing Prediction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bank-marketing-prediction.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bank Marketing Prediction - ML-Powered Insights',
    description: 'Advanced machine learning platform for predicting customer subscription to term deposits with real-time analytics.',
    url: 'https://bank-marketing-prediction.com',
    siteName: 'Bank Marketing Prediction',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bank Marketing Prediction Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bank Marketing Prediction - ML-Powered Insights',
    description: 'Advanced machine learning platform for predicting customer subscription to term deposits.',
    images: ['/twitter-image.png'],
    creator: '@bankmarketing',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="bank-marketing-theme"
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
            <Header />
            <main className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80" />
              <div className="relative">
                {children}
              </div>
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
