# Vercel Database URL Ayarları

## Production Veritabanı Seçenekleri

### Seçenek 1: Vercel Postgres (Önerilen - En Kolay)

1. **Vercel Dashboard'da:**
   - Projeniz > Storage > Create Database
   - "Postgres" seçin
   - Database adını girin (örn: `carflex-db`)
   - "Create" butonuna tıklayın

2. **Connection String'i Kopyalayın:**
   - Database sayfasında "Connection String" bölümüne gidin
   - "Copy" butonuna tıklayın
   - Bu string şu formatta olacak:
     ```
     postgres://default:xxxxx@xxxxx.vercel-storage.com:5432/verceldb
     ```

3. **Environment Variable'a Yapıştırın:**
   - Deployment sayfasındaki DATABASE_URL value alanına yapıştırın

### Seçenek 2: Başka Bir PostgreSQL Servisi

Eğer başka bir PostgreSQL servisi kullanıyorsanız (Supabase, Railway, Neon, vb.):

**Format:**
```
postgresql://username:password@host:port/database?schema=public
```

**Örnek:**
```
postgresql://user:password@db.example.com:5432/carflex?schema=public
```

### Seçenek 3: Geçici Olarak Boş Bırakın (Sonra Ekleyebilirsiniz)

Şimdilik boş bırakıp deploy edebilirsiniz, sonra Vercel Dashboard > Settings > Environment Variables'dan ekleyebilirsiniz.

**Ancak:** İlk deploy'da veritabanı bağlantısı olmadan çalışmayabilir. En iyisi önce veritabanı oluşturup connection string'i eklemek.

## Önerilen: Vercel Postgres

Vercel Postgres kullanmanızı öneririm çünkü:
- ✅ Vercel ile entegre
- ✅ Kolay kurulum
- ✅ Ücretsiz tier mevcut
- ✅ Otomatik yedekleme

## Adımlar

1. **Vercel Dashboard'da yeni bir tab açın:**
   - https://vercel.com/dashboard
   - Storage > Create Database > Postgres

2. **Database oluşturun ve connection string'i kopyalayın**

3. **Deployment sayfasına dönün ve DATABASE_URL'e yapıştırın**

4. **"Deploy" butonuna tıklayın**
