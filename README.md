# Website Lumoria SMP - Minecraft Server

Website resmi server Minecraft: landing page premium bertema dark/gaming, ditambah
panel admin untuk mengelola seluruh konten tanpa menyentuh kode.

## Fitur

- Landing page satu halaman: Hero, Tentang Server, Fitur, Informasi Server (dengan
  tombol salin IP), Staff, Pengumuman, FAQ, Footer.
- Panel admin (`/admin`) dengan login terproteksi, untuk mengatur:
  - Pengaturan umum (nama, logo, favicon, banner, background, warna tema, hero, tentang, footer, sosial media)
  - Tombol Join Server / Join Discord / Vote Server / tombol custom (bisa aktif/nonaktif)
  - Informasi server (IP, port Bedrock, versi, mode, status, jumlah pemain, lokasi)
  - Fitur server (card tak terbatas, dengan icon atau gambar)
  - Staff/petinggi server (foto skin, gamertag, jabatan, urutan)
  - Pengumuman (event, maintenance, update, giveaway, info)
  - FAQ
  - Ganti password admin
- Upload gambar langsung disimpan sebagai base64 di database (tidak butuh layanan
  storage tambahan) — atau cukup tempel URL gambar dari luar.
- Dark mode, animasi halus (framer-motion), responsif penuh (desktop/tablet/mobile).

## Struktur Teknologi

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma ORM + PostgreSQL (disarankan untuk produksi/Vercel)
- Autentikasi admin custom: cookie session (JWT via `jose`) + password ter-hash (`bcryptjs`)

## Menjalankan di Lokal

1. Install dependencies:
   ```bash
   npm install
   ```

2. Siapkan environment variable — salin `.env.example` menjadi `.env` lalu isi:
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL`: koneksi Postgres. Untuk uji coba cepat tanpa Postgres, kamu bisa
     memakai SQLite: ubah `provider` di `prisma/schema.prisma` menjadi `"sqlite"`,
     lalu set `DATABASE_URL="file:./dev.db"`.
   - `ADMIN_JWT_SECRET`: string acak yang panjang (contoh: `openssl rand -base64 32`).

3. Buat tabel database (skema otomatis dibuat/disinkronkan):
   ```bash
   npm run db:push
   ```

4. (Opsional) isi beberapa contoh konten fitur/FAQ:
   ```bash
   npm run db:seed
   ```

5. Jalankan server development:
   ```bash
   npm run dev
   ```
   - Website: http://localhost:3000
   - Panel admin: http://localhost:3000/admin/login — pertama kali dibuka kamu akan
     otomatis diarahkan ke `/admin/setup` untuk membuat username & password admin
     sendiri langsung dari browser (tidak perlu edit database atau file apa pun).

## Deploy ke Vercel (siap pakai)

Vercel menjalankan aplikasi ini sebagai serverless function — filesystem-nya
sementara/tidak persisten, jadi **SQLite tidak akan bekerja di produksi**. Kamu
wajib pakai database Postgres yang di-hosting. Paling mudah:

- [Neon](https://neon.tech) — gratis, tinggal daftar dan salin connection string.
- Vercel Postgres (dari dashboard Vercel > Storage) juga bisa.

Langkah deploy (hanya ini, tidak ada langkah CLI/manual database lain):

1. Buat database Postgres gratis di Neon, salin **connection string**-nya (format
   `postgresql://user:password@host/dbname?sslmode=require`).
2. Push project ini ke repository GitHub/GitLab/Bitbucket.
3. Import repository ke [vercel.com/new](https://vercel.com/new).
4. Di bagian **Environment Variables**, isi untuk **semua environment** (Production,
   Preview, Development):
   - `DATABASE_URL` = connection string Postgres kamu
   - `ADMIN_JWT_SECRET` = string acak yang panjang (contoh: `openssl rand -base64 32`)
5. Klik **Deploy**. Proses build akan otomatis membuat seluruh tabel database
   (`prisma db push` berjalan otomatis di build, lihat `package.json`), jadi kamu
   **tidak perlu** menjalankan perintah database apa pun secara manual.
6. Setelah deploy selesai, buka `https://domain-kamu.vercel.app/admin/login`.
   Karena belum ada akun admin, kamu akan otomatis diarahkan ke halaman
   **buat akun admin pertama** (`/admin/setup`) — isi username & password sendiri
   langsung dari browser. Halaman ini otomatis terkunci setelah akun pertama dibuat,
   jadi aman untuk dibiarkan publik.

Tidak ada password default yang perlu diingat/diganti — kamu yang menentukan
sendiri username & password admin saat setup pertama kali.

## Catatan Penting

- **Environment variable wajib** sebelum deploy berhasil: `DATABASE_URL` dan
  `ADMIN_JWT_SECRET`. Tanpa keduanya, build/aplikasi akan gagal — ini bukan
  kekurangan template, tapi memang setiap aplikasi dengan database & login perlu
  dua hal ini dari penyedia hosting manapun.
- Setelah `DATABASE_URL` & `ADMIN_JWT_SECRET` terisi di Vercel, proses selanjutnya
  (buat tabel, buat akun admin, isi semua konten) 100% bisa dilakukan lewat browser
  tanpa install apa pun tambahan di komputer kamu.



## Catatan Gambar/Upload

Gambar (logo, banner, background, skin staff, icon fitur) disimpan sebagai teks
base64 langsung di database supaya deploy tetap sederhana tanpa layanan storage
tambahan. Disarankan mengompres gambar (di bawah ~800KB) sebelum diunggah. Kamu
juga bisa cukup menempel URL gambar dari internet tanpa mengunggah file.

## Struktur Folder Penting

```
src/app/page.tsx              -> Landing page (server component, ambil data dari Prisma)
src/components/sections/*     -> Komponen tiap section landing page
src/app/admin/*                -> Halaman-halaman panel admin
src/app/api/*                  -> API route untuk CRUD & autentikasi admin
src/middleware.ts               -> Proteksi /admin dan /api (kecuali /admin/login)
prisma/schema.prisma            -> Skema seluruh model data
prisma/seed.ts                  -> Data awal (admin user + contoh konten)
```

## Mengembangkan Lebih Lanjut

Struktur kode mengikuti pola yang konsisten: setiap entitas (fitur, staff,
pengumuman, FAQ, tombol) punya API route CRUD sendiri di `src/app/api/`, dan
halaman admin sendiri di `src/app/admin/`. Untuk menambah field baru, cukup:

1. Tambahkan kolom di `prisma/schema.prisma`, jalankan `npm run db:push`.
2. Tambahkan field di API route terkait (`route.ts`).
3. Tambahkan input field di halaman admin terkait.
4. Tampilkan di komponen section landing page terkait.
