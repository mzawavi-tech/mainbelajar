# BRIEF: dashboard-ibu-bapa

- **Dibuat oleh:** ChatGPT / Awie
- **Tarikh:** 2026-11-22
- **Fasa roadmap:** 1 (rujuk docs/ROADMAP-NAIK-TARAF.md)
- **Keutamaan:** tinggi

## 1. Matlamat (satu ayat)
Ibu bapa boleh melihat ringkasan aktiviti anak, bintang yang dikumpul dan laporan mingguan, manakala anak boleh menyelesaikan misi harian dalam empat dunia MainBelajar tanpa mengubah cara game dibuka atau dibeli.

## 2. Kenapa
Roadmap Fasa 1 mengenal pasti dashboard/laporan ibu bapa serta misi harian dan bintang sebagai jurang utama berbanding produk rujukan. Score Card yang dirancang juga perlu disokong oleh rekod aktiviti yang konsisten.

MainBelajar mengekalkan pembeza sedia ada: sasaran umur 4–7 tahun, arahan dan suara Bahasa Melayu yang mudah, watak Awang & Melur serta empat dunia Malaysia (Dusun Buah-buahan, Taman Haiwan, Taman Permainan dan Kampung). Dashboard hendaklah menerangkan aktiviti yang benar-benar direkodkan sahaja; ia bukan penilaian kebolehan atau bukti peningkatan pembelajaran.

**Pemerhatian repositori semasa:** pada branch docs/roadmap-naik-taraf, struktur yang dapat diperiksa masih mengandungi halaman HTML/JavaScript, fungsi Supabase Edge (create-bill, toyyib-callback, verify-code) dan jadual mb_orders/mb_codes. Struktur React + Phaser 3 belum kelihatan dalam branch tersebut. Pelaksanaan perlu mengesahkan branch kerja dan seni bina sebenar dahulu; jangan membuat migrasi besar atau mengubah aliran pembelian sebagai sebahagian daripada brief ini.

## 3. Skop
**Termasuk:**
- Satu ruang Dashboard Ibu Bapa yang berasingan daripada paparan permainan kanak-kanak.
- Ringkasan aktiviti untuk satu profil anak yang dipilih: jumlah misi selesai, jumlah bintang diperoleh dan tarikh aktiviti terakhir dalam tempoh laporan.
- Paparan aktiviti mengikut empat dunia: Dusun Buah-buahan, Taman Haiwan, Taman Permainan dan Kampung.
- Laporan mingguan berasaskan rekod aktiviti dalam minggu Isnin hingga Ahad, mengikut zon waktu Malaysia (Asia/Kuala_Lumpur).
- Misi harian dengan set tugasan yang ditetapkan terlebih dahulu, arahan ringkas, ikon/ilustrasi dan suara Bahasa Melayu.
- Status misi: Belum mula, Sedang dibuat dan Selesai.
- Ganjaran bintang yang jelas peraturannya dan Score Card ringkas selepas misi selesai.
- Rekod aktiviti minimum yang diperlukan untuk memaparkan dashboard dan laporan.
- Keadaan kosong, loading, ralat rangkaian dan cubaan semula yang mempunyai mesej jelas.
- Reka bentuk responsif untuk telefon dan tablet; paparan desktop boleh menggunakan lebar kandungan yang lebih besar.

**Tidak termasuk (jangan buat):**
- Jangan ubah, mengganti, memadam atau memintas sistem unlock code, kod bundle, pengesahan kod, had peranti atau fungsi verify-code.
- Jangan ubah harga, produk, pautan pembayaran, ToyyibPay, callback pembayaran, atau model pembelian sekali bayar. Tiada langganan, auto-renew atau pembelian dalam dashboard.
- Jangan tambah dunia, game, subjek, tahap umur atau kandungan kurikulum baharu.
- Jangan tambah chat AI, tutor AI, cadangan pembelajaran automatik atau personalisasi AI.
- Jangan tambah had masa skrin, kawalan ibu bapa peringkat peranti, notifikasi push, e-mel automatik atau sistem ganjaran wang/hadiah fizikal.
- Jangan bina papan kedudukan, perbandingan antara adik-beradik, perkongsian awam, sosial atau iklan.
- Jangan dakwa anak sudah menguasai sesuatu kemahiran, meningkat kepandaian atau mencapai hasil pembelajaran yang belum diukur dan disahkan.
- Jangan kumpul nama penuh, nombor telefon, alamat, tarikh lahir penuh, lokasi, rakaman suara, foto atau data sensitif anak untuk fungsi ini.
- Jangan bina semula keseluruhan game, migrasi keseluruhan laman ke stack baharu, atau ubah reka bentuk semua dunia.
- Jangan deploy ke produksi atau ubah main tanpa kelulusan Awie.

