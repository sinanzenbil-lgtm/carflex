# carflex.com.tr Domain Kurulumu

## Sorun
Domain DNS kayıtları yapılmamış. "Could not resolve host" hatası alınıyor.

## Çözüm Adımları

### 1. Vercel'e Deploy Edin (Eğer henüz yapılmadıysa)

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **New Project** → GitHub repository'nizi seçin (`sinanzenbil-lgtm/carflex`)
3. **Deploy** butonuna tıklayın
4. Deploy tamamlandığında bir URL alacaksınız (örn: `carflex-xxxxx.vercel.app`)

### 2. Domain'i Vercel'e Ekleyin

1. **Vercel Dashboard** → Projeniz → **Settings** → **Domains**
2. **"Add Domain"** butonuna tıklayın
3. **`carflex.com.tr`** yazın
4. **"Add"** butonuna tıklayın

### 3. DNS Kayıtlarını Yapın

Vercel size DNS kayıtlarını gösterecek. Domain sağlayıcınızda (Namecheap, GoDaddy, vb.) şu kayıtları ekleyin:

#### Seçenek A: A Record (Önerilen)
- **Type:** A
- **Name:** @ (veya boş)
- **Value:** Vercel'in verdiği IP adresi (genellikle `76.76.21.21`)

#### Seçenek B: CNAME Record
- **Type:** CNAME
- **Name:** @ (veya boş)
- **Value:** `cname.vercel-dns.com`

#### www için:
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`

### 4. DNS Propagation Bekleyin

DNS değişiklikleri 24-48 saat sürebilir, ancak genellikle birkaç saat içinde aktif olur.

### 5. SSL Sertifikası

Vercel otomatik olarak SSL sertifikası (HTTPS) sağlar. Domain eklendikten sonra otomatik olarak aktif olur.

## Kontrol

DNS ayarları yapıldıktan sonra:

```bash
# DNS kayıtlarını kontrol edin
nslookup carflex.com.tr

# Site erişimini kontrol edin
curl -I https://carflex.com.tr
```

## Sorun Giderme

### "Could not resolve host" hatası
- DNS kayıtları henüz yapılmamış veya propagation tamamlanmamış
- Domain sağlayıcınızda DNS kayıtlarını kontrol edin

### "Domain not found" hatası
- Domain Vercel'e eklenmemiş
- Vercel Dashboard > Settings > Domains'den kontrol edin

### SSL hatası
- DNS propagation tamamlanmasını bekleyin (genellikle 1-2 saat)
- Vercel otomatik olarak SSL sertifikası sağlar
