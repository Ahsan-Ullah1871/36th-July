"use client";

import { useState } from "react";
import Image from "next/image";

// ── colour palette ──────────────────────────────────────────────────────────
const CAT = {
	red: {
		base: "#4a0a0a",
		border: "#7a1a12",
		accent: "#d8442e",
		duo: "#7a1410",
		tag: "রক্তাক্ত",
		glow: "0 0 20px rgba(180,32,18,.34), ",
		wash: "linear-gradient(180deg,rgba(20,2,2,.12) 0%,rgba(40,6,5,.20) 42%,rgba(74,10,10,.86) 100%)",
	},
	amber: {
		base: "#2d2000",
		border: "#6b4e1e",
		accent: "#d8a63f",
		duo: "#6e5016",
		tag: "গুরুত্বপূর্ণ মোড়",
		glow: "",
		wash: "linear-gradient(180deg,rgba(18,12,0,.10) 0%,rgba(30,22,0,.18) 42%,rgba(45,32,0,.88) 100%)",
	},
	gray: {
		base: "#241a10",
		border: "#4a3a26",
		accent: "#a08a64",
		duo: "#463523",
		tag: "আন্দোলন চলমান",
		glow: "",
		wash: "linear-gradient(180deg,rgba(12,9,5,.12) 0%,rgba(24,18,12,.22) 42%,rgba(36,26,16,.88) 100%)",
	},
	green: {
		base: "#3d2800",
		border: "#7a5620",
		accent: "#e6b850",
		duo: "#5a3e10",
		tag: "বিজয়",
		glow: "0 0 22px rgba(220,168,60,.22), ",
		wash: "linear-gradient(180deg,rgba(16,10,0,.10) 0%,rgba(30,20,2,.20) 42%,rgba(61,40,0,.86) 100%)",
	},
} as const;

type CatKey = keyof typeof CAT;

// ── day data ────────────────────────────────────────────────────────────────
const MARTYR_DAYS = new Set([16, 17, 18, 19, 20, 35]);

