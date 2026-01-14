# GitHub Repository Oluşturma Rehberi

## Adım 1: GitHub'da Repository Oluşturun

1. **GitHub'a giriş yapın:** https://github.com
2. **Sağ üstteki "+" butonuna tıklayın** → "New repository"
3. **Repository bilgilerini doldurun:**
   - Repository name: `carflex` veya `CARFLEX.COM.TR`
   - Description: "CarFlex - Uzun ve Kısa Dönem Araç Kiralama ve Filo Yönetim Sistemi"
   - Visibility: **Private** (önerilir) veya **Public**
   - **ÖNEMLİ:** "Initialize this repository with a README" seçeneğini **İŞARETLEMEYİN** (zaten README var)
   - "Add .gitignore" seçeneğini de **İŞARETLEMEYİN** (zaten var)
   - "Choose a license" seçeneğini boş bırakın
4. **"Create repository" butonuna tıklayın**

## Adım 2: Repository URL'ini Kopyalayın

Repository oluşturulduktan sonra GitHub size şu şekilde bir URL gösterecek:
```
https://github.com/KULLANICI_ADINIZ/carflex.git
```

Bu URL'yi kopyalayın.

## Adım 3: Terminal'de Push Edin

Terminal'de şu komutları çalıştırın (KULLANICI_ADINIZ ve REPO_ADI kısımlarını kendi bilgilerinizle değiştirin):

```bash
cd /Users/sinanmacbookpro/CARFLEX.COM.TR

# GitHub repository'nizi ekleyin
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADI.git

# Branch'i main olarak ayarlayın
git branch -M main

# Tüm dosyaları GitHub'a push edin
git push -u origin main
```

## Alternatif: GitHub Desktop Kullanarak

1. **GitHub Desktop'ı indirin:** https://desktop.github.com
2. **GitHub Desktop'ı açın**
3. **File → Add Local Repository** seçin
4. **Repository path:** `/Users/sinanmacbookpro/CARFLEX.COM.TR` seçin
5. **"Publish repository" butonuna tıklayın**
6. Repository adını girin ve "Publish" butonuna tıklayın

## Sorun Giderme

### "remote origin already exists" hatası alırsanız:
```bash
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADI.git
```

### Authentication hatası alırsanız:
GitHub artık password authentication kabul etmiyor. Şu yöntemlerden birini kullanın:

**Yöntem 1: Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "repo" seçeneğini işaretleyin
3. Token'ı kopyalayın
4. Push yaparken password yerine bu token'ı kullanın

**Yöntem 2: SSH Key**
```bash
# SSH key oluşturun (eğer yoksa)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Public key'i kopyalayın
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key
# Kopyaladığınız key'i yapıştırın

# Remote URL'i SSH olarak değiştirin
git remote set-url origin git@github.com:KULLANICI_ADINIZ/REPO_ADI.git
```

## Sonraki Adım: Vercel'e Bağlama

GitHub repository'si hazır olduktan sonra:
1. Vercel Dashboard → New Project
2. GitHub repository'nizi seçin
3. Deploy edin
