import { PrismaClient } from "@prisma/client";
import { moduleRouteSlugs } from "../src/course.js";
import { learningCurriculumModules } from "../src/learningCurriculum.js";
import { COURSE_SLUG } from "../server/curriculum.js";

const prisma = new PrismaClient();

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

function materialExtension(title: string) {
  return materialType(title) === "video" ? "mp4" : "pdf";
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

  for (const [index, module] of learningCurriculumModules.entries()) {
    const moduleSlug = moduleRouteSlugs[index] ?? `module-${index + 1}`;
    await prisma.module.create({
      data: {
        courseId: course.id,
        position: index + 1,
        slug: moduleSlug,
        routeLabel: module.routeLabel,
        title: module.title,
        description: module.description,
        result: module.result,
        lessons: {
          create: module.lessons.map((lesson, lessonIndex) => ({
            position: lessonIndex + 1,
            slug: `lesson-${lessonIndex + 1}`,
            title: lesson.title,
            description: lesson.description,
            duration: null,
            videoObjectKey: `videos/${moduleSlug}/lesson-${lessonIndex + 1}.mp4`
          }))
        },
        materials: {
          create: module.materials.map((material, materialIndex) => ({
            position: materialIndex + 1,
            title: material,
            type: materialType(material),
            objectKey: `materials/${moduleSlug}/${slugPart(material, materialIndex)}.${materialExtension(material)}`
          }))
        }
      }
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
