# Otomatik GitHub Push Rehberi

## Durum
✅ Git repository hazır
✅ SSH key oluşturuldu ve clipboard'da
✅ Remote repository bağlandı
⏳ GitHub'a SSH key eklenmesi gerekiyor (tek seferlik)

## SSH Key'i GitHub'a Ekleme (1 Dakika)

SSH key'iniz hazır ve clipboard'da. Şimdi GitHub'a eklemeniz gerekiyor:

### Yöntem 1: Web Arayüzü (En Kolay - 30 saniye)

1. **Bu linke tıklayın:** https://github.com/settings/keys
2. **"New SSH key" butonuna tıklayın**
3. **Title:** `CarFlex MacBook` yazın
4. **Key:** Cmd+V ile yapıştırın (zaten clipboard'da)
5. **"Add SSH key" butonuna tıklayın**

### Yöntem 2: GitHub API (Eğer Token'ınız varsa)

Eğer GitHub Personal Access Token'ınız varsa, terminal'de şu komutu çalıştırın:

```bash
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/keys \
  -d '{"title":"CarFlex MacBook","key":"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKTZkqtOL39ZXut87zMHgyNRdwksqRrduuSYWWjHc3G8 github@carflex"}'
```

## Push İşlemi

SSH key'i ekledikten sonra, terminal'de şu komutu çalıştırın:

```bash
cd /Users/sinanmacbookpro/CARFLEX.COM.TR
git push -u origin main
```

VEYA benim için "push yap" deyin, ben yapayım! 🚀
