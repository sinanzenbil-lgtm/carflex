#!/bin/bash

# CarFlex Vercel Otomatik Kurulum Scripti

echo "🚀 CarFlex Vercel Otomatik Kurulum Başlatılıyor..."
echo ""

# 1. Vercel CLI kontrolü
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI yükleniyor..."
    npm install -g vercel
fi

# 2. Login kontrolü
echo "🔐 Login durumu kontrol ediliyor..."
if ! npx vercel whoami &> /dev/null; then
    echo "⚠️  Login olunmamış. Browser açılacak..."
    echo "📝 Browser'da login olduktan sonra bu scripti tekrar çalıştırın."
    npx vercel login
    exit 0
fi

echo "✅ Login başarılı!"
echo ""

# 3. Proje link kontrolü
echo "🔗 Proje link durumu kontrol ediliyor..."
if [ ! -f .vercel/project.json ]; then
    echo "⚠️  Proje link edilmemiş. Link ediliyor..."
    npx vercel link
fi

echo "✅ Proje link edildi!"
echo ""

# 4. Environment variable kontrolü
echo "🌐 Environment Variables kontrol ediliyor..."
if ! npx vercel env ls | grep -q "DATABASE_URL"; then
    echo "⚠️  DATABASE_URL bulunamadı."
    echo ""
    echo "📋 Şimdi yapmanız gerekenler:"
    echo "1. Vercel Dashboard > Storage > Create Database > Postgres"
    echo "2. Database oluşturun ve connection string'i kopyalayın"
    echo "3. Şu komutu çalıştırın:"
    echo "   npx vercel env add DATABASE_URL"
    echo ""
    echo "Veya Vercel Dashboard'dan manuel ekleyin:"
    echo "   Settings > Environment Variables > Add New"
    exit 0
fi

echo "✅ DATABASE_URL bulundu!"
echo ""

# 5. Deploy
echo "🚀 Deploy başlatılıyor..."
npx vercel --prod

echo ""
echo "✅ Kurulum tamamlandı!"
