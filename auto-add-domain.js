#!/usr/bin/env node

/**
 * CarFlex Domain Otomatik Ekleme Scripti
 * Bu script Vercel CLI kullanarak domain ekler
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 CarFlex Domain Ekleme Başlatılıyor...\n');

// 1. Vercel CLI kontrolü
try {
  console.log('📦 Vercel CLI kontrol ediliyor...');
  execSync('npx vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI bulundu\n');
} catch (error) {
  console.log('❌ Vercel CLI bulunamadı, yükleniyor...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

// 2. Login kontrolü
console.log('🔐 Login durumu kontrol ediliyor...');
try {
  const whoami = execSync('npx vercel whoami', { encoding: 'utf-8' });
  console.log(`✅ Zaten login olunmuş: ${whoami.trim()}\n`);
} catch (error) {
  console.log('⚠️  Login olunmamış. Browser açılacak, lütfen login olun...\n');
  console.log('📝 Browser\'da login olduktan sonra ENTER\'a basın...');
  
  execSync('npx vercel login', { stdio: 'inherit' });
  
  rl.question('Login tamamlandı mı? (ENTER)', () => {
    rl.close();
    continueProcess();
  });
  return;
}

continueProcess();

function continueProcess() {
  // 3. Proje link kontrolü
  console.log('\n🔗 Proje link durumu kontrol ediliyor...');
  try {
    const projectInfo = execSync('npx vercel ls', { encoding: 'utf-8' });
    console.log('✅ Projeler bulundu\n');
  } catch (error) {
    console.log('⚠️  Proje link edilmemiş, link ediliyor...\n');
    execSync('npx vercel link', { stdio: 'inherit' });
  }

  // 4. Domain ekleme
  console.log('\n🌐 Domain ekleniyor: carflex.com.tr...\n');
  try {
    execSync('npx vercel domains add carflex.com.tr', { stdio: 'inherit' });
    console.log('\n✅ Domain başarıyla eklendi!\n');
    console.log('📋 Şimdi DNS ayarlarını yapmanız gerekiyor:');
    console.log('1. Domain sağlayıcınıza gidin (Namecheap, GoDaddy, vb.)');
    console.log('2. DNS ayarlarına gidin');
    console.log('3. Vercel\'in gösterdiği DNS kayıtlarını ekleyin\n');
  } catch (error) {
    console.log('\n❌ Domain eklenirken hata oluştu:');
    console.log(error.message);
    console.log('\n💡 Alternatif: Vercel Dashboard\'dan manuel ekleyin:');
    console.log('   https://vercel.com/dashboard > Projeniz > Settings > Domains\n');
  }
}
