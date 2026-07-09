import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const { name, email, message } = parsed.data;

        // Persist the message
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          await supabaseAdmin.from("contact_messages").insert({ name, email, message });
        } catch (e) {
          console.error("contact_messages insert failed", e);
        }

        // Send notification email via Resend gateway
        const lovableKey = process.env.LOVABLE_API_KEY;
        const resendKey = process.env.RESEND_API_KEY;
        if (!lovableKey || !resendKey) {
          console.error("Missing email credentials");
          return Response.json({ error: "Email not configured" }, { status: 500 });
        }

        const html = `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="margin:0 0 12px;">New contact form message</h2>
            <p style="margin:4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:12px 0 4px;"><strong>Message:</strong></p>
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
          </div>`;

        const res = await fetch(`${GATEWAY_URL}/emails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": resendKey,
          },
          body: JSON.stringify({
            from: "Contact <contact@hiyash.in>",
            to: ["officialyashop007@gmail.com"],
            reply_to: email,
            subject: `New message from ${name}`,
            html,
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          console.error(`Resend send failed [${res.status}]: ${body}`);
          return Response.json({ error: "Failed to send" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
