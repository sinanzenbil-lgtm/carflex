# 🚀 CarFlex - Sıfırdan Deployment Rehberi

## Adım 1: GitHub Kontrolü

1. **GitHub** açık mı kontrol et: https://github.com
2. Repository kontrolü:
   - Repository: `sinanzenbil-lgtm/carflex`
   - URL: `git@github.com:sinanzenbil-lgtm/carflex.git`

## Adım 2: Vercel Kontrolü

1. **Vercel** açık mı kontrol et: https://vercel.com
2. Login olduğundan emin ol

## Adım 3: Vercel'de Yeni Proje Oluştur

1. Vercel Dashboard'da **"Add New..."** → **"Project"** tıkla
2. **"Import Git Repository"** seç
3. GitHub repository'ni seç: `sinanzenbil-lgtm/carflex`
4. **"Import"** tıkla

## Adım 4: Proje Ayarları

Vercel otomatik algılayacak:
- ✅ Framework: Next.js
- ✅ Root Directory: `./`
- ✅ Build Command: `npx prisma generate && npm run build`
- ✅ Output Directory: `.next` (otomatik)

**Kontrol et:**
- Build Command: `npx prisma generate && npm run build` olmalı
- Install Command: `npm install` olmalı

## Adım 5: Vercel Postgres Oluştur

1. **Storage** sekmesine git (sol menü)
2. **"Create Database"** → **"Postgres"**
3. Database adı: `carflex-db`
4. **"Create"** tıkla
5. **"Connection String"** bölümüne git
6. **"Copy"** ile connection string'i kopyala

## Adım 6: Environment Variable Ekle

1. Proje ayarlarına dön
2. **Environment Variables** bölümüne git
3. **"+ Add More"** tıkla
4. **Key:** `DATABASE_URL`
5. **Value:** Kopyaladığın connection string'i yapıştır
6. **Environment:** ✅ Production, ✅ Preview, ✅ Development
7. **"Save"** tıkla

## Adım 7: Deploy

1. **"Deploy"** butonuna tıkla
2. Build tamamlanmasını bekle (2-3 dakika)
3. Deployment başarılı olmalı

## Adım 8: Domain Ekle (Opsiyonel)

1. **Settings** → **Domains**
2. **"Add Domain"** tıkla
3. `carflex.com.tr` yaz
4. **"Add"** tıkla
5. DNS kayıtlarını domain sağlayıcında yap

## ✅ Kontrol Listesi

- [ ] GitHub hesabı açık
- [ ] Vercel hesabı açık
- [ ] Repository Vercel'e import edildi
- [ ] Build Command doğru: `npx prisma generate && npm run build`
- [ ] Vercel Postgres oluşturuldu
- [ ] DATABASE_URL environment variable eklendi
- [ ] Deploy başarılı
- [ ] Domain eklendi (opsiyonel)
