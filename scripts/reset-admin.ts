import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@carflex.com'
  const password = 'admin123'
  
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log('Hashed password:', hashedPassword)

  // Mevcut admin'i bul veya oluştur
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    // Şifreyi güncelle
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        role: 'super_admin',
      },
    })
    console.log('Admin şifresi güncellendi!')
  } else {
    // Yeni admin oluştur
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin',
        companyName: 'CarFlex Admin',
        role: 'super_admin',
      },
    })
    console.log('Yeni admin kullanıcısı oluşturuldu!')
  }

  // Test: Şifreyi doğrula
  const testUser = await prisma.user.findUnique({
    where: { email },
  })
  
  if (testUser) {
    const isValid = await bcrypt.compare(password, testUser.password)
    console.log('Şifre doğrulama testi:', isValid ? 'BAŞARILI' : 'BAŞARISIZ')
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
