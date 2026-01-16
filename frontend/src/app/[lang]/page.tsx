"use client";
import { useState, useEffect } from 'react';
import dictionaries from '../../i18n/dictionaries.json';

export default function DongDongPage({ params: { lang } }: any) {
  const [visitorId, setVisitorId] = useState<number | null>(null);
  const [aiMsg, setAiMsg] = useState("");
  const [showPay, setShowPay] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const dict = dictionaries[lang as 'zh' | 'en'];

  useEffect(() => {
    fetch('/api/visitor').then(res => res.json()).then(data => setVisitorId(data.id));
  }, []);

  const handleAiChat = async () => {
    if (loadingAi) return;
    setLoadingAi(true);
    const res = await fetch('/api/chat');
    const data = await res.json();
    setAiMsg(data.message);
    setLoadingAi(false);
    setTimeout(() => setAiMsg(""), 5000);
  };

  return (
    <main className={`min-h-screen bg-[#050505] text-white selection:bg-purple-500 transition-all duration-700 ${showPay ? 'blur-2xl scale-95' : ''}`}>
      
      {/* 访客编号 */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 mix-blend-difference hidden md:block">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-gray-500 [writing-mode:vertical-lr] rotate-180">
          Visitor <span className="text-purple-500">#{visitorId?.toString().padStart(6, '0')}</span>
        </p>
      </div>

      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full flex justify-between p-8 z-40 backdrop-blur-sm">
        <span className="font-black tracking-tighter text-xl">DONGDONG<span className="text-purple-600">.</span>ORG</span>
        <div className="flex gap-4 font-mono text-xs uppercase tracking-widest">
          <a href="/zh" className={lang === 'zh' ? 'text-purple-500' : ''}>ZH</a>
          <a href="/en" className={lang === 'en' ? 'text-purple-500' : ''}>EN</a>
        </div>
      </nav>

      {/* 主体内容 */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        {/* 头像与AI气泡 */}
        <div className="relative mb-8">
          {aiMsg && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 bg-white text-black p-4 rounded-2xl text-sm font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-bounce z-20">
              {aiMsg}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            </div>
          )}
          <div 
            onClick={handleAiChat}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-white/10 p-2 cursor-pointer group hover:border-purple-500/50 transition-all duration-500"
          >
            <img src="/dongdong.jpg" className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" />
          </div>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent italic">
          {lang === 'zh' ? '我是东东' : "I'M DONGDONG"}
        </h1>

        <p className="text-gray-500 tracking-[0.2em] text-xs md:text-sm mb-12 max-w-xs uppercase">
          {dict.description}
        </p>

        {/* 交互区 */}
        <div className="flex gap-4">
          <a href="mailto:mama@dongdongcat.org" className="px-10 py-4 rounded-full bg-white text-black text-xs font-black tracking-widest hover:bg-purple-600 hover:text-white transition-all uppercase">
            {dict.contact_btn}
          </a>
          <button onClick={() => setShowPay(true)} className="px-10 py-4 rounded-full border border-white/10 text-xs font-black tracking-widest hover:bg-white/5 transition-all uppercase">
            {dict.support_btn}
          </button>
        </div>
      </section>

      {/* 打赏模态框 */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 animate-in fade-in transition-all">
          <div className="max-w-xs w-full text-center relative">
            <button onClick={() => setShowPay(false)} className="absolute -top-12 right-0 text-white text-4xl font-thin hover:rotate-90 transition-transform">×</button>
            <h2 className="text-xl font-bold mb-8 tracking-widest uppercase">{dict.support_title}</h2>
            <div className="relative group rounded-3xl overflow-hidden bg-white p-4">
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-600 animate-scan shadow-[0_0_15px_purple]"></div>
              <img src="/wechat-pay.webp" className="w-full h-auto" />
            </div>
            <p className="mt-6 text-gray-500 text-[10px] tracking-widest uppercase">{dict.wechat}</p>
          </div>
        </div>
      )}
    </main>
  );
}