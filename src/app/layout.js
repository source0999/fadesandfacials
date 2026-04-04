import { Exo_2, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import { BookModalProvider } from "../components/BookModalProvider";
import { SmoothScroll } from "../components/SmoothScroll";
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

function resolveMetadataBase() {
  let origin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000")
    .trim()
    .replace(/\/$/, "");
  if (!origin || !/^https?:\/\//i.test(origin)) {
    origin = "http://localhost:3000";
  }
  const sub = (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
    .trim()
    .replace(/\/$/, "");
  const href = sub
    ? `${origin}${sub.startsWith("/") ? sub : `/${sub}`}/`
    : `${origin}/`;
  try {
    return new URL(href);
  } catch {
    return new URL("http://localhost:3000/");
  }
}

const metadataBase = resolveMetadataBase();
const sub = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/$/, "");

export const metadata = {
  metadataBase,
  title: "Fades & Facials | Barbershop",
  description: "It's more than a haircut. It's an experience.",
  icons: {
    icon: sub ? `${sub}/logo.ico` : "/logo.ico",
    apple: sub ? `${sub}/logo.png` : "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fades & Facials",
  },
};

/** iOS pinned Web App: stable scale + safe-area (locks layout; less ideal for a11y zoom) */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={exo.variable}>
      <body className={inter.className}>
        <BookModalProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </BookModalProvider>
      </body>
    </html>
  );
}
