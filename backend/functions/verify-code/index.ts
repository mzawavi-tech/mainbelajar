import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { cors, json } from "../_shared/mod.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { code, device } = await req.json();
    const c = String(code || "").trim().toUpperCase();
    if (!c || !device) return json({ ok: false, message: "Kod tidak sah." });
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: r } = await sb.from("mb_codes").select("*").eq("code", c).maybeSingle();
    if (!r || r.revoked) return json({ ok: false, message: "Kod salah, cuba lagi." });
    const dev: string[] = r.devices || [];
    if (!dev.includes(device)) {
      if (dev.length >= r.max_devices) return json({ ok: false, message: "Kod ini sudah digunakan pada had peranti maksimum." });
      dev.push(device);
      await sb.from("mb_codes").update({ devices: dev }).eq("code", c);
    }
    return json({ ok: true, unlock: r.product });
  } catch (e) { console.error(e); return json({ ok: false, message: "Ralat server." }, 500); }
});
