import bcrypt from "bcrypt";
import prisma from "../src/repository/Prisma/prisma.db.js";

const DEMO_PASSWORD = "Demo1234!";

const demoUsers = [
  {
    email: "admin.demo@amplixme.com",
    name: "Admin Demo",
    role: "ADMIN",
  },
  {
    email: "valentina.dev@amplixme.com",
    name: "Valentina Torres",
    role: "USER",
  },
  {
    email: "martin.backend@amplixme.com",
    name: "Martín Suárez",
    role: "USER",
  },
  {
    email: "camila.cloud@amplixme.com",
    name: "Camila Rivas",
    role: "USER",
  },
];

const demoCategories = [
  { name: "Tecnología", slug: "tecnologia" },
  { name: "Programación", slug: "programacion" },
  { name: "DevOps", slug: "devops" },
  { name: "Carrera IT", slug: "carrera-it" },
  { name: "Buenas prácticas", slug: "buenas-practicas" },
];

const demoPosts = [
  {
    title: "Cómo empezar a aprender programación sin perderse",
    content:
      "Aprender programación puede sentirse enorme al principio. Una buena forma de avanzar es elegir un lenguaje, practicar con proyectos pequeños y documentar lo que se aprende. No hace falta saber todo antes de empezar: construir, equivocarse y corregir es parte del proceso.",
    authorEmail: "valentina.dev@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    categories: ["programacion", "carrera-it"],
  },
  {
    title: "Por qué Git es clave para trabajar en equipo",
    content:
      "Git no es solo una herramienta para guardar cambios. También permite colaborar, revisar código, crear ramas por tarea y mantener un historial claro del proyecto. Entender commits, branches y pull requests ayuda a trabajar de forma más ordenada.",
    authorEmail: "martin.backend@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200",
    categories: ["programacion", "buenas-practicas"],
  },
  {
    title: "Primeros pasos con APIs REST",
    content:
      "Una API REST permite que el frontend y el backend se comuniquen mediante endpoints. Para empezar conviene entender métodos como GET, POST, PUT y DELETE, además de conceptos como rutas, controladores, servicios y respuestas HTTP.",
    authorEmail: "martin.backend@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    categories: ["programacion", "tecnologia"],
  },
  {
    title: "Qué mirar antes de hacer deploy de una aplicación",
    content:
      "Antes de publicar una aplicación conviene revisar variables de entorno, conexión a base de datos, logs, manejo de errores y configuración de CORS. Un deploy exitoso no depende solo de que el código funcione localmente.",
    authorEmail: "camila.cloud@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    categories: ["devops", "buenas-practicas"],
  },
  {
    title: "La importancia de escribir código legible",
    content:
      "El código se lee muchas más veces de las que se escribe. Usar nombres claros, funciones pequeñas y una estructura consistente facilita el mantenimiento y ayuda a que otras personas entiendan rápidamente qué hace cada parte.",
    authorEmail: "valentina.dev@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200",
    categories: ["programacion", "buenas-practicas"],
  },
  {
    title: "Cómo preparar tu primer portfolio developer",
    content:
      "Un portfolio no necesita ser enorme para ser útil. Lo importante es mostrar proyectos reales, explicar qué problema resuelve cada uno, qué tecnologías se usaron y qué decisiones técnicas se tomaron durante el desarrollo.",
    authorEmail: "valentina.dev@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    categories: ["carrera-it", "tecnologia"],
  },
  {
    title: "Bases de datos relacionales explicadas simple",
    content:
      "Una base relacional organiza información en tablas conectadas por relaciones. Conceptos como claves primarias, claves foráneas e índices son fundamentales para diseñar sistemas que puedan crecer sin perder consistencia.",
    authorEmail: "martin.backend@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200",
    categories: ["programacion", "buenas-practicas"],
  },
  {
    title: "Docker para entornos de desarrollo",
    content:
      "Docker ayuda a ejecutar servicios como bases de datos o aplicaciones completas sin depender tanto de la configuración local de cada computadora. Esto mejora la consistencia entre integrantes del equipo y reduce errores de entorno.",
    authorEmail: "camila.cloud@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200",
    categories: ["devops", "tecnologia"],
  },
  {
    title: "Qué es una migración de base de datos",
    content:
      "Una migración registra cambios en el esquema de la base de datos, como crear tablas o agregar columnas. Usarlas correctamente permite versionar la estructura de datos junto con el código de la aplicación.",
    authorEmail: "martin.backend@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    categories: ["programacion", "devops"],
  },
  {
    title: "Cómo mejorar una pull request",
    content:
      "Una buena pull request explica qué cambia, por qué se hizo y cómo probarlo. También conviene mantenerla chica, incluir capturas si hay cambios visuales y responder los comentarios de review con claridad.",
    authorEmail: "valentina.dev@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    categories: ["buenas-practicas", "carrera-it"],
  },
  {
    title: "Errores comunes al consumir una API desde React",
    content:
      "Al consumir una API desde React suelen aparecer problemas con estados de carga, errores no manejados o respuestas con estructuras inesperadas. Separar la lógica en services ayuda a mantener los componentes más simples.",
    authorEmail: "valentina.dev@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200",
    categories: ["programacion", "tecnologia"],
  },
  {
    title: "Qué aprender después de JavaScript",
    content:
      "Después de JavaScript puede ser útil profundizar en TypeScript, testing, bases de datos y arquitectura. Más que saltar de tecnología en tecnología, conviene construir proyectos que obliguen a integrar varias herramientas.",
    authorEmail: "camila.cloud@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    categories: ["carrera-it", "programacion"],
  },
  {
    title: "Introducción a CI/CD",
    content:
      "CI/CD permite automatizar pruebas, builds y despliegues. Aunque al principio parezca avanzado, configurar un pipeline simple ayuda a detectar errores antes y mejora la confianza al integrar cambios al proyecto.",
    authorEmail: "camila.cloud@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    categories: ["devops", "buenas-practicas"],
  },
  {
    title: "Cómo estudiar tecnología sin quemarse",
    content:
      "Estudiar tecnología requiere constancia, pero también descanso. Armar un plan realista, alternar teoría con práctica y celebrar avances pequeños ayuda a sostener el aprendizaje en el tiempo.",
    authorEmail: "admin.demo@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200",
    categories: ["carrera-it", "tecnologia"],
  },
  {
    title: "Testing básico para ganar confianza",
    content:
      "Los tests ayudan a comprobar que una funcionalidad sigue funcionando después de modificar el código. Empezar con casos simples sobre funciones o servicios permite incorporar el hábito sin complicarse demasiado.",
    authorEmail: "martin.backend@amplixme.com",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200",
    categories: ["programacion", "buenas-practicas"],
  },
];

