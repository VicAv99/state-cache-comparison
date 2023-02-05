import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import { movies } from '../seed/movies';
import { tunes } from '../seed/tunes';

const prisma = new PrismaClient();

const users = Array.from({ length: 5 }, () => ({
  email: faker.internet.email(),
  name: faker.name.fullName(),
}));

async function main() {
  await prisma.user.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.tune.deleteMany();

  for (const data of movies) {
    await prisma.movie.create({ data });
  }
  for (const data of tunes) {
    await prisma.tune.create({ data });
  }
  for (const data of users) {
    await prisma.user.create({ data });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
