import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://indicaestetica.com.br"),

  title: {
    default: "Indica Estética",
    template: "%s | Indica Estética",
  },

  description:
    "Sistema inteligente de indicações para clínicas de estética.",

  applicationName: "Indica Estética",

  keywords: [
    "clínica",
    "estética",
    "indicação",
    "indicações",
    "paciente",
    "marketing de indicação",
    "fidelização",
  ],

  authors: [
    {
      name: "Indica Estética",
    },
  ],

  creator: "Indica Estética",

  publisher: "Indica Estética",

  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
  },

  openGraph: {
    title: "Indica Estética",
    description:
      "Sistema inteligente de indicações para clínicas de estética.",

    url: "https://indicaestetica.com.br",

    siteName: "Indica Estética",

    locale: "pt_BR",

    type: "website",

    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indica Estética",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Indica Estética",

    description:
      "Sistema inteligente de indicações para clínicas de estética.",

    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}