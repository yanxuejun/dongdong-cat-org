"use client";

export const runtime = 'edge';

import { useState, useEffect, use } from 'react';
import dictionaries from '../../i18n/dictionaries.json';

export default function DongDongPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [visitorId, setVisitorId] = useState<number | null>(null);
  const [aiMsg, setAiMsg] = useState("");
  const [showPay, setShowPay] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  const dict = dictionaries[lang as 'zh' | 'en'] || dictionaries.zh;

  useEffect(() => {
    fetch('/api/visitor').then(res => res.json()).then(data => setVisitorId(data.id));
  }, []);

  const handleAiChat = async () => {
    if (loadingAi) return;
    setLoadingAi(true);
    const res = await fetch(`/api/chat?lang=${lang}`); // 传递语言参数
    const data = await res.json();
    setAiMsg(data.message);
    setLoadingAi(false);
    setTimeout(() => setAiMsg(""), 5000);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FF] text-slate-800 transition-all duration-700 relative overflow-hidden">
      {/* 亮丽背景装饰 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>

      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full flex justify-between p-10 z-40 items-center">
        <span className="font-black tracking-tight text-2xl text-purple-600">DONGDONGCAT<span className="text-slate-400">.ORG</span></span>
        <div className="flex gap-8 font-bold text-sm uppercase">
          <a href="/zh" className={lang === 'zh' ? 'text-purple-600 underline underline-offset-8' : 'text-slate-400 hover:text-purple-400'}>中文</a>
          <a href="/en" className={lang === 'en' ? 'text-purple-600 underline underline-offset-8' : 'text-slate-400 hover:text-purple-400'}>EN</a>
        </div>
      </nav>

      {/* 访客编号 - 居中醒目位置 */}
      <div className="fixed bottom-10 left-10 z-50 bg-white/80 backdrop-blur-md border border-purple-100 px-6 py-3 rounded-full shadow-lg">
        <p className="font-mono text-sm tracking-widest text-slate-500">
          {lang === 'zh' ? '第' : 'Visitor NO.'} <span className="text-purple-600 font-black text-lg">{visitorId || '...'}</span> {lang === 'zh' ? '位访客' : ''}
        </p>
      </div>

      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-6 max-w-4xl mx-auto">

        {/* 头像区 */}
        <div className="relative mb-12">
          {aiMsg && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 bg-white text-slate-700 p-5 rounded-3xl text-lg font-medium shadow-2xl border border-purple-50 animate-bounce z-20">
              {aiMsg}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-purple-50"></div>
            </div>
          )}

          <div
            onClick={handleAiChat}
            className={`w-56 h-56 md:w-72 md:h-72 rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl border-8 border-white transition-all duration-500 hover:scale-105 ${loadingAi ? 'ring-4 ring-purple-300' : ''}`}
          >
            <img src="/dongdong.jpg" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 标题 - 调整大小使其协调 */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
          {lang === 'zh' ? '你好，我是冬冬' : "Hi, I'm DongDong"}
        </h1>

        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed">
          {dict.description}
        </p>

        {/* 按钮区 */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="mailto:mama@dongdongcat.org" className="px-12 py-5 rounded-2xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 text-center">
            {dict.contact_btn}
          </a>
          <button onClick={() => setShowPay(true)} className="px-12 py-5 rounded-2xl bg-white text-purple-600 border-2 border-purple-100 font-bold text-lg hover:border-purple-300 transition-all text-center">
            {dict.support_btn}
          </button>
        </div>
      </section>

      {/* 打赏浮层 */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowPay(false)} className="absolute top-6 right-8 text-slate-300 hover:text-slate-600 text-4xl font-light">×</button>
            <h2 className="text-2xl font-black mb-8 text-slate-800">{dict.support_title}</h2>
            <div className="bg-slate-50 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 animate-scan opacity-30"></div>
              <img src="/wechat-pay.webp" className="w-full rounded-2xl shadow-sm" />
            </div>
            <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-sm">{dict.wechat}</p>
          </div>
        </div>
      )}
    </main>
  );
}