## 4. Keperluan terperinci
Senarai skrin / tingkah laku / peraturan. Tulis konkrit, bukan umum.

| # | Keperluan | Catatan |
|---|-----------|---------|
| 1 | Sediakan pintu masuk Ibu Bapa yang berasingan dan tidak mengganggu butang Main/Jom Main untuk kanak-kanak. | Kaedah pengesahan/parent gate mesti diputuskan Awie sebelum akses data sebenar dibuka. Jangan anggap unlock code pembelian sebagai kata laluan ibu bapa. |
| 2 | Dashboard hanya memaparkan profil anak yang dipilih secara jelas. | MVP boleh bermula dengan satu profil; jangan paparkan data anak lain secara lalai. |
| 3 | Paparkan kad ringkasan: misi selesai dalam minggu semasa, jumlah bintang minggu semasa dan tarikh aktiviti terakhir. | Nilai mesti dikira daripada rekod sebenar; jika tiada data, paparkan 0 atau “Belum ada aktiviti”. |
| 4 | Paparkan ringkasan empat dunia dengan bilangan misi selesai bagi setiap dunia. | Dunia: Dusun Buah-buahan, Taman Haiwan, Taman Permainan dan Kampung. Dunia tanpa aktiviti mesti kekal kelihatan dengan nilai 0. |
| 5 | Sediakan pemilih minggu atau navigasi minggu sebelumnya/berikutnya. | Minggu bermula Isnin dan berakhir Ahad; label tarikh mesti menggunakan Asia/Kuala_Lumpur. Minggu akan datang tidak boleh menunjukkan aktiviti palsu. |
| 6 | Sediakan laporan mingguan yang menyenaraikan tarikh, nama misi, dunia, status dan bintang yang diperoleh. | Paparkan hanya medan yang direkodkan. Jangan simpulkan penguasaan atau kelemahan anak daripada data ini. |
| 7 | Sediakan satu senarai misi harian yang mengandungi 3 misi untuk MVP. | Misi dipilih daripada kandungan sedia ada/yang diluluskan Awie. Bilangan 3 ialah cadangan skop MVP dan perlu disahkan dalam soalan terbuka. |
| 8 | Setiap kad misi memaparkan nama, dunia, arahan satu ayat, ikon/ilustrasi dan butang mula/sambung. | Kanak-kanak belum semestinya boleh membaca; sediakan audio Bahasa Melayu untuk arahan utama. |
| 9 | Misi harian menggunakan tarikh tempatan Malaysia sebagai kunci hari. | Pertukaran hari berlaku pada 00:00 Asia/Kuala_Lumpur. Jangan gunakan masa UTC mentah untuk menentukan hari paparan. |
| 10 | Apabila anak memulakan misi, status bertukar kepada “Sedang dibuat”. | Jika permainan ditutup sebelum selesai, status kekal dan anak boleh sambung; jangan beri bintang selesai. |
| 11 | Apabila syarat tamat misi dipenuhi, status bertukar kepada “Selesai” dan rekod masa selesai disimpan. | Syarat tamat mesti ditentukan bagi setiap misi; keluar dari skrin bukan bukti misi selesai. |
| 12 | Beri bintang hanya sekali bagi satu misi pada satu tarikh. | Bilangan bintang per misi perlu ditetapkan dalam kandungan misi. Ulangan misi tidak menambah bintang tambahan untuk rekod hari yang sama. |
| 13 | Selepas selesai, paparkan Score Card dengan nama misi, dunia, status selesai dan bintang yang diperoleh. | Gunakan pujian neutral seperti “Bagus, misi selesai!” Elakkan label “pandai”, gred atau dakwaan penguasaan. |
| 14 | Rekod minimum bagi satu aktiviti ialah ID profil/pengenal tanpa nama, tarikh tempatan, ID misi, ID dunia, status, masa mula, masa selesai (jika ada) dan bintang. | Jangan simpan jawapan bebas atau rakaman suara. ID dan pemisahan data perlu dikawal oleh mekanisme akses yang diluluskan. |
| 15 | Data dashboard dan laporan mesti datang daripada sumber rekod yang sama. | Elakkan angka dashboard dikira daripada localStorage sementara jika laporan menggunakan Supabase. Tentukan tingkah laku offline/sync sebelum implementasi. |
| 16 | Jika rangkaian gagal, permainan tidak boleh memaparkan mesej “berjaya disimpan” sebelum server mengesahkan simpanan. | Paparkan status “Belum disegerakkan” jika sokongan simpanan sementara dilaksanakan; sediakan cubaan semula. |
| 17 | Dashboard mempunyai keadaan kosong, loading dan ralat. | Keadaan kosong menerangkan bahawa aktiviti akan muncul selepas anak bermain; ralat menyediakan butang cuba lagi. |
| 18 | Semua teks UI ibu bapa menggunakan Bahasa Melayu mudah dan semua arahan kanak-kanak mempunyai audio Bahasa Melayu. | Suara sedia ada boleh digunakan jika sesuai; jangan menukar tetapan suara global game tanpa sebab. |
| 19 | Fungsi ini tidak mengubah jadual atau rekod pembelian sedia ada. | mb_orders dan mb_codes serta fungsi berkaitan pembayaran/unlock kekal di luar skop migrasi. |
| 20 | Gunakan komponen/struktur projek sebenar selepas audit branch kerja. | Sasaran produk yang diberi ialah React + Phaser 3 + Supabase. Jika branch kerja masih HTML/JS + Supabase Edge Functions, laporkan perbezaan dan minta keputusan sebelum migrasi atau tambah backend baharu. |

