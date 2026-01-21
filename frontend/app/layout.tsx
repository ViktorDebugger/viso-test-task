import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

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
      <body className={cn("bg-[#111111] antialiased")}>
        <Header />
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#ffffff",
            },
            className: "group",
            classNames: {
              success:
                "bg-[#18181b] border-[#22c55e] text-white [&>svg]:text-[#22c55e]",
              error:
                "bg-[#18181b] border-red-500 text-white [&>svg]:text-red-500",
              info: "bg-[#18181b] border-zinc-700 text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
