import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, motif, date, msg } = body;

    if (!nom || !email) {
      return NextResponse.json(
        { error: "Nom et email requis" },
        { status: 400 },
      );
    }

    // Email de notification via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "portfolio@resend.dev",
        to: process.env.EMAIL_TO,
        subject: `Nouveau RDV — ${motif} — ${nom}`,
        html: `
          <h2>Nouvelle demande de RDV 📅</h2>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Motif :</strong> ${motif}</p>
          <p><strong>Date souhaitée :</strong> ${date || "Non précisée"}</p>
          <p><strong>Message :</strong> ${msg || "Aucun message"}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      throw new Error("Erreur envoi email");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
