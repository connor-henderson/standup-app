import prisma from '../lib/prismadb';

const main = async () => {
  try {
    // await createBuddha();
    console.log('no migrations');

    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
