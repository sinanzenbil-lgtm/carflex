# GitHub SSH Key Kurulumu

## ✅ SSH Key Oluşturuldu!

SSH key'iniz hazır. Şimdi GitHub'a eklemeniz gerekiyor:

## Adım 1: Public Key'i Kopyalayın

Aşağıdaki key'i kopyalayın:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKTZkqtOL39ZXut87zMHgyNRdwksqRrduuSYWWjHc3G8 github@carflex
```

## Adım 2: GitHub'a Ekleyin

1. **GitHub'a giriş yapın:** https://github.com/settings/keys
2. **"New SSH key" butonuna tıklayın**
3. **Title:** `CarFlex MacBook` (veya istediğiniz bir isim)
4. **Key:** Yukarıdaki key'i yapıştırın
5. **"Add SSH key" butonuna tıklayın**

## Adım 3: Push Yapın

SSH key'i ekledikten sonra terminal'de şu komutu çalıştırın:

```bash
cd /Users/sinanmacbookpro/CARFLEX.COM.TR
git push -u origin main
```

Artık GitHub'a sorunsuz push yapabilirsiniz! 🚀

## Alternatif: Key'i Terminal'den Kopyalama

Eğer key'i kopyalamak isterseniz:

```bash
cat ~/.ssh/id_ed25519_github.pub | pbcopy
```

Bu komut key'i otomatik olarak clipboard'a kopyalar.
