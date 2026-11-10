# EEC Librexion — Website Materi English

Website statis (HTML/CSS/JavaScript) yang siap dideploy ke Vercel. **Tidak perlu database, login, atau instal package** untuk menjalankan website.

## Isi website
- Landing page EEC Librexion dan petunjuk memakai materi.
- 9 mini lessons dari *Practical English Survival Guide* (berdasarkan booklet yang didiskusikan).
- Pencarian materi, halaman lesson lengkap, dan quiz interaktif.
- Tombol **Mark as completed** (progress tersimpan hanya di perangkat/browser masing-masing).
- Tombol **Share / QR**: otomatis membuat QR dari URL website saat sudah di-hosting di domain publik, dan memungkinkan download PNG.

## Cara lihat dahulu di komputer

Buka folder ini melalui terminal:

```bash
python -m http.server 8000
```

Lalu buka http://localhost:8000/ di browser. (Di preview lokal, QR publik belum tersedia; QR akan otomatis muncul setelah website dideploy.)

## Upload ke Vercel

### Cara 1 — GitHub + Vercel (lebih mudah untuk update berkala)
1. Buat repository baru di GitHub dan upload seluruh isi folder ini ke dalam root repository.
2. Login ke https://vercel.com/ dan pilih **Add New → Project**.
3. Import repository GitHub tadi.
4. Gunakan preset **Other** dan pastikan **Root Directory** adalah folder berisi `index.html`.
5. Klik **Deploy**. Setelah berhasil, salin URL `https://...vercel.app` milik websitemu.

### Cara 2 — Vercel CLI (tanpa GitHub)

Dengan Node.js terpasang, jalankan dari folder proyek:

```bash
npx vercel --prod
```

Ikuti langkah login & konfirmasi di terminal. Perintah ini memerlukan koneksi internet dan akun Vercel.

## Cara membuat QR untuk dibagikan ke peserta
1. Setelah website online, buka URL publik websitemu.
2. Klik **Share / QR** di kanan atas.
3. Klik **Download QR** untuk mendapatkan PNG.
4. Masukkan PNG itu ke poster, flyer, booklet, atau slide; orang lain tinggal scan.

**Penting:** QR yang dipakai untuk poster harus QR dari URL publik Vercel, BUKAN localhost atau alamat file di komputer.

## Cara menambah materi berikutnya

Buka `content.js`. Tambahkan objek lesson ke array `window.EEC_LESSONS` dengan field `id`, `number`, `title`, `subtitle`, `category`, `level`, `minutes`, `intro`, `secondIntro`, `groups`, `dialogue`, `tip` sesuai contoh lesson yang sudah ada. Website akan otomatis memunculkan kartu materinya.

Buka `app.js` untuk menambah soal di `QUIZ` bila diperlukan.

## Catatan
- Materi ini berisi konten booklet *Practical English Survival Guide* termasuk versi ringkas halaman 11–15 yang dibuat dalam percakapan.
- Tidak ada pengiriman data pengguna ke server; progres dan hasil quiz disimpan di browser masing-masing.
- QR dihasilkan di browser menggunakan library QR code open source yang dipaketkan lokal; tidak bergantung pada layanan QR pihak ketiga.
