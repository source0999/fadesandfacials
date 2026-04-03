import { Exo_2, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["200", "400"],
  display: "swap",
  variable: "--font-exo",
});

export const metadata = {
  title: "Fades & Facials | Barbershop",
  description: "It's more than a haircut. It's an experience.",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={exo.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
