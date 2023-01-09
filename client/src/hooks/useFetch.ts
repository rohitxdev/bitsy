import { useEffect, useState } from "react";

export function useFetch(input: RequestInfo | URL, init?: RequestInit | undefined) {
  const [res, setRes] = useState<Response>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchData = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
    try {
      setIsLoading(true);
      const response = await fetch(input, init);
      if (!response.ok) {
        throw new Error("Could not get the requested resource.");
      }
      setRes(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(input, { ...init, signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, []);

  return { res, isLoading, error };
}
