/*
  Warnings:

  - Added the required column `userId` to the `Establishment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "QR" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "establishmentId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QR_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Establishment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Establishment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Establishment" ("address", "coordinates", "createdAt", "description", "id", "name", "phone") SELECT "address", "coordinates", "createdAt", "description", "id", "name", "phone" FROM "Establishment";
DROP TABLE "Establishment";
ALTER TABLE "new_Establishment" RENAME TO "Establishment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
