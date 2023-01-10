import styles from "./shortened-url.module.scss";
import { useState } from "react";
import CopyIcon from "@assets/icons/copy.svg";
import QRCodeIcon from "@assets/icons/qr-code.svg";
import { AlertDialog, QrCode } from "@components";
import { useAlert } from "@hooks";

export function ShortenedUrl({ shortURL }: { shortURL: string }) {
  const [showQrCode, setShowQrCode] = useState(false);
  const { alertMessage, setAlertMessage } = useAlert(3000);

  const copyUrlHandler = async () => {
    await navigator.clipboard.writeText(shortURL);
    setAlertMessage("URL copied!");
  };

  const toggleQrCodeHandler = () => {
    setShowQrCode((state) => !state);
  };

  return (
    <>
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
      {alertMessage && <AlertDialog message={alertMessage} type="info" />}
    </>
  );
}
