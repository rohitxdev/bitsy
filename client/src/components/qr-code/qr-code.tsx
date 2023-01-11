import { useEffect, useRef } from "react";
import styles from "./qr-code.module.scss";
import qrcode from "qrcode";
import DownloadIcon from "@assets/icons/download.svg";

export const QrCode = ({
  shortURL,
  showQrCode,
  setShowQrCode,
}: {
  shortURL: string;
  showQrCode: boolean;
  setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const canvasSize = 1000; //In pixels.

  useEffect(() => {
    qrcode.toDataURL(shortURL, { width: canvasSize * 0.6, color: { light: "#ff748f", dark: "#000" } }, (err, url) => {
      if (err) {
        return console.error(err);
      }
      const qrCodeImg = new Image();
      qrCodeImg.src = url;
      const logoImg = new Image();
      logoImg.src = new URL("/macaw.webp", import.meta.url).href;
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        ctx.font = "bold 2rem Alexandria";
        const textWidth = ctx.measureText(shortURL).width;
        ctx.fillStyle = "#121216";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.fillStyle = "white";
        ctx.fillText(shortURL, (canvasSize - textWidth) / 2 + 35, canvasSize * 0.9);
        setTimeout(() => {
          ctx.drawImage(qrCodeImg, canvasSize * 0.15, canvasSize * 0.1, canvasSize * 0.7, canvasSize * 0.7);
          ctx.drawImage(logoImg, (canvasSize - textWidth) / 2 - 30, canvasSize * 0.9 - 35, 50, 50);
          if (downloadLinkRef.current && canvasRef.current) {
            downloadLinkRef.current.href = canvasRef.current?.toDataURL("image/png", 1);
          }
        }, 0);
      }

      return () => {
        if (canvasRef.current && ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      };
    });
  }, []);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === "Escape") {
        setShowQrCode(false);
      }
    };

    return () => {
      document.onkeydown = null;
    };
  }, []);

  return (
    <div
      className={[styles.qrCodeContainer, showQrCode ? styles.show : styles.hide].join(" ")}
      onClick={(e) => {
        setShowQrCode(false);
      }}
    >
      <div className={styles.qrCode}>
        <canvas
          height={1000}
          width={1000}
          className={styles.canvas}
          ref={canvasRef}
          onClick={(e) => e.stopPropagation()}
        ></canvas>
        <a
          download="qr-code.png"
          className={styles.downloadLink}
          ref={downloadLinkRef}
          onClick={(e) => e.stopPropagation()}
        >
          Download
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
};
