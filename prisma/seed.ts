import { PrismaClient } from "@prisma/client";
import { curriculumModules } from "../src/data.js";
import { COURSE_SLUG } from "../server/curriculum.js";

const prisma = new PrismaClient();

const moduleSlugs = [
  "market-basics",
  "lot-selection",
  "damage-evaluation",
  "max-bid-economics",
  "auction-bidding",
  "lot-transfer",
  "inspection-and-legal-check"
];

function materialType(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("видео") || lower.includes("video")) {
    return "video";
  }

  if (lower.includes("тест")) {
    return "test";
  }

  if (lower.includes("таблиц") || lower.includes("калькулятор")) {
    return "spreadsheet";
  }

  return "pdf";
}

function slugPart(value: string, index: number) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || `material-${index + 1}`;
}

async function main() {
  const course = await prisma.course.upsert({
    where: { slug: COURSE_SLUG },
    update: {
      title: "MIGTORG PRO",
      description: "Free automotive auction school with gated lessons and materials."
    },
    create: {
      slug: COURSE_SLUG,
      title: "MIGTORG PRO",
      description: "Free automotive auction school with gated lessons and materials."
    }
  });

  await prisma.module.deleteMany({ where: { courseId: course.id } });

  for (const [index, module] of curriculumModules.entries()) {
    const moduleSlug = moduleSlugs[index] ?? `module-${index + 1}`;
    const createdModule = await prisma.module.create({
      data: {
        courseId: course.id,
        position: index + 1,
        slug: moduleSlug,
        routeLabel: module.routeLabel,
        title: module.title,
        description: module.description,
        result: module.result,
        lessons: {
          create: {
            position: 1,
            slug: "lesson-1",
            title: module.title,
            description: module.description,
            duration: 18 + index * 3,
            videoObjectKey: `videos/${moduleSlug}/lesson-1.mp4`
          }
        }
      },
      include: { lessons: true }
    });

    const lesson = createdModule.lessons[0];

    await prisma.material.createMany({
      data: module.materials.map((material, materialIndex) => ({
        lessonId: lesson.id,
        title: material,
        type: materialType(material),
        objectKey: `materials/${moduleSlug}/${slugPart(material, materialIndex)}.pdf`
      }))
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
