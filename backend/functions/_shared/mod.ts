export const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, authorization, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
export const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
export const GAMES = ["kira","sifir","baca","lukis","puzzle","pecahan","duit","bahasa","sains","words"];
export const PRICE_ALL = 4900, PRICE_ONE = 1200; // sen
