import { useState, useCallback } from 'react';
import { RdvForm, ApiResponse } from '@/types';

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

  const sendRdv = useCallback(async () => {
    if (!rdv.nom || !rdv.email) {
      setError("Le nom et l'email sont obligatoires.");
      return;
    }
    
    setRdvLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rdv),
      });
      
      const result: ApiResponse = await res.json();
      
      if (!result.success) {
        throw new Error(result.error || "Une erreur est survenue lors de l'envoi.");
      }
      
      setRdvSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion !");
    } finally {
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
