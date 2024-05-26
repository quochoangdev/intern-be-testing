/*
  Warnings:

  - You are about to drop the column `siteId` on the `posts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "tags" TEXT,
    "author" TEXT,
    "is_active" BOOLEAN DEFAULT false,
    "category_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" TEXT,
    "updated_at" DATETIME,
    "updated_by_id" TEXT,
    CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("author", "category_id", "content", "created_at", "created_by_id", "excerpt", "id", "is_active", "slug", "tags", "title", "updated_at", "updated_by_id") SELECT "author", "category_id", "content", "created_at", "created_by_id", "excerpt", "id", "is_active", "slug", "tags", "title", "updated_at", "updated_by_id" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");
CREATE INDEX "posts_author_idx" ON "posts"("author");
CREATE INDEX "posts_category_id_idx" ON "posts"("category_id");
CREATE INDEX "posts_created_by_id_idx" ON "posts"("created_by_id");
CREATE INDEX "posts_updated_by_id_idx" ON "posts"("updated_by_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