## 5. Kandungan & suara
- Bahasa: Bahasa Melayu mudah untuk kanak-kanak
- Teks skrin / skrip suara:
  - Pintu masuk ibu bapa: “Ruang Ibu Bapa”
  - Tajuk dashboard: “Aktiviti Anak”
  - Ringkasan: “Misi selesai”, “Bintang dikumpul”, “Aktiviti terakhir”
  - Misi harian: “Misi Hari Ini”, “Jom mula!”, “Sambung misi”
  - Status: “Belum mula”, “Sedang dibuat”, “Selesai”
  - Score Card: “Syabas! Misi selesai.” / “Awang dan Melur ucap tahniah!”
  - Keadaan kosong: “Belum ada aktiviti minggu ini. Jom pilih satu misi!”
  - Ralat: “Aktiviti belum dapat disegerakkan. Cuba lagi.”
  - Arahan suara contoh: “Hai kawan! Hari ini kita ada misi di Dusun Buah-buahan. Jom mula!”
- Aset diperlukan (gambar, bunyi, animasi):
  - Aset watak Awang dan Melur sedia ada; gunakan sebagai pemandu/penyambut, bukan sebagai bukti pencapaian.
  - Ikon empat dunia dan ikon bintang yang konsisten.
  - Audio Bahasa Melayu bagi tajuk/arahan misi dan mesej kejayaan; skrip akhir perlu diluluskan Awie sebelum rakaman/janaan.
  - Animasi ringkas bintang/selesai boleh digunakan; elakkan animasi yang mengganggu atau memaksa anak terus bermain.

