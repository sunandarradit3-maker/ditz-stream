# DiTz Stream — Full Stack Starter

Platform video streaming bergaya modern dengan:
- Home feed video
- Watch page
- Comment system
- Upload form
- Creator Studio
- Admin panel
- API backend
- File-based persistence untuk demo/dev

## Teknologi
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Route Handlers (API)

## Jalankan lokal
```bash
npm install
npm run dev
```

## Deploy ke Vercel
1. Push ke GitHub
2. Import project ke Vercel
3. Deploy

## Catatan storage
Project ini memakai `data/ditz-stream.json` sebagai storage demo.
Untuk produksi, ganti storage ke database sungguhan seperti:
- Supabase
- Neon Postgres
- PlanetScale
- MongoDB Atlas

## Struktur penting
- `src/app/api/videos` → list/create video
- `src/app/api/videos/[id]` → detail video + related + like
- `src/app/api/comments` → list/create komentar
- `src/app/upload` → form upload
- `src/app/studio` → creator dashboard
- `src/app/admin` → admin panel

## Brand
Silakan ganti nama, warna, logo, dan pricing sesuai kebutuhan jualan DiTz store.
