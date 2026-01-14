#!/bin/bash

# GitHub'a push etmek için script
# Kullanım: ./PUSH_TO_GITHUB.sh

echo "GitHub'a push ediliyor..."
echo ""

# Remote URL'i HTTPS olarak ayarla
git remote set-url origin https://github.com/sinanzenbil-lgtm/carflex.git

# Push yap (kullanıcı adı ve token isteyecek)
git push -u origin main

echo ""
echo "✅ Push tamamlandı!"
