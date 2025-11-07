import { PrismaClient, DeviceCondition, DeviceStatus, DeviceColor } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.device.deleteMany({});

  // Create sample devices
  const devices = [
    {
      imei: '123456789012345',
      brand: 'Samsung',
      model: 'Galaxy S21',
      color: DeviceColor.BLACK,
      capacity: '128GB',
      condition: DeviceCondition.USED,
      status: DeviceStatus.IN_STOCK,
      price: 450.00,
      cost: 350.00,
      images: [
        'https://images.samsung.com/ar/smartphones/galaxy-s21-5g/images/galaxy-s21-feature-mo-720x720.jpg',
      ],
      accessories: ['Cargador', 'Funda'],
      hasOriginalBox: true,
      isDualSim: true,
      isUnlocked: true,
      cosmeticGrade: 8,
      notes: 'Excelente estado, pantalla sin rayones',
    },
    {
      imei: '234567890123456',
      brand: 'iPhone',
      model: '13 Pro',
      color: DeviceColor.SILVER,
      capacity: '256GB',
      condition: DeviceCondition.REFURBISHED,
      status: DeviceStatus.IN_STOCK,
      price: 750.00,
      cost: 600.00,
      images: [
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero',
      ],
      accessories: ['Cable USB-C', 'Caja original'],
      hasOriginalBox: true,
      isDualSim: false,
      isUnlocked: true,
      cosmeticGrade: 9,
      notes: 'Reacondicionado con garantía',
    },
    {
      imei: '345678901234567',
      brand: 'Xiaomi',
      model: 'Redmi Note 11',
      color: DeviceColor.BLUE,
      capacity: '64GB',
      condition: DeviceCondition.NEW,
      status: DeviceStatus.IN_STOCK,
      price: 320.00,
      cost: 250.00,
      images: [
        'https://i01.appmifile.com/webfile/globalimg/products/pc/redmi-note-11/section01.jpg',
      ],
      accessories: ['Cargador rápido', 'Auriculares', 'Funda'],
      hasOriginalBox: true,
      isDualSim: true,
      isUnlocked: true,
      cosmeticGrade: 10,
      notes: 'Nuevo sellado',
    },
  ];

  for (const device of devices) {
    await prisma.device.create({
      data: device,
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
