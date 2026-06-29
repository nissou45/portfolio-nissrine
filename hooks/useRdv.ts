import { useState, useRef, useEffect } from 'react';
import { RdvForm, ApiResponse } from '@/types';
import { EMAIL_RE } from '@/constants';

const RDV_TIMEOUT_MS = 15_000;

export const useRdv = () => {
  const [rdv, setRdv] = useState<RdvForm>({
    nom: "",
    email: "",
    motif: "Recrutement CDI",
    date: "",
    msg: "",
  });
  const [rdvSent, setRdvSent] = useState(false);
  const [rdvLoading, setRdvLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const rdvRef = useRef(rdv);

  // Keep rdvRef in sync
  useEffect(() => {
    rdvRef.current = rdv;
  }, [rdv]);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendRdv = async () => {
    const currentRdv = rdvRef.current;

    if (!currentRdv.nom.trim() || !currentRdv.email.trim()) {
      setError("Le nom et l'email sont obligatoires.");
      return;
    }

    if (!EMAIL_RE.test(currentRdv.email)) {
      setError("Format d'email invalide.");
      return;
    }

    setRdvLoading(true);
    setError(null);

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const timeoutId = setTimeout(() => controller.abort(), RDV_TIMEOUT_MS);

    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentRdv),
        signal: controller.signal,
      });

      const result: ApiResponse = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Une erreur est survenue lors de l'envoi.");
      }

      setRdvSent(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Erreur de connexion !");
    } finally {
      clearTimeout(timeoutId);
      setRdvLoading(false);
    }
  };

  const updateRdv = (key: keyof RdvForm, value: string) => {
    setRdv((prev) => ({ ...prev, [key]: value }));
  };

  return {
    rdv,
    rdvSent,
    rdvLoading,
    error,
    sendRdv,
    updateRdv,
  };
};
