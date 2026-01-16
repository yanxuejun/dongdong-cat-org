import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// 强制使用 Edge Runtime
export const runtime = 'edge';

// 动态生成网页标题和元数据
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    // 这里彻底更正为“冬冬”
    title: lang === 'zh' ? "冬冬 - 官方主页" : "DongDong - Official Site",
    description: lang === 'zh'
      ? "欢迎来到英国长毛猫冬冬的数字领地 DongDongCat.org"
      : "Welcome to DongDong's official digital territory at DongDongCat.org",
    metadataBase: new URL('https://dongdongcat.org'),
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: lang === 'zh' ? "冬冬 - 官方主页" : "DongDong - Official Site",
      description: "英国长毛猫冬冬的官方领地",
      images: ['/dongdong.jpg'],
    }
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}