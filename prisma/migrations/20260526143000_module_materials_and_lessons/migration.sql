ALTER TABLE "Material" ADD COLUMN "moduleId" TEXT;
ALTER TABLE "Material" ADD COLUMN "position" INTEGER;

UPDATE "Material" AS material
SET "moduleId" = lesson."moduleId"
FROM "Lesson" AS lesson
WHERE material."lessonId" = lesson."id";

WITH ordered_materials AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (PARTITION BY "moduleId" ORDER BY "createdAt", "id") AS "position"
  FROM "Material"
)
UPDATE "Material" AS material
SET "position" = ordered_materials."position"
FROM ordered_materials
WHERE material."id" = ordered_materials."id";

ALTER TABLE "Material" ALTER COLUMN "moduleId" SET NOT NULL;
ALTER TABLE "Material" ALTER COLUMN "position" SET NOT NULL;

ALTER TABLE "Material" DROP CONSTRAINT "Material_lessonId_fkey";
ALTER TABLE "Material" DROP COLUMN "lessonId";

CREATE UNIQUE INDEX "Material_moduleId_position_key" ON "Material"("moduleId", "position");

ALTER TABLE "Material" ADD CONSTRAINT "Material_moduleId_fkey"
FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
