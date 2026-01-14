# 🌐 Domain Otomatik Kurulum - carflex.com.tr

## ✅ Yapılan İşlemler

1. ✅ Vercel Dashboard açıldı
2. ✅ Domain ekleme scripti oluşturuldu (`add-domain.sh`)

## 🚀 Domain Ekleme (2 Yöntem)

### Yöntem 1: Vercel Dashboard (Önerilen - En Kolay)

1. **Vercel Dashboard'ı açın:** https://vercel.com/dashboard
2. **Projenizi seçin** (carflex veya sinanzenbil-lgtm/carflex)
3. **Settings** sekmesine gidin
4. **Domains** bölümüne gidin
5. **"Add Domain"** butonuna tıklayın
6. **`carflex.com.tr`** yazın
7. **"Add"** butonuna tıklayın
8. Vercel size DNS kayıtlarını gösterecek

### Yöntem 2: Vercel CLI (Terminal)

```bash
# 1. Login olun
npx vercel login

# 2. Projeyi link edin
npx vercel link

# 3. Domain ekleyin
npx vercel domains add carflex.com.tr
```

## 📋 DNS Ayarları (Domain Sağlayıcınızda)

Vercel size şu DNS kayıtlarını gösterecek. Domain sağlayıcınızda (Namecheap, GoDaddy, vb.) ekleyin:

### A Record (Önerilen)
- **Type:** A
- **Name:** @ (veya boş)
- **Value:** `76.76.21.21` (Vercel'in verdiği IP)

### CNAME Record (Alternatif)
- **Type:** CNAME
- **Name:** @ (veya boş)
- **Value:** `cname.vercel-dns.com`

### www için
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`

## ⏱️ DNS Propagation

DNS değişiklikleri genellikle 1-2 saat içinde aktif olur (bazen 24-48 saat sürebilir).

## ✅ Kontrol

DNS ayarları yapıldıktan sonra:

```bash
# DNS kayıtlarını kontrol edin
nslookup carflex.com.tr

# Site erişimini kontrol edin
curl -I https://carflex.com.tr
```

## 🔒 SSL Sertifikası

Vercel otomatik olarak SSL sertifikası (HTTPS) sağlar. Domain eklendikten sonra otomatik olarak aktif olur.

## 🆘 Sorun Giderme

### "Domain not found" hatası
- Domain Vercel'e eklenmemiş
- Vercel Dashboard > Settings > Domains'den kontrol edin

### "Could not resolve host" hatası
- DNS kayıtları henüz yapılmamış veya propagation tamamlanmamış
- Domain sağlayıcınızda DNS kayıtlarını kontrol edin

### SSL hatası
- DNS propagation tamamlanmasını bekleyin (genellikle 1-2 saat)
