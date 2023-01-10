import { useEffect, useState } from "react";

export function useAlert(timeOutInMs: number) {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const timeOutFn = setTimeout(() => {
      setAlertMessage(null);
    }, timeOutInMs);

    return () => {
      clearTimeout(timeOutFn);
    };
  }, [alertMessage]);

  return { alertMessage, setAlertMessage };
}
