# 🚀 Vercel Environment Variables - Adım Adım Rehber

## Adım 1: Vercel Postgres Oluştur

1. **Storage** sekmesine git (sol menüden veya yeni tab aç: https://vercel.com/dashboard/storage)
2. **"Create Database"** butonuna tıkla
3. **"Postgres"** seç
4. Database adı: `carflex-db` (veya istediğin bir isim)
5. **"Create"** butonuna tıkla
6. Database oluşturulunca, **"Connection String"** bölümüne git
7. **"Copy"** butonuna tıkla (connection string'i kopyala)

**Connection String örneği:**
```
postgres://default:xxxxx@xxxxx.vercel-storage.com:5432/verceldb
```

## Adım 2: Environment Variable Ekle

1. **CarFlex projesine** dön (Dashboard'da projeni seç)
2. **Settings** sekmesine git
3. **Environment Variables** bölümüne git
4. **"+ Add More"** butonuna tıkla
5. Şunları yaz:

   **Key:**
   ```
   DATABASE_URL
   ```

   **Value:**
   ```
   (Kopyaladığın connection string'i buraya yapıştır)
   ```

6. **Environment** seçeneklerini işaretle:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

7. **"Save"** butonuna tıkla

## Adım 3: Redeploy Yap

1. **Deployments** sekmesine git
2. Son deployment'ın yanındaki **"..."** menüsüne tıkla
3. **"Redeploy"** seç
4. **"Redeploy"** butonuna tıkla
5. Build tamamlanmasını bekle (1-2 dakika)

## ✅ Kontrol

Deploy tamamlandıktan sonra:
- ✅ Build başarılı olmalı
- ✅ Site çalışmalı
- ✅ Hata düzelmiş olmalı

## 🆘 Sorun Giderme

### Connection String Bulamıyorum
- Storage > Postgres database'inize gidin
- "Connection String" bölümüne bakın
- "Copy" butonuna tıklayın

### Environment Variable Eklenmiyor
- Key'in tam olarak `DATABASE_URL` olduğundan emin olun (büyük/küçük harf önemli)
- Value'da connection string'in tamamını yapıştırdığınızdan emin olun
- Environment seçeneklerini işaretlediğinizden emin olun
