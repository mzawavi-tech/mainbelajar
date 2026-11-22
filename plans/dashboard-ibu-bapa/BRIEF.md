# BRIEF: dashboard-ibu-bapa

- **Dibuat oleh:** ChatGPT / Awie
- **Tarikh:** 2026-11-22
- **Fasa roadmap:** 1 / 2 / 3 (Projek 3 Bulan 3M — kerja teras)
- **Keutamaan:** tinggi

## 1. Matlamat (satu ayat)
Ibu bapa boleh melihat kalendar program 12 minggu, tugas harian M1/M2/M3, status dan skor anak serta laporan mingguan dan keputusan semakan minggu 4, 8 dan 12 dalam satu dashboard.

## 2. Kenapa
Projek 3 Bulan 3M menetapkan 60 tugas game berjadual dan memerlukan ibu bapa mengetahui aktiviti hari ini, kemajuan program dan bukti daripada semakan berkala. Tanpa dashboard, jadual 12 minggu sukar diikuti dan status penyelesaian tidak dapat dipantau dengan konsisten.

Dashboard ialah paparan rekod aktiviti, bukan alat untuk menjanjikan anak pasti mencapai kemahiran tertentu. Skor game hanya menunjukkan prestasi dalam tugasan yang dijawab.

## 3. Skop
**Termasuk:**
- Ruang Dashboard Ibu Bapa berasingan daripada skrin permainan kanak-kanak.
- Kalendar 12 minggu berdasarkan tarikh mula program yang ditetapkan penjaga.
- Paparan tugas hari ini dengan M1 Membaca, M2 Mengira atau M3 Menulis.
- Kad tugas memaparkan nama, arahan ringkas, dunia game, tempoh anggaran 10–15 minit, butang mula/sambung dan audio Bahasa Melayu.
- Status tugasan: Belum mula, Sedang dibuat, Selesai, Belum disegerakkan dan Tidak dijadualkan.
- Paparan skor tugas: bilangan betul/item dicuba dan bantuan yang digunakan; bukan label penguasaan.
- Laporan mingguan: tugasan dijadualkan, selesai, belum selesai, skor yang direkodkan dan pecahan M1/M2/M3.
- Keputusan semakan minggu 4, 8 dan 12 dengan skor, item dicuba, bantuan dan status semakan.
- Ringkasan kemajuan program dalam bentuk jumlah tugas siap daripada 60 dan kemajuan setiap M.
- Keadaan kosong, loading, ralat, tiada rangkaian dan cuba semula.
- Pengesahan penjaga dan akses data yang terhad kepada profil anak yang dipautkan.
- Paparan responsif untuk telefon, tablet dan desktop.

**Tidak termasuk (jangan buat):**
- Jangan ubah, mengganti, memadam atau memintas sistem unlock code, kod bundle, pengesahan kod, had peranti atau fungsi verify-code.
- Jangan ubah harga, produk, pautan pembayaran, ToyyibPay, callback pembayaran atau model pembelian sedia ada. Model harga Projek 3M belum diputuskan; jangan bina langganan atau pek berbayar sebelum keputusan Awie.
- Jangan anggap pelanggan telah melanggan atau mengaktifkan program hanya berdasarkan unlock code.
- Jangan tambah dunia, game, subjek atau kurikulum baharu di luar jadual yang diluluskan.
- Jangan tambah tutor/chat AI, cadangan automatik, papan kedudukan, perkongsian sosial atau iklan.
- Jangan hantar laporan WhatsApp/e-mel/push secara automatik dalam skop ini.
- Jangan simpan nama penuh, tarikh lahir penuh, lokasi, foto, rakaman suara atau data sensitif anak.
- Jangan dakwa, jamin atau sijilkan bahawa anak sudah mencapai tahap membaca, mengira atau menulis tertentu.
- Jangan paparkan TP rasmi KSPK atau KSSR berdasarkan skor game.
- Jangan bina fungsi analisis tulisan automatik melainkan ketepatannya diuji dan diluluskan; jangan reka skor tulisan.
- Jangan migrasi keseluruhan aplikasi, ubah sistem pembayaran, deploy produksi atau ubah branch main tanpa kelulusan Awie.

## 4. Keperluan terperinci
Senarai skrin / tingkah laku / peraturan. Tulis konkrit, bukan umum.

