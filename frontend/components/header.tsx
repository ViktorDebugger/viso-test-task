"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/entry/new", label: "New Entry" },
  ];

  return (
    <header className="border-b border-zinc-800 bg-[#18181b]">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-4">
        <Link
          href="/dashboard"
          className="text-base font-bold text-white sm:text-xl"
        >
          <span className="hidden sm:inline">Viso Time Tracker</span>
          <span className="sm:hidden">Viso TT</span>
        </Link>

        <nav className="flex gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm",
                pathname === item.href
                  ? "bg-[#22c55e] text-black"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">
                {item.label === "Dashboard" ? "Home" : "New"}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
