import { useEffect, useState } from "react";

export function useAlert(timeOutInMs: number) {
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const timeOutFn = setTimeout(() => {
      setAlert(null);
    }, timeOutInMs);

    return () => {
      clearTimeout(timeOutFn);
    };
  }, [alert]);

  return { alert, setAlert };
}
