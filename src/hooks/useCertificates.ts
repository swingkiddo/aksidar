import { useState, useEffect } from "react";

interface Certificate {
  id: string;
  name: string;
  image: string;
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setCertificates)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { certificates, loading, error };
}
