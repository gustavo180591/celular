-- CreateEnum
CREATE TYPE "DeviceCondition" AS ENUM ('NEW', 'USED', 'REFURBISHED');

-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('IN_STOCK', 'SOLD', 'RESERVED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "DeviceColor" AS ENUM ('BLACK', 'WHITE', 'GOLD', 'SILVER', 'BLUE', 'RED', 'GREEN', 'OTHER');

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "imei" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" "DeviceColor" NOT NULL,
    "capacity" TEXT NOT NULL,
    "condition" "DeviceCondition" NOT NULL,
    "status" "DeviceStatus" NOT NULL DEFAULT 'IN_STOCK',
    "price" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "accessories" TEXT[],
    "notes" TEXT,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_imei_key" ON "Device"("imei");

-- CreateIndex
CREATE INDEX "Device_brand_model_idx" ON "Device"("brand", "model");

-- CreateIndex
CREATE INDEX "Device_status_idx" ON "Device"("status");

-- CreateIndex
CREATE INDEX "Device_createdAt_idx" ON "Device"("createdAt");
