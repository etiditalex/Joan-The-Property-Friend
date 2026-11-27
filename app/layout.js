import { Bodoni_Moda, Montserrat } from "next/font/google";
import { SiteShell } from "./components/SiteShell";
import "./globals.css";

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans"
});

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display"
});

export const metadata = {
  title: "Joan Property Friend | Houses, Apartments and Land",
  description: "Joan Property Friend helps you buy a house, an apartment, or land in Mombasa, Kilifi, Malindi, and Kwale. Your property partner."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} ${sans.className}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
