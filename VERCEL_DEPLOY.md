# Vercel Deployment - Otomatik Kurulum

## 🚀 Hızlı Deploy (5 Dakika)

Vercel Dashboard açıldı. Şu adımları takip edin:

### Adım 1: GitHub Repository Seçimi
- Açılan sayfada `sinanzenbil-lgtm/carflex` repository'si görünecek
- "Import" butonuna tıklayın

### Adım 2: Project Settings
Vercel otomatik olarak şunları algılayacak:
- ✅ Framework: Next.js
- ✅ Root Directory: `.` (proje kök dizini)
- ✅ Build Command: `npx prisma generate && npm run build` (otomatik)
- ✅ Output Directory: `.next` (otomatik)

**Eğer Build Command görünmüyorsa, manuel ekleyin:**
```
npx prisma generate && npm run build
```

### Adım 3: Environment Variables
"Environment Variables" bölümüne şunu ekleyin:
- **Key:** `DATABASE_URL`
- **Value:** Production veritabanı URL'iniz (PostgreSQL önerilir)

**Önemli:** SQLite yerine PostgreSQL kullanın çünkü Vercel'de SQLite dosya sistemi sorunları olabilir.

### Adım 4: Deploy
- "Deploy" butonuna tıklayın
- Build işlemi 2-3 dakika sürecek
- Deploy tamamlandığında size bir URL verilecek (örn: `carflex.vercel.app`)

### Adım 5: Domain Ayarları
1. Vercel Dashboard > Projeniz > Settings > Domains
2. "Add Domain" butonuna tıklayın
3. `carflex.com.tr` yazın
4. Vercel size DNS kayıtlarını gösterecek
5. Domain sağlayıcınızda (Namecheap, GoDaddy, vb.) bu DNS kayıtlarını yapın

## 🔧 Sorun Giderme

### Build Hatası Alırsanız
- Environment Variables'da `DATABASE_URL` olduğundan emin olun
- Build Command'ın doğru olduğunu kontrol edin: `npx prisma generate && npm run build`

### Database Connection Hatası
- `DATABASE_URL` formatı: `postgresql://user:password@host:port/database?schema=public`
- Vercel Postgres kullanıyorsanız, Vercel Dashboard'dan connection string'i kopyalayın

## 📝 Sonraki Adımlar

Deploy tamamlandıktan sonra:
1. ✅ Site canlıda: `https://carflex.com.tr` (domain ayarlarından sonra)
2. ✅ Admin panel: `https://carflex.com.tr/login`
3. ✅ Veritabanı migration: Production'da `npx prisma migrate deploy` çalıştırın (Vercel CLI ile)

## 🎉 Başarılı!

Site artık canlıda! Her GitHub push'unda otomatik deploy olacak.
