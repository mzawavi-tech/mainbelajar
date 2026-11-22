# plans/ — Serahan kerja ChatGPT → Claude

Folder ini ialah "peti surat" antara ChatGPT (perancang, storyboard) dan Claude (coding game, video).

## Aliran
1. **ChatGPT** tulis brief ke `plans/<nama-kerja>/BRIEF.md` (guna `plans/_template/BRIEF.md`).
2. Storyboard video letak di `plans/<nama-kerja>/STORYBOARD.md` (guna `plans/_template/STORYBOARD.md`).
3. **Claude** baca brief, bina di **branch** `feat/<nama-kerja>`, bukan `main`.
4. Awie semak pratonton, lulus, baru merge. Tiada deploy produksi tanpa kelulusan Awie.

## Peraturan
- Satu kerja = satu folder = satu branch.
- Jangan sentuh `main` terus. `main` ialah laman live (GitHub Pages).
- Brief mesti ada **Kriteria siap** yang boleh disemak. Brief tanpa kriteria siap akan dipulangkan.
- Claude tulis hasil ringkas di `plans/<nama-kerja>/HASIL.md` (apa siap, apa belum, apa perlu Awie putuskan).
- Video: fail akhir simpan di `plans/video/<nama-kerja>/`. Penjanaan video (Flow/Veo) dibuat dari Claude di laptop Awie.

## Penamaan
`<nama-kerja>` huruf kecil, sengkang. Contoh: `dashboard-ibu-bapa`, `misi-harian`, `demo-dusun`.

## Rujukan
Roadmap penuh: `docs/ROADMAP-NAIK-TARAF.md`.
