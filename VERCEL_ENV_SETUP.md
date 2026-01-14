# Vercel Environment Variable Kurulumu - Adım Adım

## 🚀 Hızlı Kurulum (5 Dakika)

### Adım 1: Vercel Dashboard'u Açın
https://vercel.com/dashboard → CarFlex projesi

### Adım 2: Environment Variables'a Gidin
1. **Settings** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçin

### Adım 3: DATABASE_URL Ekleyin

**Eğer Vercel Postgres kullanıyorsanız:**

1. Yeni bir tab açın: **Storage** > **Create Database** > **Postgres**
2. Database adı: `carflex-db` (veya istediğiniz isim)
3. **"Create"** butonuna tıklayın
4. Database sayfasında **"Connection String"** bölümüne gidin
5. **"Copy"** butonuna tıklayın
6. Geri dönün: **Settings** > **Environment Variables**
7. **"Add New"** butonuna tıklayın
8. **Key:** `DATABASE_URL`
9. **Value:** Kopyaladığınız connection string'i yapıştırın
10. **Environment:** Production, Preview, Development (hepsini seçin)
11. **"Save"** butonuna tıklayın

**Eğer başka bir PostgreSQL servisi kullanıyorsanız:**

1. **"Add New"** butonuna tıklayın
2. **Key:** `DATABASE_URL`
3. **Value:** PostgreSQL connection string'iniz
   ```
   postgresql://username:password@host:port/database?schema=public
   ```
4. **Environment:** Production, Preview, Development (hepsini seçin)
5. **"Save"** butonuna tıklayın

### Adım 4: Redeploy Yapın

1. **Deployments** sekmesine gidin
2. Son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. **"Redeploy"** butonuna tıklayın

### Adım 5: Kontrol Edin

Deploy tamamlandıktan sonra:
- Siteyi test edin
- Hata düzelmiş olmalı

## ✅ Kontrol Listesi

- [ ] Vercel Dashboard'da CarFlex projesi açık
- [ ] Settings > Environment Variables'a gidildi
- [ ] DATABASE_URL eklendi
- [ ] Production, Preview, Development seçildi
- [ ] Save butonuna tıklandı
- [ ] Redeploy yapıldı

## 🔍 Sorun Giderme

### "Environment variable not found" hatası
- Environment variable'ı Production için eklediğinizden emin olun
- Redeploy yaptığınızdan emin olun

### "Invalid connection string" hatası
- Connection string formatını kontrol edin
- Özel karakterler URL encode edilmiş olmalı

### Hala hata alıyorsanız
- Build loglarını kontrol edin
- DATABASE_URL'in doğru kopyalandığından emin olun
