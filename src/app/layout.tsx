import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
  weight: ["400", "500", "700"],
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

        {/* GitHub Ribbon */}
        <a
          href="https://github.com/MiladJoodi/NextLoginFlow_Decamond"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            border: 0,
            zIndex: 1000,
          }}
        >
          <img
            src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png"
            alt="Fork me on GitHub"
            width="149"
            height="149"
            loading="lazy"
            decoding="async"
          />
        </a>

        {children}
      </body>
    </html>
  );
}
