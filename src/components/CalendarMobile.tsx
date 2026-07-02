"use client";

import { useState } from "react";

const CAT = {
  red:   { border: "#7a1a12", accent: "#d8442e", duo: "#7a1410", tag: "রক্তাক্ত",         glow: "0 0 16px rgba(180,32,18,.34), " },
  amber: { border: "#6b4e1e", accent: "#d8a63f", duo: "#6e5016", tag: "গুরুত্বপূর্ণ মোড়",  glow: "" },
  gray:  { border: "#4a3a26", accent: "#a08a64", duo: "#463523", tag: "আন্দোলন চলমান",     glow: "" },
  green: { border: "#7a5620", accent: "#e6b850", duo: "#5a3e10", tag: "বিজয়",             glow: "0 0 18px rgba(220,168,60,.22), " },
} as const;
type CatKey = keyof typeof CAT;

const MARTYR_DAYS = new Set([16, 17, 18, 19, 20, 35]);

const RAW: {
  n: number; bn: string; date: string; title: string;
  cat: CatKey; img: string | null; extra?: string;
}[] = [
  { n:1,  bn:"১",  date:"১লা জুলাই",   title:"আন্দোলনের সূচনা",       cat:"amber", img:"/images/d1.jpg" },
  { n:2,  bn:"২",  date:"২রা জুলাই",   title:"সড়কে প্রতিবাদ",         cat:"gray",  img:"/images/d2.jpg" },
  { n:3,  bn:"৩",  date:"৩রা জুলাই",   title:"অবরোধ কর্মসূচি",        cat:"gray",  img:"/images/d3.jpg" },
  { n:4,  bn:"৪",  date:"৪ঠা জুলাই",   title:"আন্দোলন অব্যাহত",       cat:"gray",  img:null },
  { n:5,  bn:"৫",  date:"৫ই জুলাই",    title:"আন্দোলন অব্যাহত",       cat:"gray",  img:null },
  { n:6,  bn:"৬",  date:"৬ই জুলাই",    title:"আন্দোলন অব্যাহত",       cat:"gray",  img:null },
  { n:7,  bn:"৭",  date:"৭ই জুলাই",    title:"বাংলা ব্লকেড",          cat:"amber", img:"/images/d7.jpg" },
  { n:8,  bn:"৮",  date:"৮ই জুলাই",    title:"মহাসড়ক অবরোধ",         cat:"gray",  img:"/images/d8.jpg" },
  { n:9,  bn:"৯",  date:"৯ই জুলাই",    title:"কর্মসূচি চলমান",        cat:"gray",  img:"/images/d9.jpg" },
  { n:10, bn:"১০", date:"১০ই জুলাই",   title:"কোর্টের স্থিতাবস্থা",    cat:"amber", img:"/images/d10.jpg" },
  { n:11, bn:"১১", date:"১১ই জুলাই",   title:"বিক্ষোভ অব্যাহত",       cat:"gray",  img:"/images/d11.jpg" },
  { n:12, bn:"১২", date:"১২ই জুলাই",   title:"গণসংযোগ",              cat:"gray",  img:"/images/d12.jpg" },
  { n:13, bn:"১৩", date:"১৩ই জুলাই",   title:"শাটডাউন প্রস্তুতি",     cat:"gray",  img:"/images/d13.jpg" },
  { n:14, bn:"১৪", date:"১৪ই জুলাই",   title:"'রাজাকার' মন্তব্য",  cat:"amber", img:"/images/d14.jpg" },
  { n:15, bn:"১৫", date:"১৫ই জুলাই",   title:"ছাত্রলীগের হামলা",      cat:"red",   img:"/images/d15.jpg", extra:"/images/d15b.jpg" },
  { n:16, bn:"১৬", date:"১৬ই জুলাই",   title:"আবু সাঈদ শহীদ",        cat:"red",   img:"/images/d16.jpg", extra:"/images/d16b.jpg" },
  { n:17, bn:"১৭", date:"১৭ই জুলাই",   title:"গায়েবানা জানাজা",      cat:"red",   img:"/images/d17.jpg" },
  { n:18, bn:"১৮", date:"১৮ই জুলাই",   title:"গণহত্যা, নেট বন্ধ",     cat:"red",   img:"/images/d18.jpg" },
  { n:19, bn:"১৯", date:"১৯শে জুলাই",  title:"কারফিউ, দেখামাত্র গুলি", cat:"red",  img:"/images/d19.jpg" },
  { n:20, bn:"২০", date:"২০শে জুলাই",  title:"কারফিউয়ে রক্তপাত",     cat:"red",   img:"/images/d20.jpg" },
  { n:21, bn:"২১", date:"২১শে জুলাই",  title:"কোটা রায় ঘোষণা",       cat:"amber", img:"/images/d21.jpg" },
  { n:22, bn:"২২", date:"২২শে জুলাই",  title:"কারফিউ বলবৎ",          cat:"gray",  img:"/images/d22.jpg" },
  { n:23, bn:"২৩", date:"২৩শে জুলাই",  title:"থমথমে দেশ",            cat:"gray",  img:"/images/d23.jpg" },
  { n:24, bn:"২৪", date:"২৪শে জুলাই",  title:"ধরপাকড়",               cat:"gray",  img:"/images/d24.jpg" },
  { n:25, bn:"২৫", date:"২৫শে জুলাই",  title:"গণগ্রেপ্তার",           cat:"gray",  img:"/images/d25.jpg" },
  { n:26, bn:"২৬", date:"২৬শে জুলাই",  title:"সমন্বয়ক আটক",         cat:"amber", img:"/images/d26.jpg" },
  { n:27, bn:"২৭", date:"২৭শে জুলাই",  title:"প্রতিরোধ অব্যাহত",      cat:"gray",  img:"/images/d27.jpg" },
  { n:28, bn:"২৮", date:"২৮শে জুলাই",  title:"জোরপূর্বক বিবৃতি",      cat:"amber", img:"/images/d28.jpg" },
  { n:29, bn:"২৯", date:"২৯শে জুলাই",  title:"লাল প্রোফাইল",          cat:"amber", img:"/images/d29.jpg" },
  { n:30, bn:"৩০", date:"৩০শে জুলাই",  title:"শোক ও প্রতিরোধ",       cat:"amber", img:"/images/d30.jpg" },
  { n:31, bn:"৩১", date:"৩১শে জুলাই",  title:"মার্চ ফর জাস্টিস",      cat:"amber", img:"/images/d31.jpg" },
  { n:32, bn:"৩২", date:"১লা আগস্ট",   title:"সমন্বয়করা মুক্ত",      cat:"amber", img:"/images/d32.jpg" },
  { n:33, bn:"৩৩", date:"২রা আগস্ট",   title:"গণআন্দোলন পুনরায়",     cat:"gray",  img:"/images/d33.jpg" },
  { n:34, bn:"৩৪", date:"৩রা আগস্ট",   title:"এক দফা দাবি",          cat:"amber", img:"/images/d34.jpg" },
  { n:35, bn:"৩৫", date:"৪ঠা আগস্ট",   title:"অসহযোগ, রক্তাক্ত দিন",  cat:"red",   img:"/images/d35.jpg" },
  { n:36, bn:"৩৬", date:"৫ই আগস্ট",    title:"বিজয়ের দিন",           cat:"green", img:"/images/d36.jpg" },
];

