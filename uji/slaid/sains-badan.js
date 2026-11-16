// ===== Data slaid: Sains Seronok - Badan Manusia =====
// Untuk game baru: salin fail ini, tukar nilai di bawah sahaja. Templat (kad-watak.js) tak perlu disentuh.
//   tanya   = ayat yang ditanya oleh penanya (Melur)
//   pilihan = pilihan jawapan (disusun rawak secara automatik)
//   betul   = kedudukan jawapan betul dalam senarai pilihan (0 = yang pertama)
//   terang  = ayat penerangan oleh penjawab (Awang) selepas pujian
//   gambar  = emoji atau gambar kecil (pilihan)
//   gaya    = pose watak untuk slaid itu (pilihan), contoh {"melur": "lambai", "awang": "duduk"}
window.MB_SLAID = {
  "tajuk": "Sains Seronok",
  "sub": "Badan Manusia",
  "emoji": "🔬",
  "latar": "#e7f5ff",
  "penanya": "melur",
  "penjawab": "awang",
  "salam": "Hai kawan! Saya Melur. Jom belajar tentang badan kita!",
  "pujian": ["Betul! Tahniah!", "Betul! Pandai!", "Yeay, betul! Hebat!", "Betul! Terbaik!"],
  "galakan": ["Cuba lagi ya!", "Hampir betul! Cuba lagi.", "Tak apa, cuba lagi!"],
  "slaid": [
    {"tanya": "Organ apa yang mengepam darah ke seluruh badan?", "pilihan": ["Jantung", "Paru-paru", "Perut"], "betul": 0, "terang": "Jantung mengepam darah.", "gambar": "🫀"},
    {"tanya": "Organ apa yang kita guna untuk bernafas?", "gaya": {"melur": "lambai", "awang": "duduk"}, "pilihan": ["Paru-paru", "Jantung", "Buah pinggang"], "betul": 0, "terang": "Paru-paru membantu kita bernafas.", "gambar": "🫁"},
    {"tanya": "Organ apa yang mencerna makanan?", "pilihan": ["Perut", "Otak", "Jantung"], "betul": 0, "terang": "Perut mencerna makanan.", "gambar": "🍚"},
    {"tanya": "Organ apa yang mengawal fikiran dan pergerakan badan?", "pilihan": ["Otak", "Jantung", "Hati"], "betul": 0, "terang": "Otak mengawal badan kita.", "gambar": "🧠"},
    {"tanya": "Deria apa yang digunakan oleh lidah?", "pilihan": ["Rasa", "Bau", "Dengar"], "betul": 0, "terang": "Lidah ialah deria rasa.", "gambar": "👅"},
    {"tanya": "Apakah fungsi gigi kacip?", "pilihan": ["Memotong makanan", "Mengisar makanan", "Mengoyak daging"], "betul": 0, "terang": "Gigi kacip memotong makanan.", "gambar": "🦷"}
  ]
};
