import type { NextPage } from "next";
import { useQRCode } from "next-qrcode";

const Qr: NextPage = () => {
  const { Canvas } = useQRCode();
  return (
      <Canvas
      text={"https://github.com/bunlong/next-qrcode"}
      options={{
        type: "image/png",
        quality: 1,
        level: "H",
        margin: 3,
        scale: 4,
        width: 150,
        color: {
          dark: "#2b2b2b",
          light: "none",
        },
      }}
    />
  );
};

export default Qr;