| # | Keperluan | Catatan |
|---|-----------|---------|
| 1 | Sediakan pintu masuk “Ruang Ibu Bapa” yang berasingan daripada butang Main untuk anak. | Parent gate mesti diputuskan Awie. Unlock code pembelian bukan kata laluan penjaga. |
| 2 | Paparkan tarikh mula dan tarikh tamat program 12 minggu. | Tarikh tamat dikira daripada tarikh mula mengikut peraturan kalendar yang diluluskan; paparkan zon waktu Asia/Kuala_Lumpur. |
| 3 | Paparkan kalendar 12 minggu dengan 60 slot tugas (5 hari setiap minggu). | Hari tidak berjadual ditandakan rehat; jangan paparkan sebagai tugasan tertunggak. |
| 4 | Setiap slot memaparkan minggu, hari, M1/M2/M3, tajuk tugas, dunia dan status. | Kandungan mesti datang daripada katalog jadual yang diluluskan; jangan cipta tugas secara rawak. |
| 5 | Paparkan tugas hari ini paling atas dengan butang mula atau sambung. | Jika tiada tugas pada hari semasa, paparkan “Tiada tugas dijadualkan hari ini”. |
| 6 | Setiap tugasan mempunyai tempoh anggaran 10–15 minit, arahan ringkas dan audio Bahasa Melayu. | Tempoh ialah anggaran, bukan had masa wajib. |
| 7 | Apabila anak mula tugas, status berubah kepada “Sedang dibuat”. | Rekod masa mula; refresh tidak memadam status. |
| 8 | Apabila syarat tamat tugasan dipenuhi, status berubah kepada “Selesai”. | Simpan masa selesai dan ID versi tugasan. Keluar dari game bukan syarat selesai. |
| 9 | Dashboard menunjukkan skor tugas sebagai bilangan betul/item dicuba serta bantuan yang digunakan. | Jangan menukar skor kepada label “pandai”, “lemah” atau TP rasmi. |
| 10 | Kalendar menunjukkan jumlah tugas siap daripada 60 dan peratus penyelesaian. | Pengiraan: tugas Selesai ÷ tugas yang telah sampai tarikh jadual; tugas masa depan tidak masuk denominator. |
| 11 | Laporan mingguan menyenaraikan lima tugasan, status, masa dan skor. | Cadangan minggu program Isnin–Jumaat; Awie perlu sahkan jika hari pilihan penjaga diperlukan. |
| 12 | Laporan mingguan memaparkan pecahan M1, M2 dan M3. | Tunjukkan jumlah dijadualkan, selesai dan belum selesai bagi setiap M. |
| 13 | Paparkan keputusan semakan pada minggu 4, 8 dan 12. | Setiap M mempunyai skor sendiri, item dicuba, bantuan dan status “Melepasi sasaran semakan / Perlu latihan semula / Belum cukup data”. |
| 14 | Paparkan perbandingan skor semakan 4→8→12 jika data tersedia. | Paparkan perubahan bilangan item betul sahaja; jangan simpulkan peningkatan kebolehan menyeluruh. |
| 15 | Jika semakan belum dijalankan, paparkan “Belum dibuat”. | Jangan tunjuk skor kosong sebagai 0. |
| 16 | Kalendar boleh dibuka ke minggu sebelumnya dan seterusnya dalam tempoh 12 minggu. | Minggu di luar program tidak boleh menghasilkan tugasan. |
| 17 | Jika rangkaian gagal, UI memaparkan “Belum disegerakkan” dan butang cuba lagi. | Jangan paparkan berjaya disimpan sebelum server mengesahkan rekod. |
| 18 | Semua data tugas, skor dan semakan dipautkan kepada pengenal profil minimum. | Akses melalui pengesahan penjaga dan RLS; pengguna tidak boleh membaca profil keluarga lain. |
| 19 | Paparkan keadaan kosong/loading/ralat untuk kalendar, laporan dan keputusan semakan. | Mesej ralat mesti menyediakan tindakan cuba lagi. |
| 20 | Dashboard menggunakan data daripada sumber aktiviti yang sama dengan laporan mingguan. | Elakkan kiraan berbeza antara kad ringkasan, kalendar dan laporan. |
| 21 | Dashboard tidak mengaktifkan jadual berbayar secara automatik. | Kelayakan program menunggu keputusan model harga Awie; jangan kaitkan secara andaian dengan unlock code sedia ada. |
| 22 | Dashboard tidak mengubah sistem unlock code atau model harga sedia ada. | Jadual mb_orders/mb_codes dan fungsi pembayaran/pengesahan kekal tidak disentuh. |

