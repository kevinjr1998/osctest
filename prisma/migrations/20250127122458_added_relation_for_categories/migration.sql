-- AlterTable
ALTER TABLE `courses` ADD COLUMN `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
