import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#160f08",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* border */}
        <div
          style={{
            position: "absolute",
            inset: 2,
            border: "1px solid #4a3a26",
            display: "flex",
          }}
        />
        {/* red accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 3,
            left: 4,
            right: 4,
            height: 2,
            background: "#d33322",
            display: "flex",
          }}
        />
        {/* "৩৬" text */}
        <span
          style={{
            fontFamily: "serif",
            fontWeight: 900,
            fontSize: 16,
            color: "#ffd54a",
            lineHeight: 1,
            letterSpacing: "-0.5px",
            marginBottom: 3,
          }}
        >
          ৩৬
        </span>
      </div>
    ),
    { ...size }
  );
}
