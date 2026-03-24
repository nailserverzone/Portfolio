import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Noor Naila Imtinan Himam — UX Researcher & Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1b1b1b 0%, #2d2d2d 50%, #1b1b1b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(214,68,121,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,186,47,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 200,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(104,123,61,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: 8,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </p>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Noor Naila
          </h1>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              margin: 0,
              marginTop: -10,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Imtinan Himam
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              marginTop: 8,
              fontStyle: "italic",
            }}
          >
            UX Researcher · Designer · Storyteller
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 20,
            }}
          >
            <span
              style={{
                background: "rgba(214,68,121,0.8)",
                color: "white",
                padding: "6px 18px",
                borderRadius: 20,
                fontSize: 16,
              }}
            >
              noornaila.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
