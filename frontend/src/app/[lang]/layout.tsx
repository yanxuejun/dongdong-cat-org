// src/app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// 修复 Metadata 生成
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'zh' ? "东东 - 官方主页" : "DongDong - Official Site",
    description: "Welcome to DongDong the cat's digital world.",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // 关键修复：改为 Promise
}) {
  const { lang } = await params; // 关键修复：必须 await

  return (
    <html lang={lang}>
      <body className={`${inter.className} bg-[#050505] antialiased`}>
        {children}
      </body>
    </html>
  );
}