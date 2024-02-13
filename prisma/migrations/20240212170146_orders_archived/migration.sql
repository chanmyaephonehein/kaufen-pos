-- AlterTable
ALTER TABLE "Orderlines" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
