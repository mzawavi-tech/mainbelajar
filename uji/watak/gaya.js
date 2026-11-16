// ===== Daftar gaya (pose) watak =====
// Setiap gaya = satu gambar badan (latar lutsinar) + satu jalur 4 gambar mulut + kedudukan mulut dalam peratus.
// "asas" ialah gaya sedia ada. Gaya baru (duduk, lambai, lompat, lari, cium-jauh, tepuk, bagus) ditambah di sini
// selepas gambarnya siap diproses. Slaid yang minta gaya yang belum ada akan guna "asas".
window.MB_GAYA = {
  "melur": {
    "asas": {"img": "watak/melur.webp", "mul": "watak/melur-mulut.webp", "l": 43.165, "t": 19.739, "w": 15.005, "h": 6.878}
  },
  "awang": {
    "asas": {"img": "watak/awang.webp", "mul": "watak/awang-mulut.webp", "l": 52.086, "t": 27.796, "w": 16.043, "h": 6.564}
  }
};