## 5. Kandungan & suara
- Bahasa: Bahasa Melayu mudah untuk kanak-kanak
- Teks skrin / skrip suara:
  - Pintu masuk: “Ruang Ibu Bapa”
  - Tajuk: “Program 3 Bulan 3M”
  - Kalendar: “Perjalanan 12 Minggu”
  - Tugas: “Tugas Hari Ini”, “Jom mula!”, “Sambung tugas”
  - Status: “Belum mula”, “Sedang dibuat”, “Selesai”
  - Skor: “Jawapan betul”, “Item dicuba”, “Bantuan digunakan”
  - Laporan: “Laporan Mingguan”
  - Semakan: “Semakan Minggu 4”, “Semakan Minggu 8”, “Semakan Minggu 12”
  - Keadaan kosong: “Belum ada aktiviti direkodkan. Pilih tugas hari ini untuk bermula.”
  - Ralat: “Rekod belum dapat disegerakkan. Cuba lagi.”
  - Peringatan: “Skor ini menunjukkan jawapan dalam aktiviti game, bukan penilaian rasmi sekolah.”
  - Suara kanak-kanak: “Hai kawan! Hari ini kita ada satu misi. Dengar arahan Awang dan Melur. Jom cuba!”
- Aset diperlukan (gambar, bunyi, animasi):
  - Watak Awang & Melur sedia ada sebagai pemandu program.
  - Ikon M1 buku, M2 nombor/bilangan dan M3 pensel.
  - Ikon empat dunia dan kad kalendar 12 minggu.
  - Audio arahan dan pujian neutral Bahasa Melayu.
  - Animasi kemajuan ringkas; tiada tekanan streak atau hukuman jika tertinggal tugas.

## 6. Sempadan teknikal
- Stack: React, Phaser 3, MiraAI Node backend, Supabase
- Fail / modul yang mungkin terjejas:
  - Dashboard React: kalendar program, tugas hari ini, laporan mingguan, keputusan semakan.
  - Phaser 3: event task-start, task-progress, task-complete, item-answer dan assessment-complete.
  - Katalog kurikulum: 12 minggu, 60 tugasan, M, dunia, tempoh, arahan, audio, syarat tamat dan versi.
  - Supabase: profil minimum, program enrollment/status, tugasan berjadual, event aktiviti, skor item dan semakan.
  - Jadual cadangan berasingan: child_profiles, program_enrolments, curriculum_tasks, scheduled_tasks, task_attempts, task_item_results, assessment_sessions.
  - RLS dan parent gate bagi memastikan penjaga hanya membaca profil yang dibenarkan.
  - Zon waktu program: Asia/Kuala_Lumpur.
  - Ujian: tarikh mula/tamat, 60 tugasan, rehat, perubahan status, skor, semakan dan kawalan akses.
  - Repo branch roadmap yang diperiksa masih menunjukkan HTML/JavaScript dan Supabase Edge Functions; struktur React/Phaser belum dikenal pasti di branch itu. Audit branch sasaran sebelum coding.
- Jangan ubah: sistem unlock code, pembelian sekali bayar, data pengguna sedia ada
  - Jangan ubah jadual mb_orders/mb_codes, create-bill, toyyib-callback, verify-code, MB_CODES, mbCode(), mbHas() atau paywall.
  - Jangan buat migrasi destruktif atau menukar kod/ID produk.
  - Jangan simpan service-role key dalam client bundle.
  - Jangan simpan nama penuh atau data peribadi anak; guna UUID/pengenal minimum.
  - Rekod jawapan item hanya setakat yang perlu untuk laporan kemajuan; jangan simpan rakaman suara atau input bebas.

