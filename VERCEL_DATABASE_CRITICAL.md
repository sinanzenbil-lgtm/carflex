# ⚠️ KRİTİK: DATABASE_URL Hatası

## Hata Mesajı
```
Please make sure your database server is running at `localhost:5432`.
PrismaClientInitializationError
```

## Sorun
Vercel'de `DATABASE_URL` environment variable'ı **localhost**'u gösteriyor veya **yanlış/eksik**.

**Production'da localhost çalışmaz!** Mutlaka gerçek bir PostgreSQL connection string olmalı.

## 🔴 ACİL ÇÖZÜM

### 1. Vercel Dashboard'da DATABASE_URL'i Kontrol Edin

1. **Vercel Dashboard** > CarFlex projesi
2. **Settings** > **Environment Variables**
3. `DATABASE_URL` var mı kontrol edin
4. **Value**'ya tıklayın ve içeriğini kontrol edin

### 2. Eğer localhost Görüyorsanız

**YANLIŞ:**
```
postgresql://user:password@localhost:5432/carflex
```

**DOĞRU (Vercel Postgres):**
```
postgres://default:xxxxx@xxxxx.vercel-storage.com:5432/verceldb
```

### 3. Vercel Postgres Oluşturun (Eğer Yoksa)

1. **Vercel Dashboard** > **Storage**
2. **"Create Database"** > **"Postgres"**
3. Database adı: `carflex-db`
4. **"Create"** butonuna tıklayın
5. **"Connection String"** bölümüne gidin
6. **"Copy"** butonuna tıklayın

### 4. DATABASE_URL'i Güncelleyin

1. **Settings** > **Environment Variables**
2. `DATABASE_URL`'i bulun
3. **"Edit"** butonuna tıklayın
4. **Value:** Vercel Postgres connection string'ini yapıştırın
5. **Environment:** Production, Preview, Development (hepsini seçin)
6. **"Save"** butonuna tıklayın

### 5. Redeploy Yapın

1. **Deployments** sekmesi
2. Son deployment'ın yanındaki **"..."** menüsü
3. **"Redeploy"** seçin
4. **"Redeploy"** butonuna tıklayın

## ✅ Kontrol

Deploy tamamlandıktan sonra:
- Siteyi test edin
- Hata düzelmiş olmalı

## 🔍 DATABASE_URL Formatı

**Vercel Postgres:**
```
postgres://default:PASSWORD@HOST.vercel-storage.com:5432/verceldb
```

**Başka PostgreSQL Servisi:**
```
postgresql://username:password@host:port/database?schema=public
```

**❌ ASLA localhost KULLANMAYIN:**
```
postgresql://user:pass@localhost:5432/db  ← YANLIŞ!
```
