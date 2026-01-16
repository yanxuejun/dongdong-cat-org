
"use client";
export const runtime = 'edge';
import { useState, useEffect, use } from 'react';
import dictionaries from '../../i18n/dictionaries.json';

// 定义接口类型
interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function DongDongPage({ params }: PageProps) {
  // Next.js 15 规范：在客户端组件中使用 React.use() 解构异步 params
  const { lang } = use(params);
  
  // 状态管理
  const [visitorId, setVisitorId] = useState<number | null>(null);
  const [aiMsg, setAiMsg] = useState("");
  const [showPay, setShowPay] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  
  // 获取当前语言字典
  const dict = dictionaries[lang as 'zh' | 'en'] || dictionaries.zh;

  // 1. 页面加载时获取访客编号
  useEffect(() => {
    fetch('/api/visitor')
      .then((res) => res.json())
      .then((data) => setVisitorId(data.id))
      .catch(() => setVisitorId(888));
  }, []);

  // 2. 处理 AI 对话逻辑
  const handleAiChat = async () => {
    if (loadingAi) return;
    setLoadingAi(true);
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      setAiMsg(data.message);
      // 5秒后自动消失气泡
      setTimeout(() => setAiMsg(""), 5000);
    } catch (error) {
      setAiMsg("喵？(东东现在不想说话)");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <main className={`min-h-screen bg-[#050505] text-white selection:bg-purple-500 transition-all duration-700 ${showPay ? 'blur-2xl scale-95' : ''}`}>
      
      {/* 访客编号 (左侧挂载) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 mix-blend-difference hidden md:block">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-gray-500 [writing-mode:vertical-lr] rotate-180">
          Visitor <span className="text-purple-500 font-bold">#{visitorId ? visitorId.toString().padStart(6, '0') : '......'}</span>
        </p>
      </div>

      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full flex justify-between p-8 z-40 backdrop-blur-sm bg-black/5">
        <span className="font-black tracking-tighter text-xl uppercase">
          DongDong<span className="text-purple-600">.</span>org
        </span>
        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
          <a href="/zh" className={`transition-colors ${lang === 'zh' ? 'text-purple-500' : 'text-gray-500 hover:text-white'}`}>ZH</a>
          <a href="/en" className={`transition-colors ${lang === 'en' ? 'text-purple-500' : 'text-gray-500 hover:text-white'}`}>EN</a>
        </div>
      </nav>

      {/* 核心展示区 */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        
        {/* 东东头像与AI对话气泡 */}
        <div className="relative mb-12 group">
          {aiMsg && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-white text-black p-4 rounded-2xl text-sm font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-in slide-in-from-bottom-2 duration-300 z-20">
              {aiMsg}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            </div>
          )}
          
          <div 
            onClick={handleAiChat}
            className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-white/10 p-2 cursor-pointer transition-all duration-500 ${loadingAi ? 'animate-pulse border-purple-500' : 'hover:border-purple-500/50'}`}
          >
            <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="/dongdong.jpg" 
              alt="Dong Dong"
              className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 shadow-2xl relative z-10" 
            />
          </div>
        </div>

        {/* 标题文字 */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent uppercase">
            {lang === 'zh' ? '我是东东' : "I'M DONGDONG"}
          </h1>
          <p className="text-gray-500 tracking-[0.3em] text-[10px] md:text-xs uppercase max-w-xs mx-auto leading-loose">
            {dict.description}
          </p>
        </div>

        {/* 交互按钮组 */}
        <div className="flex flex-col md:flex-row gap-6 mt-16">
          <a 
            href="mailto:mama@dongdongcat.org" 
            className="px-12 py-4 rounded-full bg-white text-black text-[10px] font-black tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all uppercase shadow-xl"
          >
            {dict.contact_btn}
          </a>
          <button 
            onClick={() => setShowPay(true)} 
            className="px-12 py-4 rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] hover:bg-white/5 transition-all uppercase backdrop-blur-md"
          >
            {dict.support_btn}
          </button>
        </div>
      </section>

      {/* 打赏模态框 (Modal) */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="max-w-xs w-full text-center relative">
            <button 
              onClick={() => setShowPay(false)} 
              className="absolute -top-16 right-0 text-white text-5xl font-thin hover:rotate-90 transition-transform duration-300 p-4"
            >
              ×
            </button>
            
            <h2 className="text-sm font-black mb-10 tracking-[0.4em] uppercase text-purple-500">
              {dict.support_title}
            </h2>
            
            <div className="relative group rounded-[2rem] overflow-hidden bg-white p-6 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
              {/* 扫码线动画 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent animate-scan shadow-[0_0_15px_rgba(168,85,247,1)]"></div>
              
              <img src="/wechat-pay.webp" alt="WeChat Pay" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <p className="mt-8 text-gray-500 text-[10px] tracking-[0.3em] uppercase">
              {dict.wechat}
            </p>
          </div>
        </div>
      )}

      {/* 页脚 */}
      <footer className="absolute bottom-8 w-full text-center text-[10px] text-gray-600 tracking-widest font-mono opacity-50">
        © 2026 DONGDONGCAT.ORG | ALL RIGHTS RESERVED
      </footer>

    </main>
  );
}