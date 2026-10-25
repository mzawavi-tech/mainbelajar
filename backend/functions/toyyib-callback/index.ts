import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const TP = Deno.env.get("TOYYIB_BASE") ?? "https://toyyibpay.com";
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function genCode() {
  const b = crypto.getRandomValues(new Uint8Array(8));
  const s = Array.from(b, (x) => ALPHA[x % ALPHA.length]).join("");
  return `MB-${s.slice(0, 4)}-${s.slice(4)}`;
}
const NAMA: Record<string,string> = { kira:"Jom Kira", sifir:"Jom Sifir", baca:"Jom Baca", lukis:"Lukis Ajaib", puzzle:"Puzzle Geng Comel", pecahan:"Jom Pecahan", duit:"Duit Pandai", bahasa:"Bahasa Hebat", sains:"Sains Seronok", words:"Word Power" };

Deno.serve(async (req) => {
  try {
    const fd = new URLSearchParams(await req.text());
    const billcode = fd.get("billcode"), status = fd.get("status");
    if (!billcode || status !== "1") return new Response("ignored");
    // sahkan terus dengan ToyyibPay (jangan percaya callback semata-mata)
    const vr = await fetch(`${TP}/index.php/api/getBillTransactions`, {
      method: "POST",
      body: new URLSearchParams({ billCode: billcode, billpaymentStatus: "1" }),
    });
    const tx = await vr.json();
    if (!Array.isArray(tx) || !tx.length) return new Response("not paid", { status: 400 });

    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: o } = await sb.from("mb_orders").select("*").eq("bill_code", billcode).single();
    if (!o) return new Response("no order", { status: 404 });
    if (o.status === "paid" && o.code) return new Response("ok"); // idempotent
    const code = genCode();
    await sb.from("mb_codes").insert({ code, product: o.product, order_id: o.id });
    await sb.from("mb_orders").update({ status: "paid", code, paid_at: new Date().toISOString() }).eq("id", o.id);

    const site = Deno.env.get("SITE_URL")!;
    const produk = o.product === "all" ? "Bundle 10 Game MainBelajar" : NAMA[o.product];
    const html = `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
<h2>Terima kasih, ${o.name}! 🎉</h2>
<p>Pembelian anda: <b>${produk}</b></p>
<p>Kod anda:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:2px;background:#fff7e0;padding:14px;text-align:center;border-radius:12px">${code}</p>
<p>Cara guna: buka <a href="${site}/">${site}/</a>, tekan level yang berkunci 🔒, dan masukkan kod di atas.</p>
<p>Kod boleh digunakan pada sehingga 3 peranti (contoh telefon ibu, bapa dan tablet anak). Sila jangan kongsi kod ini.</p>
<p>Ada masalah? Balas emel ini.</p></div>`;
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": Deno.env.get("BREVO_API_KEY")!, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { name: "MainBelajar", email: Deno.env.get("BREVO_SENDER")! },
        to: [{ email: o.email, name: o.name }],
        subject: `Kod MainBelajar anda: ${code}`,
        htmlContent: html,
      }),
    });
    return new Response("ok");
  } catch (e) { console.error(e); return new Response("error", { status: 500 }); }
});
