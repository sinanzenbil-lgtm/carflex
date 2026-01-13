import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'sinanzenbil@gmail.com'
  const newPassword = '123456' // Yeni şifre - istediğiniz şifreyi buraya yazabilirsiniz
  
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  console.log('Yeni şifre hash:', hashedPassword)

  // Kullanıcıyı bul
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    // Şifreyi güncelle
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    })
    console.log('✅ Şifre başarıyla güncellendi!')
    console.log('Email:', email)
    console.log('Yeni Şifre:', newPassword)
  } else {
    console.log('❌ Bu email adresi ile kullanıcı bulunamadı!')
    console.log('Kullanıcı oluşturuluyor...')
    
    // Yeni kullanıcı oluştur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Sinan',
        role: 'user',
      },
    })
    console.log('✅ Yeni kullanıcı oluşturuldu!')
    console.log('Email:', newUser.email)
    console.log('Yeni Şifre:', newPassword)
  }

  // Test: Şifreyi doğrula
  const testUser = await prisma.user.findUnique({
    where: { email },
  })
  
  if (testUser) {
    const isValid = await bcrypt.compare(newPassword, testUser.password)
    console.log('Şifre doğrulama testi:', isValid ? '✅ BAŞARILI' : '❌ BAŞARISIZ')
    console.log('Email:', testUser.email)
    console.log('Role:', testUser.role)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
