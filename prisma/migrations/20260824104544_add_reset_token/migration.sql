-- CreateTable
CREATE TABLE "reset_token" (
    "reset_token_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_token_pkey" PRIMARY KEY ("reset_token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_token_token_hash_key" ON "reset_token"("token_hash");

-- CreateIndex
CREATE INDEX "reset_token_user_id_idx" ON "reset_token"("user_id");

-- AddForeignKey
ALTER TABLE "reset_token" ADD CONSTRAINT "reset_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
