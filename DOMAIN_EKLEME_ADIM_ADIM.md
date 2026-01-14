# 🌐 carflex.com.tr Domain Ekleme - Adım Adım

## Adım 1: Vercel'de Domain Ekle

1. **Vercel Dashboard** → **CarFlex projesi** → **Settings** → **Domains**
2. **"Add Domain"** butonuna tıkla
3. **`carflex.com.tr`** yaz
4. **"Add"** butonuna tıkla

## Adım 2: DNS Kayıtlarını Al

Vercel size DNS kayıtlarını gösterecek. Şunları göreceksin:

### A Record (Ana domain için):
- **Type:** A
- **Name:** @ (veya boş)
- **Value:** `76.76.21.21` (veya Vercel'in verdiği IP)

### CNAME Record (www için):
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`

## Adım 3: Domain Sağlayıcında DNS Ayarları

Domain'i nereden aldıysan (Turhost, Natro, GoDaddy, Namecheap, vb.) oranın DNS yönetim paneline git:

1. **DNS Yönetimi** veya **DNS Ayarları** bölümüne git
2. **A Record** ekle:
   - **Type:** A
   - **Name/Host:** `@` (veya boş)
   - **Value:** `76.76.21.21` (Vercel'in verdiği IP)
   - **TTL:** `3600` (veya varsayılan)
3. **CNAME Record** ekle (www için):
   - **Type:** CNAME
   - **Name/Host:** `www`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** `3600` (veya varsayılan)

## Adım 4: DNS Propagation Bekle

DNS değişiklikleri genellikle 1-2 saat içinde aktif olur (bazen 24-48 saat sürebilir).

## Adım 5: SSL Sertifikası

Vercel otomatik olarak SSL sertifikası (HTTPS) sağlar. Domain eklendikten sonra otomatik olarak aktif olur.

## ✅ Kontrol

DNS ayarları yapıldıktan sonra:

```bash
# DNS kayıtlarını kontrol et
nslookup carflex.com.tr

# Site erişimini kontrol et
curl -I https://carflex.com.tr
```

## 🆘 Sorun Giderme

### "Domain not found" hatası
- Domain Vercel'e eklenmemiş
- Vercel Dashboard > Settings > Domains'den kontrol et

### "Could not resolve host" hatası
- DNS kayıtları henüz yapılmamış veya propagation tamamlanmamış
- Domain sağlayıcında DNS kayıtlarını kontrol et

### SSL hatası
- DNS propagation tamamlanmasını bekleyin (genellikle 1-2 saat)
