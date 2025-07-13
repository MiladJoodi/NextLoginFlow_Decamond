// src/app/layout.tsx
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"], // برای فارسی لازمه
  display: "swap",
  weight: ["400", "500", "700"], // وزن‌های رایج
});

export const metadata: Metadata = {
  title: "Next Login Flow - Decamond",
  description: "Authentication task with Next.js for Decamond",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        {children}
      </body>
    </html>
  );
}
