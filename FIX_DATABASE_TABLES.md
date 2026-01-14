# 🔧 Database Tablolarını Oluşturma

## Sorun
`PrismaClientKnownRequestError` hatası alıyorsun. Bu, database'de tabloların olmadığını gösteriyor.

## ✅ Çözüm: Prisma Schema'yı Database'e Push Et

### Yöntem 1: Vercel CLI ile (Önerilen)

1. **Vercel CLI'ye login ol:**
   ```bash
   npx vercel login
   ```

2. **Projeyi link et:**
   ```bash
   npx vercel link
   ```

3. **Database'e schema push et:**
   ```bash
   npx vercel env pull .env.local
   npx prisma db push --skip-generate
   ```

### Yöntem 2: Local'den Push Et (DATABASE_URL ile)

1. **Local .env dosyasına DATABASE_URL ekle:**
   ```bash
   echo 'DATABASE_URL="postgresql://neondb_owner:npg_8rZcxI2NPAVv@ep-divine-poetry-ah52jl18-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"' >> .env.local
   ```

2. **Schema'yı push et:**
   ```bash
   npx prisma db push
   ```

3. **Prisma Client'ı generate et:**
   ```bash
   npx prisma generate
   ```

### Yöntem 3: Migration Oluştur (Daha İyi - Production için)

1. **Migration oluştur:**
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Vercel'de migration çalıştır:**
   ```bash
   npx vercel env pull .env.local
   npx prisma migrate deploy
   ```

## 🚀 Hızlı Çözüm (En Kolay)

Local'de şunu çalıştır:

```bash
# 1. .env.local dosyası oluştur
echo 'DATABASE_URL="postgresql://neondb_owner:npg_8rZcxI2NPAVv@ep-divine-poetry-ah52jl18-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"' > .env.local

# 2. Schema'yı push et
npx prisma db push

# 3. Prisma Client generate et
npx prisma generate
```

Bu komutlar database'de tüm tabloları oluşturacak.

## ✅ Kontrol

Tablolar oluşturulduktan sonra:
- ✅ Site çalışmalı
- ✅ "Error fetching companies" hatası düzelmeli
- ✅ Database'de tablolar görünmeli
