import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Provisional favicon: the brand purple with a "J", until a logo exists.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#56008C",
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        JC
      </div>
    ),
    size,
  );
}
