import { Anton, Oswald, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

const sourceSerif = Source_Serif_4({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Logan Starkey — Sports Correspondent",
  description:
    "Sports correspondent covering football, basketball, soccer, motorsport, baseball, and the Olympics.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
