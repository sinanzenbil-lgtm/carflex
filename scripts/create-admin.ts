import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@carflex.com'
  const password = 'admin123' // Değiştirmeyi unutmayın!
  
  const hashedPassword = await bcrypt.hash(password, 10)

  // Mevcut admin'i kontrol et
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  })

  if (existingAdmin) {
    console.log('Admin kullanıcısı zaten mevcut!')
    return
  }

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Admin',
      companyName: 'CarFlex Admin',
      role: 'super_admin',
    },
  })

  console.log('Super admin kullanıcısı oluşturuldu!')
  console.log('Email:', email)
  console.log('Şifre:', password)
  console.log('⚠️  Lütfen şifreyi değiştirmeyi unutmayın!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