const RAW: {
	n: number;
	bn: string;
	date: string;
	title: string;
	cat: CatKey;
	img: string | null;
	extra?: string;
}[] = [
	{
		n: 1,
		bn: "১",
		date: "১লা জুলাই",
		title: "আন্দোলনের সূচনা",
		cat: "amber",
		img: "/images/d1.jpg",
	},
	{
		n: 2,
		bn: "২",
		date: "২রা জুলাই",
		title: "সড়কে প্রতিবাদ",
		cat: "gray",
		img: "/images/d2.jpg",
	},
	{
		n: 3,
		bn: "৩",
		date: "৩রা জুলাই",
		title: "অবরোধ কর্মসূচি",
		cat: "gray",
		img: "/images/d3.jpg",
	},
	{
		n: 4,
		bn: "৪",
		date: "৪ঠা জুলাই",
		title: "আন্দোলন অব্যাহত",
		cat: "gray",
		img: null,
	},
	{
		n: 5,
		bn: "৫",
		date: "৫ই জুলাই",
		title: "আন্দোলন অব্যাহত",
		cat: "gray",
		img: null,
	},
	{
		n: 6,
		bn: "৬",
		date: "৬ই জুলাই",
		title: "আন্দোলন অব্যাহত",
		cat: "gray",
		img: null,
	},
	{
		n: 7,
		bn: "৭",
		date: "৭ই জুলাই",
		title: "বাংলা ব্লকেড",
		cat: "amber",
		img: "/images/d7.jpg",
	},
	{
		n: 8,
		bn: "৮",
		date: "৮ই জুলাই",
		title: "মহাসড়ক অবরোধ",
		cat: "gray",
		img: "/images/d8.jpg",
	},
	{
		n: 9,
		bn: "৯",
		date: "৯ই জুলাই",
		title: "কর্মসূচি চলমান",
		cat: "gray",
		img: "/images/d9.jpg",
	},
	{
		n: 10,
		bn: "১০",
		date: "১০ই জুলাই",
		title: "কোর্টের স্থিতাবস্থা",
		cat: "amber",
		img: "/images/d10.jpg",
	},
	{
		n: 11,
		bn: "১১",
		date: "১১ই জুলাই",
		title: "বিক্ষোভ অব্যাহত",
		cat: "gray",
		img: "/images/d11.jpg",
	},
	{
		n: 12,
		bn: "১২",
		date: "১২ই জুলাই",
		title: "গণসংযোগ",
		cat: "gray",
		img: "/images/d12.jpg",
	},
	{
		n: 13,
		bn: "১৩",
		date: "১৩ই জুলাই",
		title: "শাটডাউন প্রস্তুতি",
		cat: "gray",
		img: "/images/d13.jpg",
	},
	{
		n: 14,
		bn: "১৪",
		date: "১৪ই জুলাই",
		title: "‘রাজাকার’ মন্তব্য",
		cat: "amber",
		img: "/images/d14.jpg",
	},
	{
		n: 15,
		bn: "১৫",
		date: "১৫ই জুলাই",
		title: "ছাত্রলীগের হামলা",
		cat: "red",
		img: "/images/d15.jpg",
		extra: "/images/d15b.jpg",
	},
	{
		n: 16,
		bn: "১৬",
		date: "১৬ই জুলাই",
		title: "আবু সাঈদ শহীদ",
		cat: "red",
		img: "/images/d16.jpg",
		extra: "/images/d16b.jpg",
	},
	{
		n: 17,
		bn: "১৭",
		date: "১৭ই জুলাই",
		title: "গায়েবানা জানাজা",
		cat: "red",
		img: "/images/d17.jpg",
	},
	{
		n: 18,
		bn: "১৮",
		date: "১৮ই জুলাই",
		title: "গণহত্যা, নেট বন্ধ",
		cat: "red",
		img: "/images/d18.jpg",
	},
	{
		n: 19,
		bn: "১৯",
		date: "১৯শে জুলাই",
		title: "কারফিউ, দেখামাত্র গুলি",
		cat: "red",
		img: "/images/d19.jpg",
	},
	{
		n: 20,
		bn: "২০",
		date: "২০শে জুলাই",
		title: "কারফিউয়ে রক্তপাত",
		cat: "red",
		img: "/images/d20.jpg",
	},
	{
		n: 21,
		bn: "২১",
		date: "২১শে জুলাই",
		title: "কোটা রায় ঘোষণা",
		cat: "amber",
		img: "/images/d21.jpg",
	},
	{
		n: 22,
		bn: "২২",
		date: "২২শে জুলাই",
		title: "কারফিউ বলবৎ",
		cat: "gray",
		img: "/images/d22.jpg",
	},
	{
		n: 23,
		bn: "২৩",
		date: "২৩শে জুলাই",
		title: "থমথমে দেশ",
		cat: "gray",
		img: "/images/d23.jpg",
	},
	{
		n: 24,
		bn: "২৪",
		date: "২৪শে জুলাই",
		title: "ধরপাকড়",
		cat: "gray",
		img: "/images/d24.jpg",
	},
	{
		n: 25,
		bn: "২৫",
		date: "২৫শে জুলাই",
		title: "গণগ্রেপ্তার",
		cat: "gray",
		img: "/images/d25.jpg",
	},
	{
		n: 26,
		bn: "২৬",
		date: "২৬শে জুলাই",
		title: "সমন্বয়ক আটক",
		cat: "amber",
		img: "/images/d26.jpg",
	},
	{
		n: 27,
		bn: "২৭",
		date: "২৭শে জুলাই",
		title: "প্রতিরোধ অব্যাহত",
		cat: "gray",
		img: "/images/d27.jpg",
	},
	{
		n: 28,
		bn: "২৮",
		date: "২৮শে জুলাই",
		title: "জোরপূর্বক বিবৃতি",
		cat: "amber",
		img: "/images/d28.jpg",
	},
	{
		n: 29,
		bn: "২৯",
		date: "২৯শে জুলাই",
		title: "লাল প্রোফাইল",
		cat: "amber",
		img: "/images/d29.jpg",
	},
	{
		n: 30,
		bn: "৩০",
		date: "৩০শে জুলাই",
		title: "শোক ও প্রতিরোধ",
		cat: "amber",
		img: "/images/d30.jpg",
	},
	{
		n: 31,
		bn: "৩১",
		date: "৩১শে জুলাই",
		title: "মার্চ ফর জাস্টিস",
		cat: "amber",
		img: "/images/d31.jpg",
	},
	{
		n: 32,
		bn: "৩২",
		date: "১লা আগস্ট",
		title: "সমন্বয়করা মুক্ত",
		cat: "amber",
		img: "/images/d32.jpg",
	},
	{
		n: 33,
		bn: "৩৩",
		date: "২রা আগস্ট",
		title: "গণআন্দোলন পুনরায়",
		cat: "gray",
		img: "/images/d33.jpg",
	},
	{
		n: 34,
		bn: "৩৪",
		date: "৩রা আগস্ট",
		title: "এক দফা দাবি",
		cat: "amber",
		img: "/images/d34.jpg",
	},
	{
		n: 35,
		bn: "৩৫",
		date: "৪ঠা আগস্ট",
		title: "অসহযোগ, রক্তাক্ত দিন",
		cat: "red",
		img: "/images/d35.jpg",
	},
	{
		n: 36,
		bn: "৩৬",
		date: "৫ই আগস্ট",
		title: "বিজয়ের দিন",
		cat: "green",
		img: "/images/d36.jpg",
	},
];

