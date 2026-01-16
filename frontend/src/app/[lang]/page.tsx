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
      setTimeout(() => setAiMsg(""), 4000);
    }
  };

  return (
    <main className="h-screen w-full bg-[#FDFDFF] text-slate-800 relative overflow-hidden flex flex-col">
      {/* 背景装饰 - 调淡以保持清爽 */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-blue-100/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* 1. 顶部导航 - 压缩垂直内边距 */}
      <nav className="flex justify-between items-center px-8 py-4 md:px-12 md:py-6 z-40 shrink-0">
        <span className="font-black tracking-tight text-lg md:text-xl text-purple-600">
          DONGDONGCAT<span className="text-slate-300">.ORG</span>
        </span>
        <div className="flex gap-6 font-bold text-xs uppercase">
          <a href="/zh" className={lang === 'zh' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-purple-400'}>中文</a>
          <a href="/en" className={lang === 'en' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-slate-400 hover:text-purple-400'}>EN</a>
        </div>
      </nav>

      {/* 2. 主体内容 - 自动分配剩余空间并居中 */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 min-h-0 relative">

        {/* 头像区 - 略微缩小并根据屏幕调整 */}
        <div className="relative mb-6 md:mb-8 shrink-0">
          {aiMsg && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 bg-white text-slate-700 p-3 rounded-2xl text-sm font-bold shadow-xl border border-purple-50 animate-in fade-in zoom-in duration-300 z-30 text-center">
              {aiMsg}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-purple-50"></div>
            </div>
          )}

          <div
            onClick={handleAiChat}
            className={`w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border-[5px] border-white transition-all hover:scale-105 active:scale-95 ${loadingAi ? 'ring-4 ring-purple-100 opacity-80' : ''}`}
          >
            <img src="/dongdong.webp" className="w-full h-full object-cover" alt="冬冬" />
          </div>
        </div>

        {/* 标题与描述 - 紧凑型布局 */}
        <div className="text-center space-y-2 mb-6 shrink-0">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            {lang === 'zh' ? '你好，我是冬冬' : "Hi, I'm DongDong"}
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-medium max-w-md mx-auto italic">
            {dict.description}
          </p>
        </div>

        {/* 档案卡片 - 移动端 2x2, 电脑端 4x1 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl mb-8 shrink-0">
          {Object.entries(dict.info).map(([key, value], index) => (
            <div key={key} className="bg-white/70 backdrop-blur-sm border border-white p-3 md:p-4 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
              <p className="text-[9px] uppercase font-black text-purple-300 tracking-widest mb-0.5">
                {dict.labels[index]}
              </p>
              <p className="text-xs md:text-sm font-bold text-slate-600 truncate">{value as string}</p>
            </div>
          ))}
        </div>

        {/* 交互按钮 */}
        <div className="flex gap-4 w-full justify-center shrink-0">
          <a href="mailto:mama@dongdongcat.org" className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-purple-600 transition-all shadow-lg text-center uppercase tracking-widest">
            {dict.contact_btn}
          </a>
          <button onClick={() => setShowPay(true)} className="px-8 py-3 rounded-xl bg-white text-purple-600 border border-purple-100 font-bold text-sm hover:border-purple-300 transition-all shadow-sm text-center uppercase tracking-widest">
            {dict.support_btn}
          </button>
        </div>
      </section>

      {/* 3. 底部与访客 - 合并在一栏以节省空间 */}
      <footer className="px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 bg-white/10">
        <div className="flex items-center gap-3 bg-white/80 border border-purple-50 px-4 py-1.5 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="font-mono text-[10px] font-bold text-slate-500">
            {lang === 'zh' ? '第' : 'VISITOR'} <span className="text-purple-600 text-sm">{visitorId || '...'}</span> {lang === 'zh' ? '位访客' : ''}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
          <a href="mailto:mama@dongdongcat.org" className="text-[9px] font-black text-slate-400 hover:text-purple-600 transition-colors tracking-widest">
            MAMA@DONGDONGCAT.ORG
          </a>
          <p className="text-[8px] font-black text-slate-200 tracking-[0.3em] uppercase">
            © 2026 DONGDONGCAT.ORG | ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>

      {/* 收款弹窗 - 逻辑保持不变 */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-xs w-full text-center shadow-2xl relative">
            <button onClick={() => setShowPay(false)} className="absolute top-4 right-6 text-slate-300 hover:text-slate-600 text-3xl font-thin">×</button>
            <h2 className="text-lg font-black mb-6 text-slate-800 tracking-tight">{dict.support_title}</h2>
            <div className="bg-slate-50 p-4 rounded-3xl relative border border-slate-100">
              <img src="/wechat-pay.webp" className="w-full rounded-2xl" alt="Pay" />
            </div>
            <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-[9px]">{dict.wechat}</p>
          </div>
        </div>
      )}
    </main>
  );
}