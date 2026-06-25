import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#2F5D52",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          {/* arch */}
          <path
            d="M1 17 Q12 2 23 17"
            stroke="#FAFAF8"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* deck */}
          <line x1="1" y1="17" x2="23" y2="17" stroke="#FAFAF8" strokeWidth="2" strokeLinecap="round" />
          {/* cables */}
          <line x1="7" y1="17" x2="7" y2="12" stroke="#FAFAF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="17" x2="12" y2="7" stroke="#FAFAF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="17" x2="17" y2="12" stroke="#FAFAF8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
