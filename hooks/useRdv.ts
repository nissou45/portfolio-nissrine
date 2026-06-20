import { useState, useRef, useEffect, useCallback } from 'react';
import { RdvForm, ApiResponse } from '@/types';

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

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendRdv = useCallback(async () => {
    if (!rdv.nom.trim() || !rdv.email.trim()) {
      setError("Le nom et l'email sont obligatoires.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rdv.email)) {
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
        body: JSON.stringify(rdv),
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
  }, [rdv]);

  const updateRdv = useCallback((key: keyof RdvForm, value: string) => {
    setRdv((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    rdv,
    rdvSent,
    rdvLoading,
    error,
    sendRdv,
    updateRdv,
  };
};
