import { useState } from "react";
import styles from "./home.module.scss";
import CrossIcon from "@assets/icons/cross.svg";
import GithubIcon from "@assets/icons/github.svg";
import { AlertDialog, Loader, ShortenedUrl } from "@components";

export function Home() {
  const [originalURL, setOriginalURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = (import.meta.env.DEV ? "http://localhost:4000" : location.origin) + "/api/shorten-url";

  const inputHandler: React.FormEventHandler<HTMLInputElement> = (e) => {
    setOriginalURL(e.currentTarget.value);
  };

  const clearInputHandler = () => {
    setOriginalURL("");
  };

  const getShortenedURL = async () => {
    try {
      const urlRegex = new RegExp(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      );
      if (!urlRegex.test(originalURL)) {
        setShowErrorMessage(true);
        if (!showErrorMessage) {
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 4000);
        }
        return;
      }
      setIsLoading(true);
      const controller = new AbortController();
      const response = await fetch(apiEndpoint, { method: "POST", body: originalURL, signal: controller.signal });
      if (response.ok) {
        const data = await response.text();
        setShortenedURL(data);
        setIsLoading(false);
      } else {
        throw new Error("Could not get shortened URL.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && originalURL) {
      getShortenedURL();
    }
  };

  return (
    <div className={styles.home}>
      <a
        href="https://github.com/rohitreddygr8/bitsy"
        target="_blank"
        title="View source code"
        className={styles.githubLink}
      >
        <GithubIcon />
      </a>
      <section role="banner" className={styles.banner}>
        <div className={styles.title}>
          <img src="macaw.webp" alt="Website logo" />
          <p role="heading" aria-level={1}>
            Bitsy
          </p>
        </div>
        {/* <p className={styles.description}>Free URL Shortener</p> */}
        <p style={{ color: "grey", textAlign: "center" }}>
          Bitsy is a free tool to shorten URLS. Create short & memorable links in seconds.
        </p>
      </section>
      <div className={styles.originalUrl}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            aria-label="Original URL"
            placeholder="Enter URL..."
            value={originalURL}
            onInput={inputHandler}
            onKeyDown={keyDownHandler}
          />
          <button
            className={[styles.clearBtn, originalURL ? styles.show : styles.hide].join(" ")}
            onClick={clearInputHandler}
          >
            <CrossIcon />
          </button>
        </div>
        <button className={styles.shortenBtn} onClick={getShortenedURL}>
          Shorten!
        </button>
      </div>
      <div className={styles.shortenedUrlContainer}>
        {isLoading ? <Loader /> : shortenedURL && <ShortenedUrl shortenedURL={shortenedURL} />}
      </div>
      {showErrorMessage && <AlertDialog message={"Invalid URL"} type="error" />}
    </div>
  );
}
