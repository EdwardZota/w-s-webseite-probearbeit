-- CreateTable
CREATE TABLE "Joke" (
    "id" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Joke_id_key" ON "Joke"("id");
