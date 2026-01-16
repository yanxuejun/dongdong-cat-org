import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // 确保你在 src/app 下有这个文件，或者删掉这行

const inter = Inter({ subsets: ["latin"] });

// 动态设置网页标题和描述（SEO）
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'zh' ? "东东 - 官方主页" : "DongDong - Official Site",
    description: "Welcome to DongDong the cat's digital world.",
    icons: {
      icon: "/favicon.ico", // 记得在 public 放一个猫爪图标
    }
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#050505]`}>
        {children}
      </body>
    </html>
  );
}