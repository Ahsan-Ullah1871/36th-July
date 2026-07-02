import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "July Uprising Bangladesh 2024 — 36 Days That Changed History";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
          background: "linear-gradient(160deg,#22160c 0%,#140d06 50%,#0b0703 100%)",
          fontFamily: '"Georgia", "Times New Roman", serif',
        }}
      >
        {/* blood radial overlays */}
        <div style={{ position: "absolute", inset: 0, display: "flex",
          background: "radial-gradient(circle at 85% 20%,rgba(120,20,12,.28),transparent 18%), radial-gradient(circle at 15% 75%,rgba(70,20,8,.2),transparent 16%), radial-gradient(120% 60% at 50% 0%,rgba(96,22,12,.22),transparent 55%)" }} />

        {/* outer border */}
        <div style={{ position: "absolute", inset: 18, display: "flex", border: "2px solid #4a3a26" }} />
        {/* inner border */}
        <div style={{ position: "absolute", inset: 24, display: "flex", border: "1px solid rgba(74,58,38,.45)" }} />

        {/* top wound line */}
        <div style={{ position: "absolute", top: 18, left: 18, right: 18, height: 3, display: "flex",
          background: "linear-gradient(90deg,transparent,#6e120b 12%,#d33322 50%,#6e120b 88%,transparent)" }} />
        {/* bottom wound line */}
        <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, height: 3, display: "flex",
          background: "linear-gradient(90deg,transparent,#6e120b 12%,#d33322 50%,#6e120b 88%,transparent)" }} />

        {/* LEFT — giant ৩৬ */}
        <div style={{
          position: "absolute", left: 55, top: 0, bottom: 0, width: 420,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            fontSize: 320, fontWeight: 900, lineHeight: 0.85,
            color: "#ffd54a", letterSpacing: "-6px", display: "flex",
            textShadow: "0 0 80px rgba(255,200,50,.35)",
          }}>৩৬</div>
        </div>

        {/* vertical divider */}
        <div style={{
          position: "absolute", left: 488, top: 60, bottom: 60, width: 1, display: "flex",
          background: "linear-gradient(180deg,transparent,#4a3a26 20%,#4a3a26 80%,transparent)",
        }} />

        {/* RIGHT — content */}
        <div style={{
          position: "absolute", left: 516, right: 48, top: 0, bottom: 0,
          display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 16px",
        }}>
          {/* label row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
            color: "#d8a63f", fontSize: 13, fontWeight: 600,
          }}>
            <div style={{ width: 30, height: 1, background: "linear-gradient(90deg,transparent,#d8a63f)", display: "flex" }} />
            <span>JULY 2024 · UPRISING</span>
            <div style={{ width: 30, height: 1, background: "linear-gradient(270deg,transparent,#d8a63f)", display: "flex" }} />
          </div>

          {/* main title */}
          <div style={{
            display: "flex", flexDirection: "column", marginBottom: 20,
            fontSize: 78, fontWeight: 900, lineHeight: 0.94,
            color: "#f5e6c8", letterSpacing: "-0.5px",
            textShadow: "0 4px 0 #000, 0 0 50px rgba(190,44,26,.3)",
          }}>
            <span>July</span>
            <span>Uprising</span>
          </div>

          {/* tagline */}
          <div style={{
            display: "flex", fontSize: 22, fontWeight: 600,
            color: "#e4d3b0", marginBottom: 30,
          }}>
            36 Days That Changed History
          </div>

          {/* death toll */}
          <div style={{
            display: "flex", alignItems: "center", gap: 18,
            padding: "13px 22px", width: "fit-content", marginBottom: 26,
            border: "1px solid rgba(216,68,46,.5)",
            background: "rgba(30,8,5,.6)",
          }}>
            <div style={{ fontSize: 50, fontWeight: 900, lineHeight: 0.9, color: "#e8543c", display: "flex" }}>
              ৮৫৪+
            </div>
            <div style={{ width: 1, height: 42, background: "rgba(216,68,46,.45)", display: "flex" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#f5e6c8", display: "flex" }}>Martyrs</div>
              <div style={{ fontSize: 13, color: "#b7a888", letterSpacing: "0.04em", display: "flex" }}>Countless injured · A nation's awakening</div>
            </div>
          </div>

          {/* date + url */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 14, color: "#a89377", display: "flex" }}>
              1 July — 5 August, 2024
            </div>
            <div style={{ fontSize: 14, color: "#6b5842", letterSpacing: "0.04em", display: "flex" }}>
              36july.ahsanullah.online
            </div>
          </div>
        </div>

        {/* corner vignettes */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          background: "radial-gradient(circle at 0% 0%,rgba(0,0,0,.7),transparent 12%), radial-gradient(circle at 100% 0%,rgba(0,0,0,.7),transparent 12%), radial-gradient(circle at 0% 100%,rgba(0,0,0,.75),transparent 12%), radial-gradient(circle at 100% 100%,rgba(0,0,0,.75),transparent 12%)",
        }} />
      </div>
    ),
    { ...size }
  );
}
