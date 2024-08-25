-- CreateTable
CREATE TABLE `client_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `clientName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `companyImage` VARCHAR(191) NULL,
    `position` VARCHAR(191) NOT NULL,
    `contractNumber` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `insuranceNumber` VARCHAR(191) NOT NULL,
    `requestDate` DATETIME(3) NOT NULL,
    `status` ENUM('Waiting', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Waiting',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
