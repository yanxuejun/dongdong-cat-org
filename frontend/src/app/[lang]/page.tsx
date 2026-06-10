"use client";

export const runtime = 'edge';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import dictionaries from '../../i18n/dictionaries.json';
import ScrollReveal from '../components/ScrollReveal';
import Polaroid from '../components/Polaroid';
import PawDivider from '../components/PawDivider';

const chapterImages: Record<string, string[]> = {
  arrival: ["/images/2.jpg", "/images/3.jpg"],
  trust: ["/images/4.jpg", "/images/5.jpg"],
  explorer: ["/images/6.jpg", "/images/7.jpg"],
  mischief: ["/images/8.jpg", "/images/9.jpg"],
  expressions: ["/images/10.jpg", "/images/11.jpg"],
  playtime: ["/images/12.jpg", "/images/13.jpg"],
  today: ["/images/1.jpg", "/images/14.jpg"],
};

export default function DongDongStoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [visitorId, setVisitorId] = useState<number | null>(null);
  const [aiMsg, setAiMsg] = useState("");
  const [showPay, setShowPay] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dict = dictionaries[lang as 'zh' | 'en'] || dictionaries.zh;
  const story = dict.story;
  const chapters = story.chapters;

  useEffect(() => {
    fetch('/api/visitor').then(res => res.json()).then(data => setVisitorId(data.id));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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

  const bgGradients = [
    "from-slate-50 to-blue-50",
    "from-blue-50 to-purple-50",
    "from-purple-50 to-green-50",
    "from-green-50 to-yellow-50",
    "from-yellow-50 to-pink-50",
    "from-pink-50 to-orange-50",
    "from-orange-50 to-slate-50",
  ];

  return (
    <main className="relative bg-[#FDFDFF] text-slate-800">
      {/* 固定导航 */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 md:px-12 md:py-5 transition-all duration-500 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <a href={`/${lang}`} className="font-black tracking-tight text-lg md:text-xl text-purple-600">
          DONGDONGCAT<span className="text-slate-300">.ORG</span>
        </a>
        <div className="flex gap-6 font-bold text-xs uppercase">
          <a href="/zh" className={lang === 'zh' ? 'text-purple-600 border-b-2 border-purple-600 pb-0.5' : 'text-slate-400 hover:text-purple-400 transition-colors'}>中文</a>
          <a href="/en" className={lang === 'en' ? 'text-purple-600 border-b-2 border-purple-600 pb-0.5' : 'text-slate-400 hover:text-purple-400 transition-colors'}>EN</a>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* 星空装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        {/* 模糊光晕 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal className="text-center z-10" duration={1000}>
          <p className="text-purple-300/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6">
            {story.hero.overline}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-tight">
            {story.hero.title.split('').map((char, i) => (
              <span key={i} className="inline-block" style={{ animationDelay: `${i * 50}ms` }}>
                {char}
              </span>
            ))}
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto mb-12 font-medium">
            {story.hero.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400} className="z-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl animate-float">
            <Image
              src="/dongdong.jpg"
              alt="DongDong"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600} className="absolute bottom-12 z-10">
          <div className="flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase">
            <span>{story.hero.scroll}</span>
            <svg className="w-5 h-5 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </ScrollReveal>
      </section>

      {/* ========== 时间轴故事 ========== */}
      <div className="relative">
        {/* 中央时间轴线 - 桌面端 */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-purple-200 to-slate-200 -translate-x-1/2" />

        {chapters.map((chapter: any, index: number) => {
          const isEven = index % 2 === 0;
          const images = chapterImages[chapter.id] || [];
          const bgGradient = bgGradients[index % bgGradients.length];

          return (
            <section
              key={chapter.id}
              className={`relative py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b ${bgGradient}`}
            >
              {/* 章节锚点 */}
              <div id={chapter.id} className="absolute top-0" />

              <div className="max-w-6xl mx-auto">
                {/* 时间轴圆点 - 桌面端 */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-purple-400 rounded-full" />
                    <div className="absolute inset-0 w-4 h-4 bg-purple-400 rounded-full animate-pulse-ring" />
                  </div>
                </div>

                {/* 日期标签 - 桌面端居中 */}
                <ScrollReveal className="hidden md:flex justify-center mb-8">
                  <div className="bg-white/80 backdrop-blur-sm border border-purple-100 px-5 py-2 rounded-full shadow-sm">
                    <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">
                      {chapter.date} · {chapter.age}
                    </span>
                  </div>
                </ScrollReveal>

                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}>
                  {/* 图片区 */}
                  <div className="flex-1 flex flex-col items-center gap-6">
                    {/* 移动端日期 */}
                    <ScrollReveal className="md:hidden">
                      <div className="bg-white/80 backdrop-blur-sm border border-purple-100 px-4 py-1.5 rounded-full shadow-sm">
                        <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">
                          {chapter.date} · {chapter.age}
                        </span>
                      </div>
                    </ScrollReveal>

                    <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} gap-6`}>
                      {images.map((src: string, imgIdx: number) => (
                        <Polaroid
                          key={src}
                          src={src}
                          alt={`${chapter.title} - ${imgIdx + 1}`}
                          caption={chapter.image_captions?.[imgIdx] || ""}
                          rotate={isEven ? (imgIdx === 0 ? -2 : 2) : (imgIdx === 0 ? 2 : -2)}
                          delay={imgIdx * 150}
                          direction={isEven ? "left" : "right"}
                          priority={index < 2}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 文字区 */}
                  <div className="flex-1 max-w-lg">
                    <ScrollReveal direction={isEven ? "right" : "left"}>
                      <span className="inline-block text-[10px] font-black text-purple-300 uppercase tracking-[0.3em] mb-3">
                        Chapter {String(index + 1).padStart(2, '0')}
                      </span>
                    </ScrollReveal>
                    <ScrollReveal direction={isEven ? "right" : "left"} delay={100}>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 mb-6 leading-tight tracking-tight">
                        {chapter.title}
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal direction={isEven ? "right" : "left"} delay={200}>
                      <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
                        {chapter.body}
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>

              {/* 章节分隔 */}
              {index < chapters.length - 1 && <PawDivider />}
            </section>
          );
        })}
      </div>

      {/* ========== EPILOGUE / 互动区 ========== */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-slate-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight">
              {story.epilogue.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-lg text-slate-500 mb-12 font-medium max-w-xl mx-auto">
              {story.epilogue.body}
            </p>
          </ScrollReveal>

          {/* AI 冬冬头像 */}
          <ScrollReveal delay={200}>
            <div className="relative inline-block mb-10">
              {aiMsg && (
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-white text-slate-700 p-4 rounded-2xl text-sm font-bold shadow-xl border border-purple-50 z-30 text-center">
                  {aiMsg}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-purple-50" />
                </div>
              )}
              <button
                onClick={handleAiChat}
                disabled={loadingAi}
                className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                  loadingAi ? 'ring-4 ring-purple-100 opacity-80' : ''
                }`}
              >
                <Image
                  src="/dongdong.jpg"
                  alt="DongDong"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </button>
              <p className="mt-3 text-xs text-slate-400 font-bold uppercase tracking-widest">
                {story.epilogue.cta_chat}
              </p>
            </div>
          </ScrollReveal>

          {/* 按钮组 */}
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="mailto:mama@dongdongcat.org"
                className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-purple-600 transition-all shadow-lg uppercase tracking-widest"
              >
                {dict.contact_btn}
              </a>
              <button
                onClick={() => setShowPay(true)}
                className="px-8 py-3.5 rounded-xl bg-white text-purple-600 border border-purple-100 font-bold text-sm hover:border-purple-300 hover:bg-purple-50 transition-all shadow-sm uppercase tracking-widest"
              >
                {story.epilogue.cta_support}
              </button>
            </div>
          </ScrollReveal>

          {/* 访客计数 */}
          <ScrollReveal delay={400}>
            <div className="flex items-center justify-center gap-3 bg-white/80 border border-purple-50 px-5 py-2 rounded-full shadow-sm inline-flex">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="font-mono text-xs font-bold text-slate-500 uppercase">
                {story.epilogue.visitor_prefix}{' '}
                <span className="text-purple-600 text-sm">{visitorId || '...'}</span>{' '}
                {story.epilogue.visitor_suffix}
              </p>
            </div>
          </ScrollReveal>

          {/* 页脚 */}
          <ScrollReveal delay={500}>
            <div className="mt-16 flex flex-col items-center gap-3">
              <a
                href="mailto:mama@dongdongcat.org"
                className="group flex items-center gap-1.5 text-slate-400 hover:text-purple-600 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:animate-bounce">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-[10px] font-black font-mono tracking-widest uppercase">
                  MAMA@DONGDONGCAT.ORG
                </span>
              </a>
              <p className="text-[8px] font-black text-slate-200 tracking-[0.3em] uppercase">
                {story.epilogue.footer}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 打赏弹窗 */}
      {showPay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-6">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-xs w-full text-center shadow-2xl relative" style={{ animation: 'fadeInScale 0.3s ease-out' }}>
            <button
              onClick={() => setShowPay(false)}
              className="absolute top-4 right-6 text-slate-300 hover:text-slate-600 text-3xl font-thin"
            >
              ×
            </button>
            <h2 className="text-lg font-black mb-6 text-slate-800 tracking-tight">
              {dict.support_title}
            </h2>
            <div className="bg-slate-50 p-4 rounded-3xl relative border border-slate-100">
              <Image src="/wechat-pay.webp" alt="Pay" width={300} height={300} className="w-full rounded-2xl" />
            </div>
            <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-[9px]">
              {dict.wechat}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
