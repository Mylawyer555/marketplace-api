-- CreateEnum
CREATE TYPE "store_status" AS ENUM ('ACTIVE', 'SUSPENDED', 'CLOSED');

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "status" "store_status" NOT NULL DEFAULT 'ACTIVE';
