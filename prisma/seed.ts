import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 10; i++) {

    await prisma.product.create({
      data: {
        title: faker.commerce.productName(),
        price: Math.round(faker.number.float({ min: 20, max: 300})) - 0.01,
        imgSrc: "https://picsum.photos/200/300?random=" + faker.number.int({min: 1, max: 10})
      }
    });
  }
  await prisma.$disconnect();
}

main();
