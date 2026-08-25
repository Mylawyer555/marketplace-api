-- CreateEnum
CREATE TYPE "account_status" AS ENUM ('ACTIVE', 'DEACTIVATED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "account_status" "account_status" NOT NULL DEFAULT 'ACTIVE';
