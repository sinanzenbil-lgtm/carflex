# CarFlex - Araç Kiralama ve Filo Yönetim Sistemi

CarFlex, uzun ve kısa dönem araç kiralama hizmetleri için geliştirilmiş kapsamlı bir filo yönetim sistemidir.

## Özellikler

### Ana Web Sitesi
- Uzun dönem araç kiralama fiyatları
- Kısa dönem (günlük) araç kiralama fiyatları
- Lokal bazlı araç listeleme
- Broker sitesi özelliği (kendi araçlarınız + diğer firmaların araçları)

### Admin Panel - Filo Yönetim Sistemi

#### 1. Araçlar Modülü
- Araç ekleme/düzenleme/silme
- Detaylı araç bilgileri:
  - Marka, model, yıl, şanzıman
  - Satın alma tutarı
  - Hasar, boya, değişen kısımlar
  - Ekspertiz bilgileri
  - Ruhsat bilgileri (ruhsat no, şase no, motor no, renk)
- Araç fotoğrafları yükleme
- Son kilometre takibi
- Uzun/kısa dönem kiralama fiyatlandırması

#### 2. Kiralama Modülü
- Kiralama sözleşmesi oluşturma
- Birden fazla araç seçimi
- Cari seçimi/ekleme
- KDV hesaplama (%20 sabit)
- Vade günü belirleme ve otomatik gelir tarihi hesaplama
- Tahsilat yönetimi:
  - Nakit (kasa seçimi)
  - Kredi kartı (POS cihazı seçimi)
  - Banka transferi (banka seçimi)
- Tahsilat geçmişi takibi

#### 3. Cariler Modülü
- Cari ekleme/düzenleme
- Firma bilgileri (vergi no, unvan, iletişim, adres)
- Güncel borç/alacak durumu
- Cari ekstre takibi
- Otomatik ekstre işleme:
  - Kiralama sözleşmeleri → Borç
  - Tahsilatlar → Alacak
  - HGS geçişleri → Borç
  - Bakım/hasar maliyetleri → Borç

#### 4. HGS Geçişleri Modülü
- Plaka bazlı geçiş kayıtları
- Tarih aralığı ile geçiş ekleme
- Geçiş tutarları takibi
- Otomatik cari ekstre işleme

#### 5. Finansal Yönetim Modülü
- Kredi yönetimi:
  - Kredi ekleme
  - Taksit planı oluşturma
  - Ödeme takibi
- Takvim görünümü:
  - Gelirler (kiralama gelirleri otomatik eklenir)
  - Giderler
  - Kredi taksitleri
- Aylık/net gelir-gider analizi
- Gelir/gider ekleme

#### 6. Satış Sonrası Hizmetler Modülü
- Bakım/Onarım:
  - Periyodik bakım ve arıza kayıtları
  - Bakım detayları
  - Firma bilgileri
  - Kilometre takibi
  - Sonraki bakım kilometresi
  - Fiyat bilgisi
- Hasar Yönetimi:
  - Hasar kayıtları
  - Fotoğraf ekleme/görüntüleme
  - Onarım maliyeti
  - Firma bilgileri
- Muayene Takibi:
  - Muayene tarihleri
  - Sonuç takibi
  - Sonraki muayene tarihi

## Teknolojiler

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (hazırlanacak)

## Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL
- npm veya yarn

