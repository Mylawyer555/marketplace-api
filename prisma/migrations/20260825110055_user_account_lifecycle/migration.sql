-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deactivated_at" TIMESTAMP(3),
ADD COLUMN     "deletion_at" TIMESTAMP(3);
