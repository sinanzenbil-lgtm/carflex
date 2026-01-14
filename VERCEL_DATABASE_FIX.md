# Vercel DATABASE_URL Hatası Çözümü

## Hata
```
PrismaClientInitializationError
```

## Sorun
Vercel'de `DATABASE_URL` environment variable eksik veya yanlış.

## Çözüm

### 1. Vercel Dashboard'da Environment Variable Ekleyin

1. **Vercel Dashboard** > CarFlex projesi
2. **Settings** > **Environment Variables**
3. **"Add New"** butonuna tıklayın
4. **Key:** `DATABASE_URL`
5. **Value:** PostgreSQL connection string
6. **Environment:** Production, Preview, Development (hepsini seçin)
7. **"Save"** butonuna tıklayın

### 2. PostgreSQL Connection String Formatı

**Vercel Postgres kullanıyorsanız:**
1. Vercel Dashboard > **Storage** > **Create Database** > **Postgres**
2. Database oluşturun
3. **Connection String**'i kopyalayın
4. Environment Variable olarak ekleyin

**Format:**
```
postgres://default:xxxxx@xxxxx.vercel-storage.com:5432/verceldb
```

**Başka bir PostgreSQL servisi kullanıyorsanız:**
```
postgresql://username:password@host:port/database?schema=public
```

### 3. Redeploy Yapın

Environment variable ekledikten sonra:

1. **Deployments** sekmesi
2. Son deployment'ın yanındaki **"..."** menüsü
3. **"Redeploy"** seçin
4. **"Redeploy"** butonuna tıklayın

### 4. Kontrol

Deploy tamamlandıktan sonra siteyi test edin. Hata düzelmiş olmalı.

## Önemli Notlar

- ✅ Environment variable'ı **Production**, **Preview**, ve **Development** için ekleyin
- ✅ Connection string'de özel karakterler varsa URL encode edin
- ✅ Redeploy yapmadan değişiklik aktif olmaz
