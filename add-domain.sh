#!/bin/bash

# CarFlex Domain Ekleme Scripti
# Bu script Vercel CLI ile domain eklemeyi dener

echo "🚀 CarFlex Domain Ekleme Başlatılıyor..."
echo ""

# Vercel CLI kontrolü
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI yükleniyor..."
    npm install -g vercel
fi

echo "🔐 Vercel'e login olmanız gerekiyor..."
echo "📝 Browser açılacak, lütfen login olun"
echo ""

# Vercel login (browser açılacak)
vercel login

echo ""
echo "✅ Login başarılı!"
echo ""

# Projeyi link et
echo "🔗 Proje link ediliyor..."
vercel link

echo ""
echo "🌐 Domain ekleniyor..."
vercel domains add carflex.com.tr

echo ""
echo "✅ Domain eklendi!"
echo ""
echo "📋 Şimdi DNS ayarlarını yapmanız gerekiyor:"
echo "1. Domain sağlayıcınıza gidin (Namecheap, GoDaddy, vb.)"
echo "2. DNS ayarlarına gidin"
echo "3. Vercel'in gösterdiği DNS kayıtlarını ekleyin"
echo ""
echo "🔍 DNS kayıtlarını kontrol etmek için:"
echo "   nslookup carflex.com.tr"
echo ""
