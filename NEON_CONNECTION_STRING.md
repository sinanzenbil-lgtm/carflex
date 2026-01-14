# 🔗 Neon Connection String Nasıl Alınır

## Adım Adım:

### 1. "Show secret" Butonuna Tıkla
- Sayfada **".env.local"** tab'ında environment variable'lar görünüyor
- Üstte **"Show secret"** butonu var (göz ikonu ile)
- **"Show secret"** butonuna tıkla

### 2. POSTGRES_URL'i Bul
- Secret'ları gösterdikten sonra şunları göreceksin:
  - `POSTGRES_URL=postgresql://...` (bu bizim ihtiyacımız olan)
  - `POSTGRES_URL_NON_POOLING=postgresql://...`
  - `POSTGRES_USER=...`
  - `POSTGRES_PASSWORD=...`

### 3. POSTGRES_URL'i Kopyala
- `POSTGRES_URL=` ile başlayan satırı bul
- Değerini kopyala (tam connection string)
- Örnek:
  ```
  postgresql://username:password@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
  ```

### 4. Vercel'de Environment Variable Ekle
1. **CarFlex projesine** dön (Vercel Dashboard'da)
2. **Settings** → **Environment Variables**
3. **"+ Add More"** tıkla
4. **Key:** `DATABASE_URL`
5. **Value:** Kopyaladığın `POSTGRES_URL` değerini yapıştır
6. **Environment:** ✅ Production, ✅ Preview, ✅ Development
7. **"Save"** tıkla

## Alternatif: Copy Snippet Butonu
- **"Copy Snippet"** butonuna tıklayarak tüm environment variable'ları kopyalayabilirsin
- Ama bizim sadece `POSTGRES_URL` değerine ihtiyacımız var
- O yüzden `POSTGRES_URL` değerini tek başına kopyala

## Önemli Not:
- `POSTGRES_URL` değerini `DATABASE_URL` olarak Vercel'de ekle
- Prisma `DATABASE_URL` environment variable'ını kullanıyor
