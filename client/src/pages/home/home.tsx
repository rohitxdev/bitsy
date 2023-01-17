import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import CrossIcon from "@assets/icons/cross.svg";
import GithubIcon from "@assets/icons/github.svg";
import { AlertDialog, Loader, ShortenedUrl } from "@components";
import { useAlert, useViewportSize } from "@hooks";

export function Home() {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const { alertMessage, setAlertMessage } = useAlert(3000);
  const [isLoading, setIsLoading] = useState(false);
  const { vh, vw } = useViewportSize();

  const inputHandler: React.FormEventHandler<HTMLInputElement> = (e) => {
    setLongURL(e.currentTarget.value);
  };

  const clearInputHandler = () => {
    setLongURL("");
  };

  const getShortenedURL = async () => {
    try {
      const urlRegex = new RegExp(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      );
      if (!urlRegex.test(longURL)) {
        setAlertMessage("Invalid URL");
        return;
      }
      setIsLoading(true);
      const res = await fetch("/api/shorten-url", {
        method: "POST",
        body: /^https?:\/\//.test(longURL) ? longURL : `https://${longURL}`,
      });
      if (!res.ok) {
        throw new Error("Could not get shortened URL.");
      }
      const data = await res.text();
      setShortURL(`${location.origin}/${data}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && longURL) {
      getShortenedURL();
    }
  };

  return (
    <div className={styles.home} style={{ "--vh": vh + "px", "--vw": vw + "px" } as React.CSSProperties}>
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
        <p className={styles.description}>
          Bitsy is a free tool to shorten URLs. Create short & memorable links in seconds.
        </p>
      </section>
      <div className={styles.longUrl}>
        <div className={styles.inputContainer}>
          <p>https://</p>
          <input
            type="text"
            aria-label="Long URL"
            placeholder="Enter URL..."
            value={longURL}
            onInput={inputHandler}
            onKeyDown={keyDownHandler}
          />
          <button
            className={[styles.clearBtn, longURL ? styles.show : styles.hide].join(" ")}
            onClick={clearInputHandler}
          >
            <CrossIcon />
          </button>
        </div>
        <button className={styles.shortenBtn} onClick={getShortenedURL}>
          Shorten!
        </button>
      </div>
      <div className={styles.shortUrlContainer}>
        {isLoading ? <Loader /> : shortURL && <ShortenedUrl shortURL={shortURL} />}
      </div>
      {alertMessage && <AlertDialog message={alertMessage} type="error" />}
    </div>
  );
}
