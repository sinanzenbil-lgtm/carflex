# Vercel'de Mevcut Projeyi Güncelleme

## Durum
✅ CarFlex projesi Vercel'de mevcut
✅ GitHub'a yeni değişiklikler push edildi
✅ Vercel otomatik deploy yapmalı

## Yapılacaklar

### 1. Otomatik Deploy Kontrolü
Vercel, GitHub'a push edilen değişiklikleri otomatik olarak algılar ve deploy eder.

**Kontrol:**
- Vercel Dashboard > CarFlex projesi
- "Deployments" sekmesine gidin
- Son deployment'ı kontrol edin
- Eğer yeni bir deployment yoksa, "Redeploy" yapın

### 2. Manuel Redeploy (Gerekirse)

1. **Vercel Dashboard** > CarFlex projesi
2. **Deployments** sekmesi
3. Son deployment'ın yanındaki **"..."** menüsüne tıklayın
4. **"Redeploy"** seçin
5. **"Redeploy"** butonuna tıklayın

### 3. Environment Variables Kontrolü

**Önemli:** DATABASE_URL ekli mi kontrol edin:

1. **Settings** > **Environment Variables**
2. `DATABASE_URL` var mı kontrol edin
3. Yoksa ekleyin (PostgreSQL connection string)

### 4. Build Logları Kontrolü

Deploy sırasında hata varsa:

1. **Deployments** > Son deployment
2. **"View Build Logs"** butonuna tıklayın
3. Hata mesajlarını kontrol edin

## Yapılan Değişiklikler

1. ✅ Prisma schema PostgreSQL'e çevrildi
2. ✅ vercel.json optimize edildi
3. ✅ GitHub'a push edildi

## Sorun Giderme

### Build Hatası
- Build loglarını kontrol edin
- Environment Variables'da DATABASE_URL olduğundan emin olun
- Build Command: `npx prisma generate && npm run build` olmalı

### Domain Çalışmıyor
- Settings > Domains > carflex.com.tr ekli mi kontrol edin
- DNS ayarlarını kontrol edin
