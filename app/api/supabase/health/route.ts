import { getSupabaseConfig } from "@/lib/supabase/env";

export async function GET() {
  const headers = { "Cache-Control": "no-store" };

  try {
    const { url, key } = getSupabaseConfig();
    // Public Auth settings require neither a user session nor database tables.
    const response = await fetch(`${url.replace(/\/$/, "")}/auth/v1/settings`, {
      headers: { apikey: key },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Supabase request failed");

    return Response.json({ ok: true }, { headers });
  } catch {
    return Response.json(
      { ok: false, error: "Supabase connection check failed" },
      { status: 503, headers },
    );
  }
}
