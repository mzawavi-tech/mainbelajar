import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { cors, json, GAMES, PRICE_ALL, PRICE_ONE } from "../_shared/mod.ts";

const TP = Deno.env.get("TOYYIB_BASE") ?? "https://toyyibpay.com"; // sandbox: https://dev.toyyibpay.com
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { name, email, phone, product } = await req.json();
    if (!name || !/^\S+@\S+\.\S+$/.test(email || "")) return json({ ok: false, message: "Nama/emel tidak sah." }, 400);
    if (product !== "all" && !GAMES.includes(product)) return json({ ok: false, message: "Produk tidak sah." }, 400);
    const amount = product === "all" ? PRICE_ALL : PRICE_ONE;
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: order, error } = await sb.from("mb_orders")
      .insert({ name, email: email.toLowerCase().trim(), phone, product, amount }).select().single();
    if (error) throw error;
    const site = Deno.env.get("SITE_URL")!; // https://mzawavi-tech.github.io/mainbelajar
    const fn = `${Deno.env.get("SUPABASE_URL")}/functions/v1`;
    const f = new URLSearchParams({
      userSecretKey: Deno.env.get("TOYYIB_SECRET")!,
      categoryCode: Deno.env.get("TOYYIB_CATEGORY")!,
      billName: product === "all" ? "MainBelajar Bundle 10 Game" : "MainBelajar " + product,
      billDescription: "Kod buka game MainBelajar (dihantar ke emel)",
      billPriceSetting: "1", billPayorInfo: "1",
      billAmount: String(amount),
      billReturnUrl: `${site}/beli/?thanks=1`,
      billCallbackUrl: `${fn}/toyyib-callback`,
      billExternalReferenceNo: order.id,
      billTo: name, billEmail: email, billPhone: phone || "0123456789",
      billSplitPayment: "0", billPaymentChannel: "2", billChargeToCustomer: "1",
    });
    const r = await fetch(`${TP}/index.php/api/createBill`, { method: "POST", body: f });
    const t = await r.json();
    const bc = t?.[0]?.BillCode;
    if (!bc) return json({ ok: false, message: "Gagal cipta bil." }, 502);
    await sb.from("mb_orders").update({ bill_code: bc }).eq("id", order.id);
    return json({ ok: true, url: `${TP}/${bc}` });
  } catch (e) {
    console.error(e); return json({ ok: false, message: "Ralat server." }, 500);
  }
});
