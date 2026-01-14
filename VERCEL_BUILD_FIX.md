# Vercel Build Hataları ve Çözümleri

## Yaygın Hatalar ve Çözümleri

### 1. Prisma Generate Hatası

**Hata:**
```
Error: Can't find schema.prisma
```

**Çözüm:**
- `vercel.json`'da build command doğru olmalı:
  ```json
  {
    "buildCommand": "npx prisma generate && npm run build"
  }
  ```

### 2. DATABASE_URL Hatası

**Hata:**
```
Environment variable not found: DATABASE_URL
```

**Çözüm:**
- Vercel Dashboard > Settings > Environment Variables
- `DATABASE_URL` ekleyin
- Production veritabanı URL'inizi yapıştırın

### 3. Node Version Hatası

**Hata:**
```
Error: Node version mismatch
```

**Çözüm:**
- Vercel Dashboard > Settings > General
- Node.js Version: `20.x` seçin

### 4. Build Timeout

**Hata:**
```
Build exceeded maximum time
```

**Çözüm:**
- `vercel.json`'da build command'ı optimize edin
- Gereksiz bağımlılıkları kaldırın

### 5. TypeScript Hatası

**Hata:**
```
Type error: Property 'xxx' does not exist
```

**Çözüm:**
- Local'de `npm run build` çalıştırın
- Hataları düzeltin
- Tekrar deploy edin

## Build Command Kontrolü

Vercel'de Build Command şöyle olmalı:
```
npx prisma generate && npm run build
```

## Environment Variables

Vercel Dashboard'da şunları ekleyin:
- `DATABASE_URL` - Production veritabanı URL'i

## Hata Mesajını Paylaşın

Lütfen Vercel build loglarındaki tam hata mesajını paylaşın, böylece spesifik çözümü sunabilirim.