const demoComments = [
  "Muy buen aporte, me sirvió para ordenar conceptos.",
  "Me gustó que esté explicado con ejemplos simples.",
  "Este tema aparece mucho en proyectos reales.",
  "Lo guardo para repasarlo después.",
  "Me parece clave para quienes recién empiezan.",
  "Buenísimo, justo estaba investigando sobre esto.",
  "La parte de buenas prácticas me pareció muy útil.",
  "Me gustaría ver una segunda parte con más ejemplos.",
  "Gracias por compartirlo, está claro y directo.",
  "Esto ayuda mucho a entender el flujo completo.",
  "Interesante enfoque para aplicar en equipo.",
  "Me pasó algo parecido trabajando en un proyecto.",
  "Creo que este contenido suma mucho para practicar.",
  "Muy buena explicación, sin vueltas.",
  "Este tipo de posts motivan a seguir aprendiendo.",
  "Me sirve para mejorar mi forma de organizar tareas.",
  "Excelente resumen para tener como referencia.",
  "La explicación es simple pero completa.",
  "Me gustaría probarlo en mi próximo proyecto.",
  "Buen punto lo de documentar las decisiones.",
  "Esto también ayuda a preparar entrevistas técnicas.",
  "Me pareció muy realista el ejemplo.",
  "Gran recomendación para quienes están armando portfolio.",
  "Está bueno ver contenido en español sobre estos temas.",
  "Me ayudó a entender por qué esto es importante.",
  "Lo voy a compartir con mi equipo.",
  "Muy aplicable a proyectos de pasantía.",
  "Me encantó la forma en que está estructurado.",
  "Sirve para conectar teoría con práctica.",
  "Clarísimo, gracias por el aporte.",
];

const demoEmails = demoUsers.map((user) => user.email);
const demoSlugs = demoCategories.map((category) => category.slug);
const demoTitles = demoPosts.map((post) => post.title);

async function cleanDemoData() {
  await prisma.comment.deleteMany({
    where: {
      OR: [
        {
          author: {
            is: {
              email: {
                in: demoEmails,
              },
            },
          },
        },
        {
          post: {
            is: {
              title: {
                in: demoTitles,
              },
            },
          },
        },
      ],
    },
  });

  await prisma.post.deleteMany({
    where: {
      OR: [
        {
          title: {
            in: demoTitles,
          },
        },
        {
          author: {
            is: {
              email: {
                in: demoEmails,
              },
            },
          },
        },
      ],
    },
  });

  await prisma.user.deleteMany({
    where: {
      email: {
        in: demoEmails,
      },
    },
  });
}

async function createUsers() {
  const password = await bcrypt.hash(DEMO_PASSWORD, 10);

  const users = {};

  for (const user of demoUsers) {
    users[user.email] = await prisma.user.create({
      data: {
        email: user.email,
        password,
        role: user.role,
        name: user.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  return users;
}

async function createCategories() {
  const categories = {};

  for (const category of demoCategories) {
    categories[category.slug] = await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
      },
      create: {
        name: category.name,
        slug: category.slug,
      },
    });
  }

  return categories;
}

async function createPosts() {
  const posts = [];

  for (const post of demoPosts) {
    const createdPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: true,
        coverImage: post.coverImage,
        author: {
          connect: {
            email: post.authorEmail,
          },
        },
        categories: {
          connect: post.categories.map((slug) => ({ slug })),
        },
      },
    });

    posts.push(createdPost);
  }

  return posts;
}

async function createComments(posts) {
  const normalUsers = demoUsers.filter((user) => user.role === "USER");

  for (let index = 0; index < demoComments.length; index++) {
    const post = posts[index % posts.length];
    const author = normalUsers[index % normalUsers.length];

    await prisma.comment.create({
      data: {
        content: demoComments[index],
        post: {
          connect: {
            id: post.id,
          },
        },
        author: {
          connect: {
            email: author.email,
          },
        },
      },
    });
  }
}

async function main() {
  console.log("Limpiando datos demo...");
  await cleanDemoData();

  console.log("Creando usuarios demo...");
  await createUsers();

  console.log("Creando categorías demo...");
  await createCategories();

  console.log("Creando posts demo...");
  const posts = await createPosts();

  console.log("Creando comentarios demo...");
  await createComments(posts);

  console.log("Seed completado ✅");
  console.log(`Usuarios: ${demoUsers.length}`);
  console.log(`Categorías: ${demoCategories.length}`);
  console.log(`Posts: ${demoPosts.length}`);
  console.log(`Comentarios: ${demoComments.length}`);
  console.log(`Password demo para todos los usuarios: ${DEMO_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error("Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });