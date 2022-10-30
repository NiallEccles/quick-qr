import type { NextPage } from "next";
import { useQRCode } from "next-qrcode";

const Qr: NextPage<{url: string}> = ({url}) => {
  const { Canvas } = useQRCode();
  return (
      <Canvas
      text={url}
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
