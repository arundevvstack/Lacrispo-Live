import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SchemaOrg from "@/components/SchemaOrg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lacrispo.com"),
  title: {
    default: "La Crispo | Pure Indulgence",
    template: "%s | La Crispo",
  },
  description: "Experience the crunch of La Crispo premium snacks. An explosion of refined flavor and artisan quality.",
  applicationName: "La Crispo",
  keywords: ["premium snacks", "crisps", "potato chips", "artisan snacks", "La Crispo"],
  authors: [{ name: "La Crispo" }],
  creator: "La Crispo",
  publisher: "La Crispo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "La Crispo | Pure Indulgence",
    description: "Experience the crunch of La Crispo premium snacks. An explosion of refined flavor and artisan quality.",
    url: "https://lacrispo.com",
    siteName: "La Crispo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Crispo Premium Snacks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Crispo | Pure Indulgence",
    description: "Experience the crunch of La Crispo premium snacks. An explosion of refined flavor and artisan quality.",
    images: ["/og-image.jpg"],
    creator: "@lacrispo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "La Crispo",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "La Crispo",
    "url": "https://lacrispo.com",
    "logo": "https://lacrispo.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-123-456-7890",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://instagram.com/lacrispo",
      "https://twitter.com/lacrispo",
      "https://linkedin.com/company/lacrispo"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "La Crispo",
    "url": "https://lacrispo.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lacrispo.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SchemaOrg schema={orgSchema} />
        <SchemaOrg schema={websiteSchema} />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
