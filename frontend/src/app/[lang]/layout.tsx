import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// 关键：Cloudflare Pages 必须强制使用 Edge Runtime
export const runtime = 'edge';

// 动态生成网页标题和图标元数据
export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    // 标题更正为“冬冬”
    title: lang === 'zh' ? "冬冬 - 官方主页" : "DongDong - Official Site",
    description: lang === 'zh'
      ? "欢迎来到英国长毛猫冬冬的数字领地 DongDongCat.org"
      : "Welcome to DongDong's official digital territory at DongDongCat.org",

    // 图标配置
    icons: {
      // 电脑浏览器标签页图标
      icon: [
        { url: '/favicon.ico', href: '/favicon.ico' }
      ],
      // 苹果 iOS 设备桌面快捷图标
      apple: [
        {
          url: '/apple-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png'
        },
      ],
      // 快捷方式图标
      shortcut: '/favicon.ico',
    },

    // 社交媒体预览设置 (当你在微信/Twitter分享链接时显示)
    openGraph: {
      title: lang === 'zh' ? "冬冬 - 官方主页" : "DongDong - Official Site",
      description: "英国长毛猫冬冬的官方领地",
      url: 'https://dongdongcat.org',
      siteName: 'DongDongCat',
      images: [
        {
          url: '/dongdong.jpg',
          width: 800,
          height: 800,
          alt: 'DongDong the Cat',
        },
      ],
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // 等待参数解析
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-purple-100 selection:text-purple-900`}>
        {children}
      </body>
    </html>
  );
}