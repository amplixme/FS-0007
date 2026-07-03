import prisma from '../src/repository/Prisma/prisma.db.js';

const categories = ['Tecnologia', 'Disenio', 'Programacion', 'DevOps', 'Opinion'];

const toSlug = (str) =>
    str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // saca tildes
        .replace(/\s+/g, '-');

async function main() {
    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name, slug: toSlug(name) },
        });
    }
    console.log('Categorías creadas ✅');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });