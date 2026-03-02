const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_EMAIL = "hola@trazo.digital";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const { name, email, phone, message, source, property_id, interested_in } = await req.json();

    const sourceLabel = source === "property"
      ? "Consulta sobre propiedad"
      : source === "lead_magnet"
      ? "Descarga de guía"
      : "Formulario de contacto";

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a365d; border-bottom: 2px solid #d4a853; padding-bottom: 10px;">
          Nuevo Lead: ${sourceLabel}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Nombre:</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Teléfono:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ""}
          ${interested_in ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Interesado en:</td><td style="padding: 8px 0;">${interested_in}</td></tr>` : ""}
          ${property_id ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Propiedad:</td><td style="padding: 8px 0;">${property_id}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Origen:</td><td style="padding: 8px 0;">${source}</td></tr>
        </table>
        ${message ? `
          <div style="margin-top: 20px; padding: 16px; background: #f7f7f7; border-radius: 8px;">
            <strong style="color: #555;">Mensaje:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
          </div>
        ` : ""}
        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          Enviado desde Encarnación Inmobiliaria
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Encarnación Inmobiliaria <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        reply_to: email,
        subject: `🏠 ${sourceLabel} — ${name}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data.id);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in notify-lead:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