interface OpenDay {
  bn: string; date: string; title: string;
  images: string[]; noImg: boolean;
  accentBg: string; catTag: string;
}

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const MARTYRS = "আবু সাঈদ · মীর মাহফুজুর রহমান মুগ্ধ · ওয়াসিম আকরাম · ফারহান ফাইয়াজ · শেখ আশহাবুল ইয়ামিন · নাফিসা হোসেন মারওয়া · রুদ্র সেন · ইমাম হাসান তাঈম · সুমাইয়া আক্তার · রিয়া গোপ · দ্বীপ্ত দে · নাসিব হাসান রিয়ান · তাহমিদ তামিম · আনাস · মাহমুদুর রহমান সৈকত · ";

function MobileLightbox({ day, onClose }: { day: OpenDay; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(6,4,2,.94)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: 14, overflowY: "auto",
        animation: "omFade .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 440, background: "#161009",
          border: "1px solid #4a3a24", boxShadow: "0 30px 90px rgba(0,0,0,.8)",
          animation: "omRise .28s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {/* sticky header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "13px 14px", borderBottom: `2px solid ${day.accentBg}`,
          background: "linear-gradient(180deg,#1f160d,#160f09)",
          position: "sticky", top: 0,
        }}>
          <div style={{
            fontFamily: "'Noto Serif Bengali',serif", fontWeight: 900,
            fontSize: 38, lineHeight: .8, color: "#f5e6c8",
          }}>{day.bn}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Noto Serif Bengali',serif", fontWeight: 700,
              fontSize: 17, color: "#f3e6cd",
            }}>{day.date}, ২০২৪</div>
            <div style={{ fontSize: 12.5, color: "#c6b490" }}>{day.title}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              flexShrink: 0, width: 34, height: 34, border: "1px solid #4a3a24",
              background: "transparent", color: "#c6b490", fontSize: 20,
              lineHeight: 1, cursor: "pointer",
            }}
          >×</button>
        </div>
        {/* images */}
        <div style={{ background: "#0e0a06" }}>
          {day.images.length > 0 ? (
            day.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            ))
          ) : (
            <div style={{
              padding: "44px 24px", textAlign: "center", color: "#8a7550",
              fontFamily: "'Noto Serif Bengali',serif", fontSize: 15, lineHeight: 1.8,
            }}>
              এই দিনের জন্য সংরক্ষিত কোনো ছবি নেই।<br />
              <span style={{ fontSize: 13, color: "#6d5c42" }}>তবে সংগ্রাম প্রতিদিনই অব্যাহত ছিল।</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CalendarMobile() {
  const [open, setOpen] = useState<OpenDay | null>(null);

  const grid = RAW.slice(0, 35);
  const victory = RAW[35];
  const victoryC = CAT[victory.cat];

  return (
    <div style={{
      minHeight: "100%", width: "100%", padding: "24px 0 40px",
      display: "flex", justifyContent: "center",
      background: "radial-gradient(120% 60% at 50% 0%,#22160c 0%,#140d06 55%,#0b0703 100%)",
      fontFamily: "'Hind Siliguri', sans-serif",
    }}>
      <div style={{
        width: 390, maxWidth: "100%", position: "relative",
        background: "linear-gradient(180deg,#1f160c 0%,#160f08 100%)",
        boxShadow: "0 0 0 6px #0c0805, 0 0 0 7px #2a1d10, 0 20px 60px rgba(0,0,0,.75), inset 0 0 120px rgba(0,0,0,.8)",
        overflow: "hidden",
      }}>

        {/* background stains */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `
            radial-gradient(circle at 82% 30%,rgba(120,20,12,.18),transparent 8%),
            radial-gradient(circle at 18% 52%,rgba(70,45,18,.14),transparent 7%),
            radial-gradient(circle at 78% 66%,rgba(110,18,10,.12),transparent 9%),
            radial-gradient(120% 40% at 50% 6%,rgba(96,22,12,.16),transparent 60%)`,
        }} />

        {/* ── HERO HEADER ── */}
        <header style={{ position: "relative", zIndex: 2, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/d1.jpg" alt="" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 42%",
            filter: "grayscale(1) contrast(1.18) brightness(.5)", opacity: .62,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg,rgba(15,9,4,.52) 0%,rgba(20,12,5,.4) 45%,rgba(14,8,4,.84) 100%), radial-gradient(90% 60% at 50% 30%,rgba(120,22,14,.26),transparent 65%)",
          }} />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "34px 18px 22px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              color: "#d8a63f", fontWeight: 600,
              fontSize: 12,
            }}>
              <span style={{ width: 22, height: 1, background: "linear-gradient(90deg,transparent,#d8a63f)" }} />
              <span>জুলাই&nbsp;২০২৪&nbsp;·&nbsp;গণঅভ্যুত্থান</span>
              <span style={{ width: 22, height: 1, background: "linear-gradient(270deg,transparent,#d8a63f)" }} />
            </div>
            <h1 style={{
              fontFamily: "'Noto Serif Bengali',serif", fontWeight: 900,
              color: "#f5e6c8", fontSize: 40, lineHeight: 1.04,
              margin: "12px 0 6px",
              textShadow: "0 2px 0 #000, 0 2px 14px rgba(0,0,0,.85)",
            }}>জুলাই<br />গণঅভ্যুত্থান</h1>
            <p style={{
              fontFamily: "'Noto Serif Bengali',serif", fontWeight: 600,
              color: "#e4d3b0", fontSize: 15, margin: "6px 0 18px",
              textShadow: "0 1px 5px rgba(0,0,0,.9)",
            }}>৩৬টি দিন যা ইতিহাস বদলে দিয়েছে</p>

            {/* death toll */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              padding: "9px 18px", border: "1px solid rgba(216,68,46,.4)",
              background: "rgba(30,8,5,.5)", boxShadow: "0 0 24px rgba(120,20,12,.3)",
            }}>
              <div style={{
                fontFamily: "'Noto Serif Bengali',serif", fontWeight: 900,
                fontSize: 32, lineHeight: .9, color: "#e8543c",
              }}>৮৫৪+</div>
              <div style={{ width: 1, height: 30, background: "rgba(216,68,46,.4)" }} />
              <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                <div style={{ fontFamily: "'Noto Serif Bengali',serif", fontWeight: 700, fontSize: 15, color: "#f5e6c8" }}>শহীদ</div>
                <div style={{ fontSize: 10.5, color: "#b7a888" }}>অগণিত আহত</div>
              </div>
            </div>

            <div style={{ color: "#a89377", fontSize: 10.5, marginTop: 16 }}>
              ১লা&nbsp;জুলাই&nbsp;—&nbsp;৫ই&nbsp;আগস্ট,&nbsp;২০২৪
            </div>
          </div>
          {/* wound line */}
          <div style={{
            position: "relative", zIndex: 1, height: 3,
            background: "linear-gradient(90deg,transparent 0%,#6e120b 12%,#d33322 50%,#6e120b 88%,transparent 100%)",
            boxShadow: "0 0 12px rgba(200,40,26,.6)",
          }} />
        </header>

        {/* ── BODY ── */}
        <div style={{ position: "relative", zIndex: 2, padding: "16px 14px 30px" }}>

          {/* Martyrs ribbon */}
          <div style={{
            display: "flex", alignItems: "stretch", margin: "0 0 14px",
            overflow: "hidden", border: "1px solid #5a120c",
            background: "linear-gradient(90deg,#280705,#3a0c08 50%,#280705)",
            boxShadow: "inset 0 0 20px rgba(0,0,0,.65)",
          }}>
            <div style={{
              flexShrink: 0, zIndex: 2, display: "flex", alignItems: "center",
              gap: 6, padding: "7px 11px", background: "#6e120b",
              boxShadow: "6px 0 12px rgba(0,0,0,.55)",
            }}>
              <span style={{ fontSize: 12, color: "#f0c8b4" }}>☪</span>
              <span style={{
                fontFamily: "'Noto Serif Bengali',serif", fontWeight: 800,
                fontSize: 10, color: "#f7ecd2", whiteSpace: "nowrap",
              }}>শহীদ স্মরণে</span>
            </div>
            <div style={{
              flex: 1, overflow: "hidden", alignSelf: "center",
              WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
              maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
            }}>
              <div style={{
                display: "inline-flex", whiteSpace: "nowrap",
                animation: "omMarquee 46s linear infinite",
                fontFamily: "'Noto Serif Bengali',serif", fontSize: 12.5, color: "#e6c9a0",
              }}>
                <span style={{ padding: "7px 20px" }}>{MARTYRS}</span>
                <span style={{ padding: "7px 20px" }} aria-hidden>{MARTYRS}</span>
              </div>
            </div>
          </div>

          {/* Day list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {grid.map((d) => {
              const c = CAT[d.cat];
              const isHighlighted = d.n === 16;
              const images = [d.img, d.extra].filter(Boolean) as string[];
              const boxShadow = isHighlighted
                ? `0 0 0 2px rgba(245,232,205,.62), 0 0 22px rgba(255,255,255,.28), ${c.glow}inset 0 0 40px rgba(0,0,0,.4)`
                : `${c.glow}inset 0 0 40px rgba(0,0,0,.45)`;

              return (
                <div
                  key={d.n}
                  onClick={() => setOpen({ bn: d.bn, date: d.date, title: d.title, images, noImg: images.length === 0, accentBg: c.accent, catTag: c.tag })}
                  style={{
                    position: "relative", overflow: "hidden",
                    height: isHighlighted ? 104 : 92,
                    background: "#17110d", isolation: "isolate", cursor: "pointer",
                    border: `1px solid ${c.border}`,
                    borderLeft: `4px solid ${c.accent}`,
                    boxShadow,
                  }}
                >
                  {/* photo */}
                  {d.img && (
                    <>
                      <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url("${d.img}")`,
                        backgroundSize: "cover", backgroundPosition: "center 30%",
                        filter: "grayscale(1) contrast(1.2) brightness(.78)",
                      }} />
                      <div style={{
                        position: "absolute", inset: 0, background: c.duo,
                        mixBlendMode: "color", opacity: 0.82, pointerEvents: "none",
                      }} />
                    </>
                  )}
                  {/* left-to-right fade */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg,rgba(12,8,3,.95) 0%,rgba(12,8,3,.8) 44%,rgba(12,8,3,.34) 72%,rgba(12,8,3,.05) 100%)",
                  }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 28px rgba(0,0,0,.5)" }} />
                  {/* row content */}
                  <div style={{
                    position: "absolute", inset: 0, zIndex: 2,
                    display: "flex", alignItems: "center", padding: "0 14px",
                  }}>
                    <div style={{
                      flexShrink: 0, width: 62,
                      fontFamily: "'Noto Serif Bengali',serif", fontWeight: 900,
                      fontSize: 50, lineHeight: .8, color: "#f5e6c8",
                      textShadow: "0 2px 6px rgba(0,0,0,.9)",
                    }}>{d.bn}</div>
                    <div style={{ flex: 1, paddingLeft: 8 }}>
                      <div style={{
                        fontFamily: "'Noto Serif Bengali',serif", fontWeight: 700,
                        fontSize: 16, color: "#f6ead2",
                        textShadow: "0 1px 4px rgba(0,0,0,.95)",
                      }}>{d.date}</div>
                      <div style={{
                        fontSize: 13, color: "#e4d3b2", marginTop: 2,
                        textShadow: "0 1px 4px rgba(0,0,0,.95)",
                      }}>{d.title}</div>
                    </div>
                    <div style={{ flexShrink: 0, color: "rgba(255,255,255,.42)", fontSize: 15, paddingLeft: 8 }}>+</div>
                  </div>
                  {/* martyr mark */}
                  {MARTYR_DAYS.has(d.n) && (
                    <div style={{
                      position: "absolute", top: 7, right: 12, zIndex: 3,
                      fontSize: 15, color: "#f0c8b4",
                      textShadow: "0 0 9px rgba(220,50,30,.85), 0 1px 2px #000",
                    }}>☪</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Victory panel */}
          <div
            onClick={() => setOpen({ bn: victory.bn, date: victory.date, title: victory.title, images: ["/images/d36.jpg"], noImg: false, accentBg: "#ffd700", catTag: victoryC.tag })}
            style={{
              marginTop: 8, position: "relative", zIndex: 2,
              height: 270, overflow: "hidden", cursor: "pointer",
              border: "1px solid #d4af37", background: "#000",
              boxShadow: "0 10px 34px rgba(0,0,0,.85), 0 0 24px rgba(212,175,55,.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/d36.jpg" alt="" style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 84%",
              filter: "grayscale(1) sepia(.85) saturate(1.7) brightness(.72)", opacity: .2,
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(0deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.6) 55%,rgba(0,0,0,.45) 100%), radial-gradient(75% 90% at 50% 116%,rgba(255,200,60,.16),transparent 68%)",
            }} />
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              boxShadow: "inset 0 0 80px rgba(0,0,0,.7), inset 0 0 0 1px rgba(212,175,55,.25)",
            }} />
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
              padding: 22,
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  fontFamily: "'Noto Serif Bengali',serif", fontWeight: 800,
                  fontSize: 11, color: "#1a1200",
                  background: "#ffd700", padding: "4px 10px",
                }}>দিন ৩৬</span>
                <span style={{ fontSize: 11, color: "#e8d3a0" }}>৫ই আগস্ট, ২০২৪</span>
              </div>
              <div style={{
                fontFamily: "'Noto Serif Bengali',serif", fontWeight: 900,
                fontSize: 92, lineHeight: .8, color: "#ffd700",
                textShadow: "0 3px 0 #2a2000, 0 3px 14px rgba(0,0,0,.85)",
              }}>বিজয়</div>
              <div style={{
                fontFamily: "'Noto Serif Bengali',serif", fontWeight: 600,
                fontSize: 14, color: "#f5e6c8", marginTop: 10,
                textShadow: "0 2px 8px rgba(0,0,0,.95)",
              }}>স্বৈরাচারের পতন — নতুন বাংলাদেশের সূচনা&nbsp;·&nbsp;গণভবন দখল</div>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            marginTop: 22, paddingTop: 16, borderTop: "1px solid #33271a",
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "center", gap: "12px 16px",
          }}>
            {[
              { color: CAT.red.accent,   label: "সহিংসতা ও প্রাণহানি" },
              { color: CAT.amber.accent, label: "গুরুত্বপূর্ণ মোড়" },
              { color: CAT.gray.accent,  label: "আন্দোলন চলমান" },
              { color: "#ffd700",        label: "বিজয় ও মুক্তি" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 13, height: 13, border: "1px solid rgba(255,255,255,.18)", background: l.color, display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "#c9b795" }}>{l.label}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14, color: "#f0c8b4" }}>☪</span>
              <span style={{ fontSize: 12, color: "#c9b795" }}>শহীদ হয়েছেন</span>
            </div>
          </div>

          {/* Phase stats */}
          <div style={{ marginTop: 16, border: "1px solid #3a2c1b", background: "rgba(20,13,7,.5)" }}>
            {[
              { phase: "জুলাই ১–১৫",       count: "৩ শহীদ",     color: "#a08a64" },
              { phase: "জুলাই ১৬–২০",      count: "৮৫+ শহীদ",   color: "#d8a63f" },
              { phase: "জুলাই ২১–আগস্ট ৫", count: "৭৬৬+ শহীদ",  color: "#e8543c" },
            ].map((s, i) => (
              <div key={s.phase} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "9px 14px",
                borderTop: i > 0 ? "1px solid #2f2417" : undefined,
              }}>
                <span style={{ fontSize: 12, color: "#8a7550" }}>{s.phase}</span>
                <span style={{ fontFamily: "'Noto Serif Bengali',serif", fontWeight: 800, fontSize: 16, color: s.color }}>{s.count}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 20, color: "#6d5c42", fontSize: 11, lineHeight: 1.7 }}>
            যেকোনো দিনে ট্যাপ করে সেই দিনের পূর্ণ বিবরণ দেখুন।<br />
            <span style={{ color: "#8a7550" }}>শহীদদের স্মৃতির উদ্দেশ্যে নিবেদিত</span><br />
            <span style={{ display: "inline-block", marginTop: 6, color: "#8a7550" }}>
              তথ্য ও ছবি সূত্র&nbsp;:&nbsp;<span style={{ color: "#c9b795", fontWeight: 600 }}>বিবিসি বাংলা</span>
            </span>
          </div>
        </div>

        {/* burnt corners */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: `radial-gradient(circle at 0% 0%,rgba(0,0,0,.72),transparent 10%),
            radial-gradient(circle at 100% 0%,rgba(0,0,0,.72),transparent 10%),
            radial-gradient(circle at 0% 100%,rgba(0,0,0,.78),transparent 8%),
            radial-gradient(circle at 100% 100%,rgba(0,0,0,.78),transparent 8%)`,
          boxShadow: "inset 0 0 50px rgba(0,0,0,.5), inset 0 0 0 2px rgba(70,52,32,.4)",
        }} />

        {/* paper grain */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          mixBlendMode: "overlay", opacity: 0.34,
          backgroundSize: "150px 150px", backgroundImage: GRAIN_BG,
        }} />
      </div>

      {open && <MobileLightbox day={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
