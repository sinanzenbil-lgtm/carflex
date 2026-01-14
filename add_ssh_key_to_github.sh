#!/bin/bash

# GitHub'a SSH key eklemek için script
# Kullanım: ./add_ssh_key_to_github.sh YOUR_GITHUB_TOKEN

PUBLIC_KEY=$(cat ~/.ssh/id_ed25519_github.pub)
KEY_TITLE="CarFlex MacBook $(date +%Y-%m-%d)"

echo "SSH Key:"
echo "$PUBLIC_KEY"
echo ""
echo "GitHub'a eklemek için:"
echo "1. https://github.com/settings/tokens adresine gidin"
echo "2. 'Generate new token (classic)' butonuna tıklayın"
echo "3. 'admin:public_key' scope'unu seçin"
echo "4. Token'ı kopyalayın"
echo "5. Şu komutu çalıştırın:"
echo ""
echo "curl -X POST -H 'Authorization: token YOUR_TOKEN' -H 'Accept: application/vnd.github.v3+json' https://api.github.com/user/keys -d '{\"title\":\"$KEY_TITLE\",\"key\":\"$PUBLIC_KEY\"}'"
echo ""
echo "VEYA manuel olarak:"
echo "1. https://github.com/settings/keys adresine gidin"
echo "2. 'New SSH key' butonuna tıklayın"
echo "3. Title: $KEY_TITLE"
echo "4. Key: $PUBLIC_KEY"
echo "5. 'Add SSH key' butonuna tıklayın"