### Adımlar

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd CARFLEX.COM.TR
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Veritabanı bağlantısını yapılandırın:
`.env` dosyası oluşturun:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/carflex?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Veritabanı şemasını oluşturun:
```bash
npx prisma generate
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

6. Tarayıcıda açın:
```
http://localhost:3000
```

## Veritabanı Yapısı

Sistem aşağıdaki ana modelleri içerir:
- User (Kullanıcılar)
- Vehicle (Araçlar)
- Company (Cariler)
- Rental (Kiralama sözleşmeleri)
- Payment (Tahsilatlar)
- HGSPassage (HGS geçişleri)
- Credit (Krediler)
- Income (Gelirler)
- Expense (Giderler)
- Maintenance (Bakımlar)
- Damage (Hasarlar)
- Inspection (Muayeneler)
- AccountEntry (Cari ekstre kayıtları)

## API Endpoints

### Araçlar
- `GET /api/vehicles` - Tüm araçları listele
- `POST /api/vehicles` - Yeni araç ekle
- `GET /api/vehicles/[id]` - Araç detayı
- `PUT /api/vehicles/[id]` - Araç güncelle
- `DELETE /api/vehicles/[id]` - Araç sil

### Kiralamalar
- `GET /api/rentals` - Tüm kiralama sözleşmeleri
- `POST /api/rentals` - Yeni kiralama ekle
- `GET /api/rentals/[id]` - Kiralama detayı

### Cariler
- `GET /api/companies` - Tüm cariler
- `GET /api/companies/with-balance` - Cariler ve bakiyeleri
- `POST /api/companies` - Yeni cari ekle
- `GET /api/companies/[id]` - Cari detayı
- `GET /api/companies/[id]/account-entries` - Cari ekstre

### Tahsilatlar
- `POST /api/payments` - Yeni tahsilat ekle

### HGS
- `GET /api/hgs` - Tüm HGS geçişleri
- `POST /api/hgs` - Yeni geçiş ekle

### Finans
- `GET /api/finance/incomes` - Gelirler
- `POST /api/finance/incomes` - Gelir ekle
- `GET /api/finance/expenses` - Giderler
- `POST /api/finance/expenses` - Gider ekle
- `GET /api/finance/credits` - Krediler
- `POST /api/finance/credits` - Kredi ekle

### Satış Sonrası Hizmetler
- `GET /api/services/vehicle/[id]` - Araç servis geçmişi
- `POST /api/services/maintenance` - Bakım ekle
- `POST /api/services/damage` - Hasar ekle
- `POST /api/services/inspection` - Muayene ekle

## Geliştirme Notları

- Sistem şu anda authentication olmadan çalışmaktadır. Production için NextAuth.js entegrasyonu yapılmalıdır.
- Fotoğraf yükleme için bir dosya yükleme servisi (örn: Cloudinary, AWS S3) entegre edilmelidir.
- Banka, kasa ve POS cihazı yönetimi için API endpoint'leri eklenmelidir.

## Vercel'e Deployment

### Yöntem 1: Vercel CLI ile (Önerilen)

1. **Vercel CLI'yi kurun ve login olun:**
```bash
npx vercel login
```

2. **Production'a deploy edin:**
```bash
npx vercel --prod
```

3. **Domain ayarları:**
   - Vercel Dashboard > Settings > Domains
   - `carflex.com.tr` domain'ini ekleyin
   - DNS ayarlarını yapın (Vercel size gerekli DNS kayıtlarını gösterecek)

### Yöntem 2: GitHub + Vercel Web Interface

1. **Git repository oluşturun:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Vercel Dashboard'da:**
   - "New Project" butonuna tıklayın
   - GitHub repository'nizi seçin
   - Framework: Next.js
   - Build Command: `npx prisma generate && npm run build`
   - Install Command: `npm install`

3. **Environment Variables ekleyin:**
   - `DATABASE_URL` - Production veritabanı URL'iniz
   - **Not:** Production'da SQLite yerine PostgreSQL kullanmanız önerilir

4. **Domain ayarları:**
   - Settings > Domains
   - `carflex.com.tr` domain'ini ekleyin

### Önemli Notlar

- **Veritabanı:** Production'da SQLite yerine PostgreSQL veya başka bir veritabanı kullanın (Vercel'de SQLite dosya sistemi sorunları olabilir)
- **Prisma Client:** Build sırasında otomatik generate edilir (`npx prisma generate`)
- **Environment Variables:** `.env` dosyasındaki değerleri Vercel Dashboard'da Environment Variables olarak ekleyin

## Lisans

Bu proje özel bir projedir.
