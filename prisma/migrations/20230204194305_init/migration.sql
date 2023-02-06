-- CreateTable
CREATE TABLE "emoji_categories" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "emoji_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emojis" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "categoryId" SMALLINT NOT NULL,

    CONSTRAINT "emojis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emoji_categories_id_key" ON "emoji_categories"("id");

-- AddForeignKey
ALTER TABLE "emojis" ADD CONSTRAINT "emojis_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "emoji_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
