import styles from "./alert-dialog.module.scss";
import ExclamationMarkIcon from "@assets/icons/exclamation-mark.svg";

export function AlertDialog({ message, type }: { message: string; type: "error" | "info" }) {
  return (
    <section className={[styles.alertDialog, styles[type]].join(" ")} role="alertdialog" aria-live="assertive">
      {message}
      <ExclamationMarkIcon />
    </section>
  );
}
