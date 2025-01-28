-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseTitle` VARCHAR(255) NOT NULL,
    `courseDescription` VARCHAR(191) NOT NULL,
    `courseDuration` INTEGER NOT NULL,
    `courseOutcome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
