import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "House Of Everything | Tecnología seleccionada",
    template: "%s | House Of Everything",
  },
  description:
    "Tecnología seleccionada con foco en calidad, diseño y rendimiento. Smartphones, wearables, gaming, audio y más en Argentina.",
  keywords: ["electronica", "smartphones", "gaming", "wearables", "argentina", "tecnología"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://houseofeverything.vercel.app",
    siteName: "House Of Everything",
    title: "House Of Everything | Tecnología seleccionada",
    description:
      "Tecnología seleccionada con foco en calidad, diseño y rendimiento.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "House Of Everything",
    description: "Tecnología seleccionada con foco en calidad, diseño y rendimiento.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
