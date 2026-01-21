import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Time Tracker",
  description: "Viso Test Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
