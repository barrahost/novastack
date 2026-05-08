import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, company, need, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Champs obligatoires manquants" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY non configurée");
    }

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#060d1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#060d1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#0d1b2e;border:1px solid #1e3a5f;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0041c2,#1a6bff);padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Nova<span style="color:#ff934e;">Stack</span></span>
                    <div style="font-size:9px;letter-spacing:4px;color:rgba(255,255,255,0.6);font-weight:600;text-transform:uppercase;margin-top:2px;">Africa</div>
                  </td>
                  <td align="right">
                    <span style="background-color:rgba(255,147,78,0.15);border:1px solid rgba(255,147,78,0.4);color:#ff934e;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;">Nouveau contact</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#ffffff;">Nouveau message reçu</h2>
              <p style="margin:0 0 32px;font-size:14px;color:#7a8fa6;">Un visiteur vient de remplir le formulaire de contact.</p>

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="background-color:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:16px 20px;">
                      <div style="font-size:10px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Nom</div>
                      <div style="font-size:15px;color:#ffffff;font-weight:600;">${escapeHtml(name)}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="background-color:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:16px 20px;">
                      <div style="font-size:10px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Email</div>
                      <div style="font-size:15px;color:#ffffff;font-weight:600;">${escapeHtml(email)}</div>
                    </div>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="background-color:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:16px 20px;">
                      <div style="font-size:10px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Entreprise</div>
                      <div style="font-size:15px;color:#ffffff;font-weight:600;">${escapeHtml(company)}</div>
                    </div>
                  </td>
                </tr>` : ""}
                ${need ? `
                <tr>
                  <td style="padding:0 0 16px;">
                    <div style="background-color:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:16px 20px;">
                      <div style="font-size:10px;font-weight:700;color:#ff934e;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Besoin</div>
                      <div style="font-size:15px;color:#ff934e;font-weight:600;">${escapeHtml(need)}</div>
                    </div>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:0 0 0;">
                    <div style="background-color:#0a1628;border:1px solid #1e3a5f;border-radius:8px;padding:16px 20px;">
                      <div style="font-size:10px;font-weight:700;color:#1a6bff;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;">Message</div>
                      <div style="font-size:14px;color:#c8d6e5;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top:24px;border-top:1px solid #1e3a5f;">
                    <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:linear-gradient(135deg,#0041c2,#1a6bff);color:#ffffff;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">
                      Repondre a ${escapeHtml(name)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1e3a5f;">
              <p style="margin:0;font-size:11px;color:#4a5568;text-align:center;">NovaStack Africa — Abidjan, Côte d'Ivoire · novastack.africa</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NovaStack Africa <noreply@novastack.africa>",
        to: ["patrice.tano.k@gmail.com"],
        reply_to: email,
        subject: `Nouveau contact NovaStack — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erreur lors de l'envoi" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
