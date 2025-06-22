import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Islamic School & Religious Center",
  description: "A comprehensive platform for Islamic education, religious activities, and community engagement",
  keywords: "Islamic school, madrasa, religious center, Islamic education, Quran, Hadith",
  authors: [{ name: "Islamic School" }],
  openGraph: {
    title: "Islamic School & Religious Center",
    description: "A comprehensive platform for Islamic education, religious activities, and community engagement",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${amiri.variable} antialiased bg-background text-foreground`}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
