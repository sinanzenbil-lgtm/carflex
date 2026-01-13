# CarFlex - Vercel Deployment Rehberi

## Hızlı Başlangıç

### 1. Vercel CLI ile Deploy

```bash
# Vercel'e login olun
npx vercel login

# Production'a deploy edin
npx vercel --prod
```

### 2. Domain Ayarları

1. Vercel Dashboard'a gidin: https://vercel.com/dashboard
2. Projenizi seçin
3. **Settings > Domains** bölümüne gidin
4. `carflex.com.tr` domain'ini ekleyin
5. Vercel size DNS kayıtlarını gösterecek, bunları domain sağlayıcınızda yapılandırın

### 3. Environment Variables

Vercel Dashboard > Settings > Environment Variables bölümünde şunları ekleyin:

- `DATABASE_URL` - Production veritabanı URL'iniz (PostgreSQL önerilir)

**Önemli:** SQLite yerine PostgreSQL kullanın çünkü Vercel'de SQLite dosya sistemi sorunları olabilir.

### 4. Build Ayarları

Vercel otomatik olarak Next.js projelerini algılar, ancak manuel ayar yapmak isterseniz:

- **Framework Preset:** Next.js
- **Build Command:** `npx prisma generate && npm run build`
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm install`

## GitHub ile Deploy

### 1. Git Repository Oluşturma

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Vercel'de Proje Oluşturma

1. https://vercel.com/dashboard adresine gidin
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi seçin
4. Proje ayarlarını yapın:
   - Framework: Next.js
   - Root Directory: `.` (proje kök dizini)
   - Build Command: `npx prisma generate && npm run build`
   - Install Command: `npm install`

### 3. Environment Variables

Settings > Environment Variables bölümünde:
- `DATABASE_URL` ekleyin

### 4. Deploy

"Deploy" butonuna tıklayın. Vercel otomatik olarak build edip deploy edecek.

## Veritabanı Kurulumu

### PostgreSQL (Önerilen)

1. Vercel Postgres veya başka bir PostgreSQL servisi kullanın
2. Connection string'i alın
3. Vercel Dashboard > Environment Variables'da `DATABASE_URL` olarak ekleyin
4. Production'da migration çalıştırın:

```bash
npx prisma migrate deploy
```

veya

```bash
npx prisma db push
```

## Sorun Giderme

### Build Hataları

- Prisma client generate edilmemiş olabilir: Build command'a `npx prisma generate` ekleyin
- Environment variables eksik olabilir: Vercel Dashboard'da kontrol edin

### Database Connection Hataları

- `DATABASE_URL` environment variable'ının doğru olduğundan emin olun
- PostgreSQL connection string formatı: `postgresql://user:password@host:port/database?schema=public`

### Domain Ayarları

- DNS propagation 24-48 saat sürebilir
- Vercel Dashboard'da domain durumunu kontrol edin

## İletişim

Sorularınız için: [İletişim bilgileri]
