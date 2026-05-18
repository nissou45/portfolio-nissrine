import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, motif, date, msg } = body;

    // Validation
    if (!nom?.trim() || !email?.trim() || !motif?.trim()) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Les champs nom, email et motif sont requis." },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Format d'email invalide." },
        { status: 400 },
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("[API_RDV] RESEND_API_KEY is missing");
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Service d'envoi d'email non configuré." },
        { status: 500 },
      );
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "portfolio@resend.dev",
        to: process.env.EMAIL_TO || "niss91@icloud.com",
        subject: `Nouveau RDV — ${motif} — ${nom}`,
        html: `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #6d28d9;">Nouvelle demande de RDV 📅</h2>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Motif :</strong> ${motif}</p>
            <p><strong>Date souhaitée :</strong> ${date || "Non précisée"}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #6d28d9;">
              <strong>Message :</strong><br/>
              ${(msg || "Aucun message").replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorData = await emailRes.json();
      console.error("[API_RDV] Resend API error:", errorData);
      return NextResponse.json<ApiResponse>(
        { success: false, error: "L'envoi de la demande a échoué." },
        { status: 502 }
      );
    }

    return NextResponse.json<ApiResponse>({ success: true });
  } catch (error) {
    console.error("[API_RDV] Server error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Une erreur interne est survenue." }, 
      { status: 500 }
    );
  }
}
