import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import { Toaster } from "./components/ui/sonner"

const tay = localFont({
  src: '../public/fonts/TAYBigBird.otf'
})
export const din = localFont({
  src: '../public/fonts/DINCondensedBold.ttf',
  variable: '--font-din'
})
export const tecla = localFont({
  src: '../public/fonts/Tecla-Bold.otf',
  variable: '--font-tecla'
})
export const grotesk75 = localFont({
  src: '../public/fonts/NHaasGroteskTXPro-75Bd.ttf',
  variable: '--font-grotesk75'
})
export const grotesk76 = localFont({
  src: '../public/fonts/NHaasGroteskTXPro-76BdIt.ttf',
  variable: '--font-grotesk76'
})
export const tayvar = localFont({
  src: '../public/fonts/TAYBigBird.otf',
  variable: '--font--tayvar'
})

import Nav from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Armónico",
  description: "Centro Cultural, Chihuahua, CUU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${tay.className} 
          ${din.variable} 
          ${tecla.variable} 
          ${grotesk75.variable} 
          ${grotesk76.variable}
          ${tayvar.variable}
          `}
      >
        <div className="flex flex-row">
          <Nav />
          <Toaster
            toastOptions={{
              className: tay.className,
              style: {
                background: '#fff',
                color: '#000',
                border: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                fontSize: '20px',
              }
            }}
          />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