## 6. Sempadan teknikal
- Stack: React, Phaser 3, MiraAI Node backend, Supabase
- Fail / modul yang mungkin terjejas:
  - Dashboard/ruang ibu bapa React (laluan dan nama komponen ditentukan selepas audit struktur branch).
  - Integrasi React ↔ Phaser untuk menghantar event misi mula/selesai dan bintang.
  - Modul konfigurasi kandungan misi harian (ID, nama, dunia, arahan, audio, syarat selesai, ganjaran bintang).
  - Lapisan servis Supabase untuk membaca dan menyimpan profil serta rekod aktiviti.
  - Skema baharu yang dicadangkan secara berasingan daripada jadual transaksi: child_profiles (pengenal profil minimum), mission_catalog (katalog misi), mission_daily_assignments (misi yang dipaparkan pada tarikh tertentu) dan mission_activity_events (rekod mula/selesai/bintang). Nama/jadual sebenar tertakluk kepada reka bentuk DB dan semakan akses.
  - Polisi RLS dan kaedah pengesahan penjaga untuk memastikan ibu bapa hanya boleh membaca profil anak yang dibenarkan.
  - Ujian unit/integrasi untuk pengiraan minggu, pertukaran hari Malaysia, ganjaran sekali sahaja dan akses data.
  - Nota repositori semasa: branch roadmap yang diperiksa mempunyai HTML/JavaScript dan Supabase Edge Functions; tiada struktur React/Phaser yang dapat dikenal pasti. Audit branch feat/dashboard-ibu-bapa sebelum menentukan fail sebenar atau melaksanakan migrasi.
- Jangan ubah: sistem unlock code, pembelian sekali bayar, data pengguna sedia ada
  - Secara khusus, jangan ubah mb_orders, mb_codes, create-bill, toyyib-callback, verify-code, MB_CODES, mbCode(), mbHas() atau aliran paywall/pembayaran sedia ada.
  - Jangan jalankan migrasi destruktif atau menukar ID game/kod produk sedia ada.
  - Jangan letak service-role key di client. Semua akses data anak mesti melalui mekanisme server/RLS yang diluluskan.

## 7. Kriteria siap (mesti boleh disemak)
- [ ] Pintu masuk Ibu Bapa boleh dibuka dan ditutup tanpa mengganggu aliran kanak-kanak untuk memulakan game.
- [ ] Pengguna yang belum melepasi parent gate tidak boleh membaca dashboard atau data profil anak.
- [ ] Pengguna penjaga yang sah hanya boleh membaca data profil anak yang dipautkan kepadanya; ujian akses silang profil gagal seperti yang dijangka.
- [ ] Dashboard memaparkan jumlah misi selesai, jumlah bintang dan aktiviti terakhir berdasarkan data ujian yang telah dimasukkan.
- [ ] Dashboard memaparkan keempat-empat dunia, termasuk dunia yang mempunyai sifar aktiviti.
- [ ] Laporan mingguan memaparkan Isnin–Ahad berdasarkan Asia/Kuala_Lumpur dan data minggu sebelumnya boleh dibuka.
- [ ] Misi harian memaparkan tepat bilangan misi yang dipersetujui Awie dan setiap misi mempunyai ID, dunia, arahan, audio serta syarat selesai.
- [ ] Tarikh misi bertukar pada 00:00 Asia/Kuala_Lumpur, termasuk ujian di sekitar 23:59 dan 00:01.
- [ ] Misi yang dimulakan tetapi tidak diselesaikan kekal berstatus “Sedang dibuat” selepas halaman/game dimuat semula.
- [ ] Misi yang selesai menghasilkan satu rekod selesai dan ganjaran bintang yang betul.
- [ ] Menekan ulang/refresh atau menyelesaikan semula misi yang sama pada hari sama tidak menambah ganjaran bintang kali kedua.
- [ ] Score Card memaparkan nama misi, dunia, status selesai dan jumlah bintang yang direkodkan.
- [ ] Dashboard dan laporan menunjukkan angka yang sama untuk dataset ujian yang sama.
- [ ] Apabila tiada aktiviti, dashboard dan laporan memaparkan keadaan kosong/0 tanpa ralat.
- [ ] Apabila rangkaian gagal, UI tidak mendakwa data telah disimpan; selepas rangkaian pulih, cubaan semula menghasilkan rekod yang konsisten tanpa pendua.
- [ ] Semua arahan misi utama boleh dimainkan dalam Bahasa Melayu dan kawalan suara boleh digunakan tanpa audio bertindih.
- [ ] Ujian mengesahkan tiada perubahan kepada unlock code, pembelian sekali bayar, jadual mb_orders/mb_codes atau fungsi pembayaran/pengesahan kod.
- [ ] Tiada service-role key atau maklumat rahsia Supabase dimasukkan ke dalam bundle client.
- [ ] Semua ujian yang ditambah lulus dan tiada ralat console kritikal dalam aliran dashboard → mula misi → selesai misi → laporan.
- [ ] Hasil kerja diserahkan dalam branch feat/dashboard-ibu-bapa, dengan ringkasan plans/dashboard-ibu-bapa/HASIL.md menyatakan apa siap, apa belum dan keputusan yang masih diperlukan.
- [ ] Tiada perubahan/deploy ke main atau produksi sebelum kelulusan Awie (Gate 1).

