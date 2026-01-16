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
    try {
      const res = await fetch(`/api/chat?lang=${lang}`);
      const data = await res.json();
      setAiMsg(data.message);
    } catch (e) {
      setAiMsg(lang === 'zh' ? "喵～" : "Meow~");
    } finally {
      setLoadingAi(false);
      setTimeout(() => setAiMsg(""), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFF] text-slate-800 transition-all duration-700 relative overflow-x-hidden">
      {/* 柔和背景装饰 */}
      <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-purple-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[80px] pointer-events-none"></div>

      {/* 顶部导航 - 修正为冬冬 */}
      <nav className="fixed top-0 w-full flex justify-between px-8 py-6 md:px-16 md:py-10 z-40 items-center">
        <span className="font-black tracking-tight text-xl md:text-2xl text-purple-600">
          DONGDONGCAT<span className="text-slate-300">.ORG</span>
        </span>
        <div className="flex gap-8 font-bold text-sm">
          <a href="/zh" className={lang === 'zh' ? 'text-purple-600 border-b-2 border-purple-600 pb-1' : 'text-slate-400 hover:text-purple-400 transition-colors'}>中文</a>
          <a href="/en" className={lang === 'en' ? 'text-purple-600 border-b-2 border-purple-600 pb-1' : 'text-slate-400 hover:text-purple-400 transition-colors'}>EN</a>
        </div>
      </nav>

      {/* 访客编号 - 增大字号并增强对比 */}
      <div className="fixed bottom-10 left-8 md:left-12 z-50 bg-white/80 backdrop-blur-xl border border-purple-100 px-6 py-3 rounded-2xl shadow-xl shadow-purple-100/30 flex items-center gap-3">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
        <p className="font-mono text-sm tracking-tight text-slate-600 font-bold uppercase">
          {lang === 'zh' ? '第' : 'VISITOR NO.'} <span className="text-purple-600 text-xl font-black mx-1">{visitorId || '...'}</span> {lang === 'zh' ? '位访客' : ''}
        </p>
      </div>

      <section className="relative flex flex-col items-center justify-center min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto">

        {/* 头像与 AI 气泡 */}
        <div className="relative mb-12 group">
          {aiMsg && (
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-72 bg-white text-slate-700 p-5 rounded-[2rem] text-lg font-bold shadow-2xl border border-purple-50 animate-in slide-in-from-bottom-4 duration-300 z-30">
              {aiMsg}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 border-r border-b border-purple-50"></div>
            </div>
          )}

          <div
            onClick={handleAiChat}
            className={`w-52 h-52 md:w-64 md:h-64 rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(168,85,247,0.15)] border-[8px] border-white transition-all duration-500 hover:scale-105 active:scale-95 ${loadingAi ? 'ring-8 ring-purple-100 opacity-80' : ''}`}
          >
            <img src="/dongdong.jpg" className="w-full h-full object-cover" alt="英国长毛猫冬冬" />
          </div>
        </div>

        {/* 标题 - 调整比例 */}
        <div className="text-center space-y-4 mb-14">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
            {lang === 'zh' ? '你好，我是冬冬' : "Hi, I'm DongDong"}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed italic">
            {dict.description}
          </p>
        </div>

        {/* 冬冬档案卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full mb-16">
          {Object.entries(dict.info).map(([key, value], index) => (
            <div key={key} className="bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
              <p className="text-[10px] md:text-xs uppercase font-black text-purple-300 tracking-[0.2em] mb-2 group-hover:text-purple-500 transition-colors">
                {dict.labels[index]}
              </p>
              <p className="text-sm md:text-lg font-bold text-slate-700">{value as string}</p>
            </div>
          ))}
        </div>

        {/* 交互按钮 */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="mailto:mama@dongdongcat.org" className="px-14 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-purple-600 transition-all shadow-xl shadow-slate-200 text-center uppercase tracking-widest">
            {dict.contact_btn}
          </a>
          <button onClick={() => setShowPay(true)} className="px-14 py-5 rounded-2xl bg-white text-purple-600 border-2 border-purple-100 font-bold text-lg hover:border-purple-300 transition-all shadow-sm text-center uppercase tracking-widest">
            {dict.support_btn}
          </button>
        </div>
      </section>

      {/* 底部版权与联系方式 */}
      <footer className="py-16 text-center space-y-4">
        {/* 邮箱地址 */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="mailto:mama@dongdongcat.org"
            className="group flex items-center gap-2 text-slate-400 hover:text-purple-600 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
              <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-xs font-bold tracking-widest font-mono">MAMA@DONGDONGCAT.ORG</span>
          </a>
        </div>

        {/* 版权信息 */}
        <div className="text-slate-300 text-[10px] font-black tracking-[0.4em] uppercase">
          © 2026 DONGDONGCAT.ORG | ALL RIGHTS RESERVED
        </div>
      </footer>

      {/* 打赏弹窗保持之前逻辑... */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-xl p-6">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl relative">
            <button onClick={() => setShowPay(false)} className="absolute top-6 right-8 text-slate-300 hover:text-slate-600 text-4xl font-thin transition-transform hover:rotate-90">×</button>
            <h2 className="text-xl font-black mb-8 text-slate-800">{dict.support_title}</h2>
            <div className="bg-slate-50 p-6 rounded-[2.5rem] relative group border border-slate-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/20 animate-scan"></div>
              <img src="/wechat-pay.webp" className="w-full rounded-2xl" />
            </div>
            <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-[10px]">{dict.wechat}</p>
          </div>
        </div>
      )}
    </main>
  );
}