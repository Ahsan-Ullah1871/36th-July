import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#160f08",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* outer border frame */}
        <div
          style={{
            position: "absolute",
            inset: 8,
            border: "3px solid #4a3a26",
            display: "flex",
          }}
        />
        {/* red bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            height: 8,
            background:
              "linear-gradient(90deg,#6e120b,#d33322 50%,#6e120b)",
            display: "flex",
          }}
        />
        {/* subtle blood glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 0%,rgba(96,22,12,.25),transparent 60%)",
            display: "flex",
          }}
        />
        {/* "৩৬" */}
        <span
          style={{
            fontFamily: "serif",
            fontWeight: 900,
            fontSize: 90,
            color: "#ffd54a",
            lineHeight: 1,
            letterSpacing: "-3px",
            marginBottom: 16,
            textShadow: "0 0 30px rgba(255,200,50,.4)",
          }}
        >
          ৩৬
        </span>
      </div>
    ),
    { ...size }
  );
}
