# 🔧 DNS Zone Hatası Çözümü

## Hata:
```
DNS zone not enabled for carflex.com.tr. Cannot solve dns-01 ACME cert challenge.
```

## Sorun:
Vercel SSL sertifikası oluşturmak için DNS doğrulaması yapamıyor. Bu, DNS kayıtlarının eksik veya yanlış yapılandırıldığını gösteriyor.

## ✅ Çözüm Adımları:

### 1. Vercel'de Domain Durumunu Kontrol Et

1. **Vercel Dashboard** → **CarFlex projesi** → **Settings** → **Domains**
2. `carflex.com.tr` domain'ini bul
3. Durumunu kontrol et:
   - ✅ **"Valid Configuration"** olmalı
   - ❌ **"Invalid Configuration"** veya **"Pending"** ise DNS kayıtları eksik

### 2. DNS Kayıtlarını Kontrol Et

Domain sağlayıcında (Turhost, Natro, GoDaddy, vb.) şu kayıtlar olmalı:

#### A Record (Ana domain):
- **Type:** A
- **Name:** `@` (veya boş)
- **Value:** `76.76.21.21` (veya Vercel'in verdiği IP)

#### CNAME Record (www):
- **Type:** CNAME
- **Name:** `www`
- **Value:** `cname.vercel-dns.com`

### 3. DNS Kayıtlarını Ekle/Düzelt

Eğer DNS kayıtları yoksa veya yanlışsa:

1. Domain sağlayıcının DNS yönetim paneline git
2. **A Record** ekle:
   - **Type:** A
   - **Name:** `@` (veya boş)
   - **Value:** `76.76.21.21`
   - **TTL:** `3600`
3. **CNAME Record** ekle:
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** `3600`

### 4. Alternatif: Nameserver'ları Vercel'e Yönlendir

Eğer DNS kayıtları çalışmıyorsa, nameserver'ları Vercel'e yönlendirebilirsin:

1. Vercel Dashboard → Settings → Domains → carflex.com.tr
2. **"Use Vercel DNS"** seçeneğini gör
3. Vercel'in verdiği nameserver'ları kopyala (örnek: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
4. Domain sağlayıcında nameserver'ları değiştir:
   - Domain sağlayıcının panelinde **"Nameservers"** veya **"DNS Servers"** bölümüne git
   - Vercel'in verdiği nameserver'ları ekle

### 5. DNS Propagation Bekle

DNS değişiklikleri genellikle 1-2 saat içinde aktif olur (bazen 24-48 saat sürebilir).

### 6. Vercel'de Domain'i Yeniden Doğrula

1. Vercel Dashboard → Settings → Domains → carflex.com.tr
2. **"Refresh"** veya **"Verify"** butonuna tıkla
3. SSL sertifikası otomatik oluşturulacak

## ✅ Kontrol:

DNS kayıtlarını kontrol et:

```bash
# DNS kayıtlarını kontrol et
nslookup carflex.com.tr
dig carflex.com.tr

# www için kontrol et
nslookup www.carflex.com.tr
```

## 🆘 Hala Çalışmıyorsa:

1. **Domain sağlayıcıdan destek al** - DNS ayarlarını kontrol etsinler
2. **Vercel Support'a başvur** - Domain doğrulama sorununu çözsünler
3. **24 saat bekle** - DNS propagation tamamlanmasını bekle
