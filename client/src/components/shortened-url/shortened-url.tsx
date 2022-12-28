import styles from "./shortened-url.module.scss";
import { useState } from "react";
import CopyIcon from "@assets/icons/copy.svg";
import QRCodeIcon from "@assets/icons/qr-code.svg";
import { AlertDialog, QrCode } from "@components";

export function ShortenedUrl({ shortURL }: { shortURL: string }) {
  const [showQrCode, setShowQrCode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const copyUrlHandler = async () => {
    await navigator.clipboard.writeText(shortURL);
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
    <div className={styles.shortUrlContainer}>
      <p aria-label="Shortened URL" className={styles.shortUrl}>
        {shortURL}
      </p>
      <div className={styles.btns}>
        <button className={styles.copyBtn} onClick={copyUrlHandler} title="Copy shortened URL">
          <CopyIcon />
        </button>
        <button className={styles.qrCodeBtn} onClick={toggleQrCodeHandler} title="Show QR code">
          <QRCodeIcon />
        </button>
      </div>
      <QrCode shortURL={shortURL} showQrCode={showQrCode} setShowQrCode={setShowQrCode} />
      {showAlert && <AlertDialog message="URL copied!" type="info" />}
    </div>
  );
}
