import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "劉尚謙履歷",
  description: "Flutter App、REST 後端與全端工程師履歷。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