## 8. Risiko & soalan terbuka
- Privasi anak / data kanak-kanak:
  - Gunakan pengenal profil minimum; jangan minta nama penuh atau data peribadi yang tidak diperlukan.
  - Dashboard perlu dilindungi parent gate dan kawalan akses server/RLS; menyembunyikan pautan sahaja bukan kawalan keselamatan.
  - Tetapkan pemilikan profil, pemisahan data antara keluarga, tempoh simpanan/pemadaman dan prosedur jika penjaga hilang akses sebelum produksi.
  - Jangan gunakan data aktiviti untuk iklan, profil komersial atau latihan model AI.
  - Data analitik hendaklah terhad kepada aktiviti permainan yang diperlukan untuk fungsi dashboard.
- Perkara yang Awie perlu putuskan:
  1. Parent gate: PIN penjaga, kata laluan/akaun, atau kaedah lain? Adakah pengesahan penjaga sedia ada sudah tersedia?
  2. Adakah MVP menyokong satu profil anak sahaja atau beberapa profil di bawah satu pembelian/keluarga?
  3. Adakah dashboard boleh dibuka pada peranti lain (perlu sync akaun), atau hanya pada peranti yang sama?
  4. Berapa misi sehari: cadangan 3 misi atau bilangan lain?
  5. Bagaimana misi dipilih: giliran tetap merentas empat dunia, atau pilihan bebas daripada katalog yang diluluskan?
  6. Berapa bintang bagi setiap misi dan adakah semua misi mempunyai ganjaran yang sama?
  7. Adakah misi yang belum selesai boleh disambung pada hari berikutnya, atau ia tamat dan diganti apabila hari bertukar?
  8. Untuk laporan mingguan, adakah paparan aktiviti sahaja mencukupi atau Awie mahu eksport PDF? (Eksport tidak termasuk dalam skop awal.)
  9. Adakah data aktiviti mesti disegerakkan ke Supabase sejak MVP, atau boleh bermula pada satu peranti dengan sync sebagai kerja berasingan?
  10. Repositori pada branch roadmap yang diperiksa masih kelihatan seperti HTML/JavaScript + Supabase Edge Functions, sedangkan spesifikasi produk menyebut React + Phaser 3 + Supabase. Adakah kerja ini perlu ikut struktur semasa dahulu atau migrasi React/Phaser memang sudah dibuat pada branch lain?
  11. Adakah Awie mahu audio arahan baharu dirakam/dijana untuk setiap misi, atau guna suara/sistem audio sedia ada jika boleh?
  12. Berapa lama rekod aktiviti disimpan dan bagaimana penjaga meminta profil/data dipadam?

## 9. Video / storyboard (jika ada)
Pautan ke STORYBOARD.md: tidak (video demo tidak diperlukan untuk brief pembangunan dalaman ini; demo boleh dibuat selepas UI berfungsi dan Gate 1 hampir dinilai).
