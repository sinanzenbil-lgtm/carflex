# Vercel Deployment Checklist

## ✅ Yapılan Düzenlemeler

1. ✅ Prisma schema PostgreSQL'e çevrildi
2. ✅ vercel.json build command ayarlandı
3. ✅ GitHub'a push edildi

## 📋 Vercel'de Yapılacaklar

### 1. Project Settings Kontrolü

Vercel Dashboard > Projeniz > Settings > General:

- **Framework Preset:** Next.js ✅
- **Build Command:** `npx prisma generate && npm run build` ✅
- **Output Directory:** `.next` (otomatik) ✅
- **Install Command:** `npm install` ✅
- **Node.js Version:** `20.x` (ayarlayın)

### 2. Environment Variables

Vercel Dashboard > Settings > Environment Variables:

**Eklenmesi Gereken:**
- `DATABASE_URL` - PostgreSQL connection string

**Format:**
```
postgresql://user:password@host:port/database?schema=public
```

**Vercel Postgres kullanıyorsanız:**
1. Storage > Create Database > Postgres
2. Connection String'i kopyalayın
3. Environment Variables'a ekleyin

### 3. Build Ayarları

Build Command'ın şöyle olduğundan emin olun:
```
npx prisma generate && npm run build
```

### 4. Deploy

1. Vercel Dashboard > Deployments
2. "Redeploy" butonuna tıklayın
3. Build loglarını kontrol edin

## 🔍 Build Hatalarını Kontrol

Eğer build hatası alırsanız:

1. **Build loglarını kontrol edin:**
   - Vercel Dashboard > Deployments > Son deployment > Build Logs

2. **Yaygın hatalar:**
   - Prisma generate hatası → Build command'ı kontrol edin
   - DATABASE_URL hatası → Environment variable ekleyin
   - TypeScript hatası → Local'de `npm run build` çalıştırın

3. **Local build test:**
   ```bash
   npm run build
   ```
   Local'de başarılı olmalı.

## 🚀 Sonraki Adımlar

1. ✅ Vercel'e deploy edin
2. ✅ Domain ekleyin (carflex.com.tr)
3. ✅ DNS ayarlarını yapın
4. ✅ Database migration çalıştırın

## 📞 Yardım

Build hatası alırsanız, hata mesajını paylaşın, birlikte çözelim!