// ── lightbox state type ─────────────────────────────────────────────────────
interface OpenDay {
	bn: string;
	date: string;
	title: string;
	images: string[];
	noImg: boolean;
	accentBg: string;
	catTag: string;
}

// ── grain SVG data URL ──────────────────────────────────────────────────────
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── WEEKDAYS ────────────────────────────────────────────────────────────────
const WEEK = ["সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি", "রবি"];

// ── MARQUEE names ───────────────────────────────────────────────────────────
const MARTYRS =
	"আবু সাঈদ · মীর মাহফুজুর রহমান মুগ্ধ · ওয়াসিম আকরাম · ফারহান ফাইয়াজ · শেখ আশহাবুল ইয়ামিন · নাফিসা হোসেন মারওয়া · রুদ্র সেন · ইমাম হাসান তাঈম · সুমাইয়া আক্তার · রিয়া গোপ · দ্বীপ্ত দে · নাসিব হাসান রিয়ান · তাহমিদ তামিম · ফাইয়াজ আহমেদ · আনাস · মাহমুদুর রহমান সৈকত · ";

// ── DayCard ─────────────────────────────────────────────────────────────────
function DayCard({
	day,
	onOpen,
}: {
	day: (typeof RAW)[number];
	onOpen: (d: OpenDay) => void;
}) {
	const c = CAT[day.cat];
	const images = [day.img, day.extra].filter(Boolean) as string[];

	const isHighlighted = day.n === 16;
	const boxShadow = isHighlighted
		? `0 0 0 2px rgba(245,232,205,.7), 0 0 32px rgba(255,255,255,.32), ${c.glow}inset 0 0 0 1px rgba(0,0,0,.4)`
		: `${c.glow}inset 0 0 0 1px rgba(0,0,0,.35)`;

	return (
		<div
			onClick={() =>
				onOpen({
					bn: day.bn,
					date: day.date,
					title: day.title,
					images,
					noImg: images.length === 0,
					accentBg: c.accent,
					catTag: c.tag,
				})
			}
			style={{
				position: "relative",
				overflow: "hidden",
				aspectRatio: "1 / 1.16",
				background: "#1a1208",
				isolation: "isolate",
				cursor: "pointer",
				border: `1px solid ${c.border}`,
				boxShadow,
				transform: isHighlighted
					? "scale(1.055)"
					: undefined,
				zIndex: isHighlighted ? 5 : undefined,
				transition:
					"transform .16s ease, box-shadow .16s ease",
			}}
		>
			{/* photo layer */}
			{day.img && (
				<>
					<div
						style={{
							position: "absolute",
							inset: 0,
							backgroundImage: `url("${day.img}")`,
							backgroundSize: "cover",
							backgroundPosition:
								"center 32%",
							filter: "grayscale(1) contrast(1.22) brightness(.72)",
						}}
					/>
					{/* duo‑tone overlay */}
					<div
						style={{
							position: "absolute",
							inset: 0,
							background: c.duo,
							mixBlendMode: "color",
							opacity: 0.82,
							pointerEvents: "none",
						}}
					/>
				</>
			)}
			{/* wash gradient */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					background: c.wash,
				}}
			/>
			{/* inner shadow */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					boxShadow: "inset 0 0 34px rgba(0,0,0,.6), inset 0 0 8px rgba(0,0,0,.5)",
				}}
			/>
			{/* text content */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					padding: "10px 12px 11px",
					display: "flex",
					flexDirection: "column",
					zIndex: 2,
				}}
			>
				<div
					style={{
						fontFamily:
							"'Noto Serif Bengali', serif",
						fontWeight: 900,
						fontSize: 66,
						lineHeight: 0.78,
						margin: "-6px 0 0 -3px",
						color: "#f5e6c8",
						textShadow:
							"0 3px 8px rgba(0,0,0,.85), 0 1px 0 rgba(0,0,0,.6)",
					}}
				>
					{day.bn}
				</div>
				<div
					style={{
						width: 28,
						height: 3,
						marginTop: 6,
						background: c.accent,
					}}
				/>
				<div style={{ marginTop: "auto" }}>
					<div
						style={{
							fontFamily:
								"'Noto Serif Bengali', serif",
							fontWeight: 700,
							fontSize: 16,
							color: "#f6ead2",
							textShadow:
								"0 1px 5px rgba(0,0,0,.98), 0 0 2px rgba(0,0,0,.9)",
						}}
					>
						{day.date}
					</div>
					<div
						style={{
							fontSize: 14,
							fontWeight: 500,
							lineHeight: 1.3,
							color: "#e8d8b8",
							marginTop: 3,
							textShadow:
								"0 1px 5px rgba(0,0,0,.98), 0 0 2px rgba(0,0,0,.9)",
						}}
					>
						{day.title}
					</div>
				</div>
			</div>
			{/* martyr mark */}
			{MARTYR_DAYS.has(day.n) && (
				<div
					style={{
						position: "absolute",
						top: 8,
						right: 9,
						zIndex: 3,
						fontSize: 18,
						lineHeight: 1,
						color: "#f0c8b4",
						textShadow:
							"0 0 10px rgba(220,50,30,.85), 0 1px 2px #000",
					}}
				>
					☪
				</div>
			)}
		</div>
	);
}

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ day, onClose }: { day: OpenDay; onClose: () => void }) {
	return (
		<div
			onClick={onClose}
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 100,
				background: "rgba(6,4,2,.92)",
				backdropFilter: "blur(4px)",
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "center",
				padding: "38px 20px",
				overflowY: "auto",
				animation: "omFade .2s ease",
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					width: 760,
					maxWidth: "100%",
					background: "#161009",
					border: "1px solid #4a3a24",
					boxShadow: "0 30px 90px rgba(0,0,0,.8)",
					animation: "omRise .28s cubic-bezier(.2,.8,.2,1)",
				}}
			>
				{/* header */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						padding: "16px 18px",
						borderBottom: `2px solid ${day.accentBg}`,
						background:
							"linear-gradient(180deg,#1f160d,#160f09)",
					}}
				>
					<div
						style={{
							fontFamily:
								"'Noto Serif Bengali', serif",
							fontWeight: 900,
							fontSize: 48,
							lineHeight: 0.8,
							color: "#f5e6c8",
						}}
					>
						{day.bn}
					</div>
					<div style={{ flex: 1 }}>
						<div
							style={{
								fontFamily:
									"'Noto Serif Bengali', serif",
								fontWeight: 700,
								fontSize: 20,
								color: "#f3e6cd",
							}}
						>
							{day.date}, ২০২৪
						</div>
						<div
							style={{
								fontSize: 14,
								color: "#c6b490",
							}}
						>
							{day.title}
						</div>
					</div>
					<div
						style={{
							fontSize: 11,
							letterSpacing: ".16em",
							textTransform: "uppercase",
							color: "#120d08",
							fontWeight: 700,
							background: day.accentBg,
							padding: "5px 11px",
						}}
					>
						{day.catTag}
					</div>
					<button
						onClick={onClose}
						style={{
							width: 36,
							height: 36,
							border: "1px solid #4a3a24",
							background: "transparent",
							color: "#c6b490",
							fontSize: 22,
							lineHeight: 1,
							cursor: "pointer",
						}}
					>
						×
					</button>
				</div>
				{/* images */}
				<div style={{ background: "#0e0a06" }}>
					{day.images.length > 0 ? (
						day.images.map((src, i) => (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								key={i}
								src={src}
								alt=""
								style={{
									display: "block",
									width: "100%",
									height: "auto",
								}}
							/>
						))
					) : (
						<div
							style={{
								padding: "60px 30px",
								textAlign: "center",
								color: "#8a7550",
								fontFamily:
									"'Noto Serif Bengali', serif",
								fontSize: 17,
								lineHeight: 1.8,
							}}
						>
							এই দিনের জন্য সংরক্ষিত কোনো ছবি
							নেই।
							<br />
							<span
								style={{
									fontSize: 14,
									color: "#6d5c42",
								}}
							>
								তবে সংগ্রাম প্রতিদিনই
								অব্যাহত ছিল।
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// ── main Calendar component ──────────────────────────────────────────────────
export default function Calendar() {
	const [open, setOpen] = useState<OpenDay | null>(null);

	const grid = RAW.slice(0, 35);
	const victory = RAW[35];
	const victoryC = CAT[victory.cat];

	return (
		<div
			style={{
				minHeight: "100%",
				width: "100%",
				padding: "44px 20px 60px",
				display: "flex",
				justifyContent: "center",
				background:
					"radial-gradient(120% 80% at 50% 0%,#22160c 0%,#140d06 55%,#0b0703 100%)",
				fontFamily: "'Hind Siliguri', sans-serif",
			}}
		>
			<div
				style={{
					width: 1240,
					maxWidth: "100%",
					position: "relative",
					background:
						"linear-gradient(180deg,#1f160c 0%,#160f08 100%)",
					boxShadow: "0 0 0 9px #0c0805, 0 0 0 10px #2a1d10, 0 30px 80px rgba(0,0,0,.75), inset 0 0 170px rgba(0,0,0,.8)",
					borderRadius: 2,
					overflow: "hidden",
				}}
			>
				{/* blood stain overlay */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						zIndex: 0,
						pointerEvents: "none",
						background: `
            radial-gradient(circle at 79% 34%,rgba(120,20,12,.20),transparent 9%),
            radial-gradient(circle at 88% 40%,rgba(120,20,12,.16),transparent 6%),
            radial-gradient(circle at 72% 47%,rgba(110,18,10,.14),transparent 11%),
            radial-gradient(circle at 20% 62%,rgba(70,45,18,.16),transparent 7%),
            radial-gradient(circle at 84% 74%,rgba(70,45,18,.13),transparent 8%),
            radial-gradient(120% 60% at 50% 8%,rgba(96,22,12,.16),transparent 60%)`,
					}}
				/>

				{/* ── HERO HEADER ── */}
				<header
					style={{
						position: "relative",
						zIndex: 2,
						overflow: "hidden",
						padding: 0,
					}}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/images/d1.jpg"
						alt=""
						style={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center 42%",
							filter: "grayscale(1) contrast(1.18) brightness(.5)",
							opacity: 0.68,
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg,rgba(15,9,4,.5) 0%,rgba(20,12,5,.38) 45%,rgba(14,8,4,.8) 100%), radial-gradient(80% 60% at 50% 30%,rgba(120,22,14,.24),transparent 65%)",
						}}
					/>
					<div
						style={{
							position: "relative",
							zIndex: 1,
							textAlign: "center",
							padding: "52px 40px 40px",
						}}
					>
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: 14,
								color: "#d8a63f",
								fontWeight: 600,
								letterSpacing: ".42em",
								fontSize: 13,
								textTransform:
									"uppercase",
							}}
						>
							<span
								style={{
									width: 40,
									height: 1,
									background:
										"linear-gradient(90deg,transparent,#d8a63f)",
								}}
							/>
							<span>
								জুলাই&nbsp;২০২৪&nbsp;·&nbsp;গণঅভ্যুত্থান
							</span>
							<span
								style={{
									width: 40,
									height: 1,
									background:
										"linear-gradient(270deg,transparent,#d8a63f)",
								}}
							/>
						</div>
						<h1
							style={{
								fontFamily:
									"'Noto Serif Bengali', serif",
								fontWeight: 900,
								color: "#f5e6c8",
								fontSize: 88,
								lineHeight: 0.96,
								margin: "16px 0 8px",
								letterSpacing:
									"-.015em",
								textShadow:
									"0 3px 0 #000, 0 2px 24px rgba(0,0,0,.9), 0 0 60px rgba(190,44,26,.35)",
							}}
						>
							জুলাই গণঅভ্যুত্থান
						</h1>
						<p
							style={{
								fontFamily:
									"'Noto Serif Bengali', serif",
								fontWeight: 600,
								color: "#e4d3b0",
								fontSize: 23,
								margin: "6px 0 22px",
								letterSpacing: ".01em",
								textShadow:
									"0 1px 6px rgba(0,0,0,.9)",
							}}
						>
							৩৬টি দিন যা ইতিহাস বদলে দিয়েছে
						</p>

						{/* death toll */}
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: 20,
								padding: "12px 26px",
								border: "1px solid rgba(216,68,46,.4)",
								background:
									"rgba(30,8,5,.5)",
								boxShadow: "0 0 30px rgba(120,20,12,.3)",
							}}
						>
							<div
								style={{
									textAlign: "right",
								}}
							>
								<div
									style={{
										fontFamily:
											"'Noto Serif Bengali', serif",
										fontWeight: 900,
										fontSize: 44,
										lineHeight: 0.9,
										color: "#e8543c",
										textShadow:
											"0 0 22px rgba(200,40,26,.5)",
									}}
								>
									৮৫৪+
								</div>
							</div>
							<div
								style={{
									width: 1,
									height: 38,
									background:
										"rgba(216,68,46,.4)",
								}}
							/>
							<div
								style={{
									textAlign: "left",
									lineHeight: 1.25,
								}}
							>
								<div
									style={{
										fontFamily:
											"'Noto Serif Bengali', serif",
										fontWeight: 700,
										fontSize: 18,
										color: "#f5e6c8",
									}}
								>
									শহীদ
								</div>
								<div
									style={{
										fontSize: 12.5,
										color: "#b7a888",
										letterSpacing:
											".04em",
									}}
								>
									অগণিত আহত · একটি
									জাতির জাগরণ
								</div>
							</div>
						</div>

						<div
							style={{
								color: "#a89377",
								fontSize: 13,
								letterSpacing: ".28em",
								marginTop: 20,
							}}
						>
							১লা&nbsp;জুলাই&nbsp;—&nbsp;৫ই&nbsp;আগস্ট,&nbsp;২০২৪
						</div>
					</div>
					{/* wound line */}
					<div
						style={{
							position: "relative",
							zIndex: 1,
							height: 3,
							background:
								"linear-gradient(90deg,transparent 0%,#6e120b 12%,#d33322 50%,#6e120b 88%,transparent 100%)",
							boxShadow: "0 0 14px rgba(200,40,26,.6)",
						}}
					/>
				</header>

				{/* ── MAIN BODY ── */}
				<div
					style={{
						position: "relative",
						zIndex: 2,
						padding: "26px 34px 44px",
					}}
				>
					{/* Martyrs' ribbon */}
					<div
						style={{
							position: "relative",
							zIndex: 2,
							display: "flex",
							alignItems: "stretch",
							margin: "0 0 18px",
							overflow: "hidden",
							border: "1px solid #5a120c",
							background:
								"linear-gradient(90deg,#280705,#3a0c08 50%,#280705)",
							boxShadow: "inset 0 0 26px rgba(0,0,0,.65)",
						}}
					>
						<div
							style={{
								flexShrink: 0,
								zIndex: 2,
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "9px 16px",
								background: "#6e120b",
								boxShadow: "8px 0 16px rgba(0,0,0,.55)",
							}}
						>
							<span
								style={{
									fontSize: 14,
									color: "#f0c8b4",
								}}
							>
								☪
							</span>
							<span
								style={{
									fontFamily:
										"'Noto Serif Bengali', serif",
									fontWeight: 800,
									fontSize: 12,
									letterSpacing:
										".14em",
									color: "#f7ecd2",
									whiteSpace:
										"nowrap",
								}}
							>
								শহীদ স্মরণে
							</span>
						</div>
						<div
							style={{
								flex: 1,
								overflow: "hidden",
								alignSelf: "center",
								WebkitMaskImage:
									"linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
								maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)",
							}}
						>
							<div
								style={{
									display: "inline-flex",
									whiteSpace:
										"nowrap",
									animation: "omMarquee 62s linear infinite",
									fontFamily:
										"'Noto Serif Bengali', serif",
									fontSize: 14,
									color: "#e6c9a0",
									letterSpacing:
										".02em",
								}}
							>
								<span
									style={{
										padding: "9px 26px",
									}}
								>
									{MARTYRS}
								</span>
								<span
									style={{
										padding: "9px 26px",
									}}
									aria-hidden
								>
									{MARTYRS}
								</span>
							</div>
						</div>
					</div>

					{/* Weekday header */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns:
								"repeat(7,1fr)",
							gap: 9,
							margin: "0 0 9px",
						}}
					>
						{WEEK.map((w) => (
							<div
								key={w}
								style={{
									textAlign: "center",
									fontFamily:
										"'Noto Serif Bengali', serif",
									fontWeight: 700,
									fontSize: 14,
									color: "#8a7550",
									letterSpacing:
										".06em",
									padding: "6px 0",
									borderBottom:
										"1px solid #3a2c1b",
								}}
							>
								{w}
							</div>
						))}
					</div>

					{/* Calendar grid */}
					<div style={{ position: "relative" }}>
						{/* ghost watermark */}
						<div
							style={{
								position: "absolute",
								inset: 0,
								zIndex: 6,
								display: "flex",
								alignItems: "center",
								justifyContent:
									"center",
								pointerEvents: "none",
								opacity: 0.09,
								mixBlendMode:
									"soft-light",
							}}
						>
							<div
								style={{
									fontFamily:
										"'Noto Serif Bengali', serif",
									fontWeight: 900,
									fontSize: 98,
									lineHeight: 1.22,
									textAlign: "center",
									color: "#f7ecd2",
									letterSpacing:
										".01em",
									textShadow:
										"0 2px 6px rgba(0,0,0,.4)",
								}}
							>
								তাদের রক্তে লেখা হয়েছে
								<br />
								নতুন বাংলাদেশের ইতিহাস
							</div>
						</div>

						<div
							style={{
								display: "grid",
								gridTemplateColumns:
									"repeat(7,1fr)",
								gap: 9,
							}}
						>
							{grid.map((d) => (
								<DayCard
									key={d.n}
									day={d}
									onOpen={setOpen}
								/>
							))}
						</div>
					</div>

					{/* Day 36 – Victory Panel */}
					<div
						onClick={() =>
							setOpen({
								bn: victory.bn,
								date: victory.date,
								title: victory.title,
								images: [
									"/images/d36.jpg",
								],
								noImg: false,
								accentBg: "#ffd700",
								catTag: victoryC.tag,
							})
						}
						style={{
							position: "relative",
							zIndex: 2,
							marginTop: 9,
							height: 360,
							overflow: "hidden",
							cursor: "pointer",
							border: "1px solid #d4af37",
							background: "#000",
							boxShadow: "0 12px 52px rgba(0,0,0,.85), 0 0 30px rgba(212,175,55,.14)",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/images/d36.jpg"
							alt=""
							style={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								objectPosition:
									"center 84%",
								filter: "grayscale(1) sepia(.85) saturate(1.7) brightness(.72)",
								opacity: 0.2,
							}}
						/>
						<div
							style={{
								position: "absolute",
								inset: 0,
								background:
									"linear-gradient(0deg,rgba(0,0,0,.9) 0%,rgba(0,0,0,.6) 55%,rgba(0,0,0,.45) 100%), radial-gradient(70% 95% at 50% 116%,rgba(255,200,60,.16),transparent 68%)",
							}}
						/>
						<div
							style={{
								position: "absolute",
								inset: 0,
								pointerEvents: "none",
								boxShadow: "inset 0 0 120px rgba(0,0,0,.7), inset 0 0 0 1px rgba(212,175,55,.25)",
							}}
						/>
						<div
							style={{
								position: "absolute",
								inset: 0,
								zIndex: 2,
								display: "flex",
								flexDirection: "column",
								justifyContent:
									"flex-end",
								padding: "44px 48px",
							}}
						>
							<div
								style={{
									display: "inline-flex",
									alignItems:
										"center",
									gap: 12,
									marginBottom: 44,
								}}
							>
								<span
									style={{
										fontFamily:
											"'Noto Serif Bengali', serif",
										fontWeight: 800,
										fontSize: 13,
										letterSpacing:
											".3em",
										color: "#1a1200",
										background:
											"#ffd700",
										padding: "5px 13px",
									}}
								>
									দিন ৩৬
								</span>
								<span
									style={{
										fontSize: 13,
										letterSpacing:
											".3em",
										color: "#e8d3a0",
									}}
								>
									৫ই আগস্ট, ২০২৪
								</span>
							</div>
							<div
								style={{
									fontFamily:
										"'Noto Serif Bengali', serif",
									fontWeight: 900,
									fontSize: 158,
									lineHeight: 0.8,
									color: "#ffd700",
									letterSpacing:
										"-.01em",
									textShadow:
										"0 4px 0 #2a2000, 0 0 62px rgba(255,200,50,.5), 0 4px 26px rgba(0,0,0,.85)",
								}}
							>
								বিজয়
							</div>
							<div
								style={{
									display: "flex",
									alignItems:
										"flex-end",
									justifyContent:
										"space-between",
									gap: 20,
									marginTop: 18,
								}}
							>
								<div
									style={{
										fontFamily:
											"'Noto Serif Bengali', serif",
										fontWeight: 600,
										fontSize: 22,
										color: "#f5e6c8",
										textShadow:
											"0 2px 10px rgba(0,0,0,.95)",
									}}
								>
									স্বৈরাচারের পতন —
									নতুন বাংলাদেশের
									সূচনা&nbsp;·&nbsp;গণভবন
									দখল
								</div>
								<div
									style={{
										flexShrink: 0,
										fontSize: 12,
										color: "rgba(245,230,200,.8)",
										border: "1px solid rgba(212,175,55,.55)",
										padding: "6px 12px",
										whiteSpace:
											"nowrap",
									}}
								>
									বিস্তারিত&nbsp;+
								</div>
							</div>
						</div>
					</div>

					{/* Legend */}
					<div
						style={{
							marginTop: 30,
							paddingTop: 20,
							borderTop: "1px solid #33271a",
							display: "flex",
							flexWrap: "wrap",
							alignItems: "center",
							justifyContent: "center",
							gap: 24,
						}}
					>
						<div
							style={{
								fontFamily:
									"'Noto Serif Bengali', serif",
								fontWeight: 700,
								fontSize: 13,
								letterSpacing: ".2em",
								color: "#7a6b52",
								textTransform:
									"uppercase",
								marginRight: 4,
							}}
						>
							রঙের ভাষ্য
						</div>
						{[
							{
								color: CAT.red.accent,
								label: "সহিংসতা ও প্রাণহানি",
							},
							{
								color: CAT.amber.accent,
								label: "গুরুত্বপূর্ণ মোড়",
							},
							{
								color: CAT.gray.accent,
								label: "আন্দোলন চলমান",
							},
							{
								color: "#ffd700",
								label: "বিজয় ও মুক্তি",
							},
						].map((l) => (
							<div
								key={l.label}
								style={{
									display: "flex",
									alignItems:
										"center",
									gap: 9,
								}}
							>
								<span
									style={{
										width: 15,
										height: 15,
										border: "1px solid rgba(255,255,255,.18)",
										background:
											l.color,
										display: "inline-block",
									}}
								/>
								<span
									style={{
										fontSize: 13.5,
										color: "#c9b795",
									}}
								>
									{l.label}
								</span>
							</div>
						))}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 7,
							}}
						>
							<span
								style={{
									fontSize: 16,
									color: "#f0c8b4",
									textShadow:
										"0 0 8px rgba(220,50,30,.75)",
								}}
							>
								☪
							</span>
							<span
								style={{
									fontSize: 13.5,
									color: "#c9b795",
								}}
							>
								শহীদ হয়েছেন
							</span>
						</div>
					</div>

					{/* Phase stats */}
					<div
						style={{
							maxWidth: 780,
							margin: "22px auto 0",
							display: "flex",
							flexWrap: "wrap",
							border: "1px solid #3a2c1b",
							background: "rgba(20,13,7,.5)",
						}}
					>
						{[
							{
								phase: "জুলাই ১–১৫",
								count: "৩ শহীদ",
								color: "#a08a64",
							},
							{
								phase: "জুলাই ১৬–২০",
								count: "৮৫+ শহীদ",
								color: "#d8a63f",
							},
							{
								phase: "জুলাই ২১–আগস্ট ৫",
								count: "৭৬৬+ শহীদ",
								color: "#e8543c",
							},
						].map((s, i) => (
							<div
								key={s.phase}
								style={{
									flex: 1,
									minWidth: 170,
									padding: "11px 16px",
									textAlign: "center",
									borderLeft:
										i > 0
											? "1px solid #3a2c1b"
											: undefined,
								}}
							>
								<div
									style={{
										fontSize: 11,
										letterSpacing:
											".12em",
										color: "#8a7550",
										marginBottom: 3,
									}}
								>
									{s.phase}
								</div>
								<div
									style={{
										fontFamily:
											"'Noto Serif Bengali', serif",
										fontWeight: 800,
										fontSize: 19,
										color: s.color,
									}}
								>
									{s.count}
								</div>
							</div>
						))}
					</div>

					<div
						style={{
							textAlign: "center",
							marginTop: 26,
							color: "#6d5c42",
							fontSize: 12,
							letterSpacing: ".06em",
							lineHeight: 1.7,
						}}
					>
						যেকোনো দিনে ক্লিক করে সেই দিনের পূর্ণ
						বিবরণ দেখুন।
						<br />
						<span style={{ color: "#8a7550" }}>
							শহীদদের স্মৃতির উদ্দেশ্যে
							নিবেদিত&nbsp;·&nbsp;জুলাই
							গণঅভ্যুত্থান ২০২৪
						</span>
						<br />
						<span
							style={{
								display: "inline-block",
								marginTop: 8,
								color: "#8a7550",
								letterSpacing: ".14em",
							}}
						>
							তথ্য ও ছবি সূত্র&nbsp;:&nbsp;
							<span
								style={{
									color: "#c9b795",
									fontWeight: 600,
								}}
							>
								বিবিসি বাংলা
							</span>
						</span>
					</div>
				</div>

				{/* burnt frame corners */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						zIndex: 5,
						pointerEvents: "none",
						background: `radial-gradient(circle at 0% 0%,rgba(0,0,0,.72),transparent 13%),
            radial-gradient(circle at 100% 0%,rgba(0,0,0,.72),transparent 13%),
            radial-gradient(circle at 0% 100%,rgba(0,0,0,.78),transparent 14%),
            radial-gradient(circle at 100% 100%,rgba(0,0,0,.78),transparent 14%)`,
						boxShadow: "inset 0 0 70px rgba(0,0,0,.5), inset 0 0 0 2px rgba(70,52,32,.45), inset 0 0 0 4px rgba(0,0,0,.35)",
					}}
				/>

				{/* paper grain */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						zIndex: 5,
						pointerEvents: "none",
						mixBlendMode: "overlay",
						opacity: 0.34,
						backgroundSize: "160px 160px",
						backgroundImage: GRAIN_BG,
					}}
				/>
			</div>

			{/* Lightbox */}
			{open && (
				<Lightbox
					day={open}
					onClose={() => setOpen(null)}
				/>
			)}
		</div>
	);
}

