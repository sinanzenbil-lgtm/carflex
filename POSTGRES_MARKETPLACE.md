# 🗄️ Vercel Postgres - Marketplace'den Kurulum

## Durum
Vercel artık Postgres'i doğrudan Storage'da sunmuyor. Marketplace üzerinden kurulması gerekiyor.

## ✅ Çözüm: Neon Postgres (Önerilen - En Kolay)

### Adım 1: Marketplace'den Neon Seç

1. Vercel Dashboard'da **"Marketplace Database Providers"** bölümüne bak
2. **"Neon"** seçeneğini bul (yeşil ikon, "Serverless Postgres" yazıyor)
3. **"Neon"** üzerine tıkla

### Adım 2: Neon Kurulumu

1. **"Continue"** veya **"Add Integration"** butonuna tıkla
2. Neon hesabı oluştur (ücretsiz)
3. Yeni bir database oluştur
4. Database adı: `carflex-db` (veya istediğin isim)

### Adım 3: Connection String'i Al

1. Neon dashboard'da database'in sayfasına git
2. **"Connection String"** veya **"Connection Details"** bölümüne git
3. **"Copy"** ile connection string'i kopyala

**Connection String formatı:**
```
postgresql://username:password@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Adım 4: Environment Variable Ekle

1. Vercel Dashboard'a dön
2. CarFlex projesine git
3. **Settings** → **Environment Variables**
4. **"+ Add More"** tıkla
5. **Key:** `DATABASE_URL`
6. **Value:** Neon'dan kopyaladığın connection string'i yapıştır
7. **Environment:** ✅ Production, ✅ Preview, ✅ Development
8. **"Save"** tıkla

## Alternatif: Supabase (Ücretsiz)

Eğer Neon'u beğenmezsen:

1. Marketplace'de **"Supabase"** seç
2. Supabase hesabı oluştur (ücretsiz)
3. Yeni project oluştur
4. **Settings** → **Database** → **Connection String** kopyala
5. Vercel'de Environment Variable olarak ekle

## Alternatif: AWS (Daha Gelişmiş)

1. Marketplace'de **"AWS"** seç
2. AWS hesabı bağla
3. RDS PostgreSQL oluştur
4. Connection string'i al
5. Vercel'de Environment Variable olarak ekle

## ✅ Önerilen: Neon

**Neden Neon?**
- ✅ Ücretsiz tier mevcut
- ✅ Kolay kurulum
- ✅ Serverless (otomatik ölçeklenir)
- ✅ Vercel ile entegre
- ✅ Hızlı

## 🚀 Hızlı Başlangıç

1. Marketplace'de **Neon**'a tıkla
2. **"Add Integration"** veya **"Continue"** tıkla
3. Neon hesabı oluştur (ücretsiz)
4. Database oluştur
5. Connection string'i kopyala
6. Vercel'de Environment Variable olarak ekle
