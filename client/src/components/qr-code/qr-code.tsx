import { memo, useEffect, useRef, useState } from "react";
import styles from "./qr-code.module.scss";
import qrcode from "qrcode";
import DownloadIcon from "@assets/icons/download.svg";
import CrossIcon from "@assets/icons/cross.svg";

export const QrCode = memo(
  ({
    shortenedURL,
    setShowQrCode,
  }: {
    shortenedURL: string;
    setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
    const canvasSizeinPixels = 1000;

    const hideQrCode = () => {
      setShowQrCode(false);
    };

    useEffect(() => {
      qrcode.toDataURL(
        shortenedURL,
        { width: canvasSizeinPixels * 0.6, color: { light: "#ff748f", dark: "#000" } },
        (err, url) => {
          if (err) {
            return console.error(err);
          }
          const ctx = canvasRef.current?.getContext("2d");
          const logoImg = new Image();
          const qrCodeImg = new Image();
          logoImg.src = new URL("/macaw.webp", import.meta.url).href;
          qrCodeImg.src = url;
          qrCodeImg.onload = () => {
            if (ctx) {
              ctx.font = "bold 2rem Alexandria";
              const textWidth = ctx.measureText(shortenedURL).width;
              ctx.fillStyle = "#121216";
              ctx.fillRect(0, 0, canvasSizeinPixels, canvasSizeinPixels);
              ctx.fillStyle = "white";
              ctx.fillText(shortenedURL, (canvasSizeinPixels - textWidth) / 2 + 50, canvasSizeinPixels * 0.9);
              ctx.drawImage(
                qrCodeImg,
                canvasSizeinPixels * 0.15,
                canvasSizeinPixels * 0.1,
                canvasSizeinPixels * 0.7,
                canvasSizeinPixels * 0.7
              );
              ctx.drawImage(logoImg, (canvasSizeinPixels - textWidth) / 2 - 20, canvasSizeinPixels * 0.9 - 35, 50, 50);
              if (downloadLinkRef.current && canvasRef.current) {
                downloadLinkRef.current.href = canvasRef.current.toDataURL("image/png", 1);
              }
            }
          };

          return () => {
            if (canvasRef.current && ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
          };
        }
      );
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
      <div className={styles.qrCodeContainer}>
        <div className={styles.qrCode}>
          <button className={styles.closeBtn} onClick={hideQrCode}>
            <CrossIcon />
          </button>
          <canvas height={1000} width={1000} className={styles.canvas} ref={canvasRef}></canvas>
          <a download="qr-code.png" className={styles.downloadLink} ref={downloadLinkRef}>
            Download
            <DownloadIcon />
          </a>
        </div>
      </div>
    );
  }
);
