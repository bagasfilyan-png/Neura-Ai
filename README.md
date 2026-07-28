# Vantara — Website Bisnis Interaktif

Website bisnis premium (React + Vite) dengan halaman Beranda, Produk, Layanan,
Testimoni, Tentang Kami, Blog, FAQ, Kontak, Login/Registrasi, dan Dashboard
Admin — lengkap dengan keranjang belanja, wishlist, live chat, dark/light
mode, dan dwibahasa (ID/EN).

## 1. Menjalankan di komputer lokal

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## 2. Build untuk produksi

```bash
npm run build
npm run preview   # opsional, untuk mencoba hasil build secara lokal
```

Hasil build ada di folder `dist/`.

## 3. Struktur proyek

```
vantara-website/
├── api/
│   └── chat.js          # Serverless function proxy ke Anthropic API
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── lib/
│   │   ├── storage.js   # Wrapper localStorage (pengganti window.storage)
│   │   └── api.js       # Pemanggil AI via /api/chat + fallback
│   ├── App.jsx           # Seluruh halaman & logika UI
│   └── main.jsx
├── .github/workflows/deploy.yml   # Auto-deploy ke GitHub Pages
├── index.html
├── package.json
└── vite.config.js
```

## 4. Deploy — dua opsi

### Opsi A: GitHub Pages (gratis, hosting statis)

1. Push folder ini ke repository GitHub baru.
2. Buka **Settings → Pages** di repo Anda, pilih source **GitHub Actions**.
3. Setiap push ke branch `main` akan otomatis build & deploy lewat workflow
   di `.github/workflows/deploy.yml`.
4. Situs akan tersedia di `https://<username>.github.io/<nama-repo>/`.

**Keterbatasan di GitHub Pages:** hosting ini statis (tanpa server), jadi
endpoint `/api/chat` tidak berjalan — fitur chatbot AI otomatis memakai
balasan cadangan (lihat `src/lib/api.js`). Semua fitur lain (produk,
keranjang, wishlist, testimoni, blog, FAQ, form kontak+validasi, login demo,
dashboard admin demo, dark/light mode, dwibahasa) tetap berfungsi penuh
karena berjalan di sisi browser.

### Opsi B: Vercel atau Netlify (chatbot AI aktif penuh)

1. Import repository ini ke [vercel.com](https://vercel.com) atau
   [netlify.com](https://netlify.com).
2. Di dashboard, tambahkan Environment Variable:
   `ANTHROPIC_API_KEY` = API key Anda dari [console.anthropic.com](https://console.anthropic.com).
3. Deploy. Endpoint `/api/chat` otomatis aktif dan chatbot akan menjawab
   menggunakan model Claude sungguhan.
   *(Untuk Netlify, pindahkan `api/chat.js` ke `netlify/functions/chat.js`
   dan sesuaikan format handler sesuai dokumentasi Netlify Functions.)*

## 5. Yang perlu Anda sesuaikan sebelum go-live

- **Data kontak**: nomor WhatsApp, alamat, dan email sudah diisi sesuai
  permintaan Anda di halaman Kontak (`src/App.jsx`, cari komponen `Contact`).
- **Koordinat Google Maps**: saat ini memakai pencarian otomatis nama jalan.
  Untuk pin lokasi presisi, ganti `src` iframe dengan link Maps yang sudah
  disematkan (Share → Embed a map di Google Maps).
- **Logo, foto produk, foto tim**: saat ini memakai ikon/emoji sebagai
  placeholder visual. Ganti dengan aset gambar asli di folder `public/` dan
  referensikan lewat tag `<img>`.
- **Meta SEO & domain**: ganti `vantara.id` di `index.html`,
  `public/sitemap.xml`, dan `public/robots.txt` dengan domain asli Anda.
- **Google Analytics & Search Console**: ikuti komentar di `index.html`
  untuk menambahkan Measurement ID dan tag verifikasi milik Anda.

## 6. Keamanan & batasan penting (mohon dibaca)

- **Login pengguna & login admin** (`admin@vantara.id` / `admin123`) adalah
  **simulasi untuk demo**, bukan sistem autentikasi produksi. Sebelum
  go-live, ganti dengan layanan auth sungguhan (Supabase Auth, Auth0,
  NextAuth) yang melakukan hashing password di server.
- **Penyimpanan data** memakai `localStorage` browser (lihat
  `src/lib/storage.js`) — data hanya tersimpan di perangkat pengunjung
  masing-masing, bukan database bersama. Untuk data yang perlu dilihat
  semua pengunjung/admin dari perangkat manapun (produk, pesan masuk,
  testimoni), Anda perlu database sungguhan (Supabase/Firebase/PostgreSQL)
  dan mengganti pemanggilan `storage.*` dengan pemanggilan API ke backend
  tersebut.
- **Checkout/pembayaran** belum terhubung payment gateway apa pun. Perlu
  integrasi Midtrans, Xendit, atau sejenisnya di backend terpisah.
- **API key Anthropic** tidak pernah boleh ditaruh di kode frontend — sudah
  diamankan lewat `api/chat.js` yang berjalan di server, bukan di browser.
