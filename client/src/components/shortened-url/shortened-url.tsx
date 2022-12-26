import styles from "./shortened-url.module.scss";
import { useState } from "react";
import CopyIcon from "@assets/icons/copy.svg";
import QRCodeIcon from "@assets/icons/qr-code.svg";
import { AlertDialog, QrCode } from "@components";

export function ShortenedUrl({ shortenedURL }: { shortenedURL: string }) {
  const [showQrCode, setShowQrCode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const copyUrlHandler = async () => {
    await navigator.clipboard.writeText(shortenedURL);
    setShowAlert(true);
    if (!showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  const toggleQrCodeHandler = () => {
    setShowQrCode(!showQrCode);
  };

  return (
    <div className={styles.shortenedUrl}>
      <p aria-label="Shortened URL">{shortenedURL}</p>
      <button className={styles.copyBtn} onClick={copyUrlHandler} title="Copy shortened URL">
        <CopyIcon />
      </button>
      <button className={styles.qrCodeBtn} onClick={toggleQrCodeHandler} title="Show QR code">
        <QRCodeIcon />
      </button>
      {showQrCode && <QrCode shortenedURL={shortenedURL} setShowQrCode={setShowQrCode} />}
      {showAlert && <AlertDialog message="URL copied!" type="info" />}
    </div>
  );
}
