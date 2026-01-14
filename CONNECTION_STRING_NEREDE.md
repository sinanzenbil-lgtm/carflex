# 📍 Connection String Nerede?

## Adım Adım:

### 1. Vercel Storage'a Git
- Vercel Dashboard'da sol menüden **"Storage"** sekmesine tıkla
- Veya direkt: https://vercel.com/dashboard/storage

### 2. Postgres Database'i Bul
- Oluşturduğun Postgres database'i görüyor musun?
- Eğer yoksa: **"Create Database"** → **"Postgres"** → Database oluştur

### 3. Database'e Tıkla
- Oluşturduğun database'in üzerine tıkla (örnek: `carflex-db`)

### 4. Connection String'i Bul
Database sayfasında şu bölümleri göreceksin:

**"Connection String"** veya **"Connect"** bölümü:
- Burada bir metin kutusu var
- İçinde şöyle bir şey yazıyor:
  ```
  postgres://default:xxxxx@xxxxx.vercel-storage.com:5432/verceldb
  ```
- Yanında **"Copy"** butonu var

### 5. Copy Butonuna Tıkla
- **"Copy"** butonuna tıkla
- Bu connection string'i kopyalar

### 6. Environment Variable'a Yapıştır
- CarFlex projesine dön
- Settings → Environment Variables
- "+ Add More" tıkla
- **Key:** `DATABASE_URL`
- **Value:** Kopyaladığın connection string'i buraya yapıştır

## Connection String Örneği:

```
postgres://default:AbCdEf123456@ep-xxxxx-xxxxx.vercel-storage.com:5432/verceldb
```

**Önemli:**
- Bu string'in tamamını kopyala
- `postgres://` ile başlar
- `verceldb` ile biter
- İçinde şifre, host, port bilgileri var

## Görsel Açıklama:

```
Vercel Storage
├── [carflex-db] ← Buraya tıkla
    ├── Overview
    ├── Connection String ← BURASI!
    │   └── [Copy] butonu
    └── ...
```

## Sorun mu Var?

Eğer connection string göremiyorsan:
1. Database'in oluşturulduğundan emin ol (birkaç saniye sürebilir)
2. Database sayfasını yenile (F5)
3. "Connection String" veya "Connect" sekmesine bak
