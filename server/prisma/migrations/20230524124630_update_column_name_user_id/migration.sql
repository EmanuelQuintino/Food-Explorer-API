/*
  Warnings:

  - You are about to drop the column `users_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "code" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("code", "created_at", "id", "status", "updated_at") SELECT "code", "created_at", "id", "status", "updated_at" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
