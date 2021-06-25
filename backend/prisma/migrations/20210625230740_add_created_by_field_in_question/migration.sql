/*
  Warnings:

  - Added the required column `createdBy` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "maxVotes" INTEGER,
    "createdBy" TEXT NOT NULL
);
INSERT INTO "new_Question" ("expiresAt", "id", "maxVotes", "question") SELECT "expiresAt", "id", "maxVotes", "question" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question.id_unique" ON "Question"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
