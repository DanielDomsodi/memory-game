import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import { emojisData } from '../data/emojis';
import { emojiCategoriesData } from '../data/emoji-categories';

async function main() {
  const emojiCategories = await prisma.emojiCategory.createMany({
    data: emojiCategoriesData,
  });

  const emojis = await prisma.emoji.createMany({
    data: emojisData,
  });

  // const testUser = await prisma.user.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // });
  console.log({ emojis, emojiCategories });
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