## 7. Kriteria siap (mesti boleh disemak)
- [ ] Dashboard boleh dibuka melalui pintu masuk Ibu Bapa dan ditutup tanpa mengganggu aliran permainan anak.
- [ ] Pengguna tanpa pengesahan penjaga tidak boleh membaca data dashboard.
- [ ] Ujian RLS membuktikan penjaga A tidak boleh membaca profil atau rekod penjaga B.
- [ ] Kalendar memaparkan tepat 12 minggu dan 60 slot tugas berdasarkan tarikh mula ujian.
- [ ] Lima hari tugasan setiap minggu dipaparkan dan hari rehat tidak dikira sebagai tugasan tertunggak.
- [ ] Kad tugas hari ini memaparkan M, tajuk, dunia, tempoh dan arahan yang sepadan dengan katalog.
- [ ] Status tugas berubah Belum mula → Sedang dibuat → Selesai mengikut event permainan yang sah.
- [ ] Refresh halaman tidak menukar tugas Sedang dibuat kembali kepada Belum mula.
- [ ] Dashboard menunjukkan skor bilangan betul/item dicuba dan bilangan bantuan bagi tugasan yang mempunyai data.
- [ ] Peratus kemajuan dikira menggunakan tugas yang telah sampai tarikh jadual sahaja.
- [ ] Laporan mingguan menunjukkan lima tugasan, status dan skor yang sama dengan rekod aktiviti.
- [ ] Pecahan laporan M1, M2 dan M3 memaparkan bilangan dijadualkan, selesai dan belum selesai.
- [ ] Keputusan semakan minggu 4, 8 dan 12 dipaparkan berasingan untuk M1/M2/M3.
- [ ] Skor 8/10 tanpa petunjuk menunjukkan “Melepasi sasaran semakan”; 0–7/10 dengan sekurang-kurangnya 8 item dicuba menunjukkan “Perlu latihan semula”.
- [ ] Kurang daripada 8 item dicuba menunjukkan “Belum cukup data”, bukan gagal.
- [ ] Semakan tulisan yang tidak boleh dinilai automatik memaparkan “Semakan penjaga”.
- [ ] Tarikh dan pertukaran hari menggunakan Asia/Kuala_Lumpur.
- [ ] Kegagalan rangkaian tidak memaparkan status berjaya disimpan; cubaan semula tidak menghasilkan rekod pendua.
- [ ] UI tidak memaparkan dakwaan jaminan hasil, TP rasmi KPM atau diagnosis.
- [ ] Tiada data peribadi berlebihan atau service-role key dalam client bundle.
- [ ] Ujian mengesahkan unlock code, pembelian sekali bayar, mb_orders, mb_codes dan fungsi pembayaran tidak berubah.
- [ ] Tiada langganan/pek berbayar diwujudkan sebelum model harga diluluskan Awie.
- [ ] Semua ujian dashboard → tugas → skor → laporan → semakan lulus.
- [ ] Hasil kerja diserahkan dalam branch feat/projek-3m dengan HASIL.md.
- [ ] Tiada merge ke main atau deploy produksi sebelum kelulusan Awie.

## 8. Risiko & soalan terbuka
- Privasi anak / data kanak-kanak:
  - Simpan pengenal profil rawak, julat umur/tahap sahaja jika perlu, tarikh program dan rekod tugas minimum.
  - Parent gate dan RLS wajib sebelum data sebenar boleh dilihat.
  - Tetapkan tempoh simpanan, pemadaman dan kaedah eksport/pemadaman oleh penjaga sebelum produksi.
  - Jangan gunakan data untuk iklan, profil komersial atau latihan model AI.
  - Jangan simpan foto tulisan melainkan ada keperluan yang diluluskan, persetujuan penjaga dan kawalan akses yang sesuai.
- Perkara yang Awie perlu putuskan:
  1. Model harga: kekal beli sekali bayar, pek 3 bulan bayar sekali, atau langganan bulanan? Tiada perubahan dibuat sehingga keputusan.
  2. Adakah 12 minggu bermula pada tarikh pembelian, tarikh aktivasi, atau tarikh mula yang dipilih ibu bapa?
  3. Adakah program berjalan 5 hari tetap Isnin–Jumaat atau 5 hari pilihan penjaga?
  4. Parent gate: PIN penjaga atau akaun login? Adakah sistem akaun sudah tersedia?
  5. Satu profil anak atau beberapa profil bagi satu keluarga?
  6. Adakah laporan hanya dalam dashboard atau turut dihantar melalui WhatsApp? WhatsApp tidak termasuk dalam skop ini.
  7. Adakah umur 7 perlu disasarkan melalui DSKP KSSR Tahun 1 secara rasmi?
  8. Siapa yang meluluskan rubrik tulisan dan toleransi ketepatan jejak?
  9. Adakah skor tulisan perlu disahkan penjaga atau mahu bina pengesanan stroke automatik?
  10. Adakah aktiviti mesti disegerakkan merentas peranti sejak MVP?
  11. Adakah 10 item setiap M untuk semakan 4/8/12 dipersetujui?
  12. Berapa lama rekod anak disimpan dan bagaimana permintaan pemadaman dibuat?

## 9. Video / storyboard (jika ada)
Pautan ke STORYBOARD.md: ya — plans/projek-3m/STORYBOARD.md
