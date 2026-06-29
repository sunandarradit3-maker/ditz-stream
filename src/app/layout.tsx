import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiTz stream",
  description: "Platform video streaming modern ala DiTz stream.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
