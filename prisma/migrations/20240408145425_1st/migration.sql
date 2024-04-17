-- CreateEnum
CREATE TYPE "stayType" AS ENUM ('home', 'apartment', 'hotel', 'guestHouses', 'homeStay', 'vacationHomes', 'hostel', 'bedAndBreakfasts', 'villa', 'boat', 'luxuryTent', 'capsuleHotel', 'studentAccommodations', 'farmStay', 'chalet');

-- CreateEnum
CREATE TYPE "bedType" AS ENUM ('twin', 'double');

-- CreateTable
CREATE TABLE "Stay" (
    "id" SERIAL NOT NULL,
    "type" "stayType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "imageCover" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "fromCityCenter" DOUBLE PRECISION NOT NULL,
    "freeCancellation" BOOLEAN NOT NULL DEFAULT false,
    "bookWithoutCreditCard" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facilities" (
    "id" SERIAL NOT NULL,
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "nonSmokingRooms" BOOLEAN NOT NULL DEFAULT false,
    "freeWiFi" BOOLEAN NOT NULL DEFAULT false,
    "familyRooms" BOOLEAN NOT NULL DEFAULT false,
    "petFriendly" BOOLEAN NOT NULL DEFAULT false,
    "roomService" BOOLEAN NOT NULL DEFAULT false,
    "airportShuttle" BOOLEAN NOT NULL DEFAULT false,
    "restaurant" BOOLEAN NOT NULL DEFAULT false,
    "fitnessCenter" BOOLEAN NOT NULL DEFAULT false,
    "twentyFourHourFrontDesk" BOOLEAN NOT NULL DEFAULT false,
    "WheelchairAccessible" BOOLEAN NOT NULL DEFAULT false,
    "electricVehicleChargingStation" BOOLEAN NOT NULL DEFAULT false,
    "spa" BOOLEAN NOT NULL DEFAULT false,
    "swimmingPool" BOOLEAN NOT NULL DEFAULT false,
    "stayId" INTEGER NOT NULL,

    CONSTRAINT "Facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "bed" "bedType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceAfterDiscount" DOUBLE PRECISION,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FunThings" (
    "id" SERIAL NOT NULL,
    "fitnessCenter" BOOLEAN NOT NULL DEFAULT false,
    "fitness" BOOLEAN NOT NULL DEFAULT false,
    "bicycleRental" BOOLEAN NOT NULL DEFAULT false,
    "liveMusic" BOOLEAN NOT NULL DEFAULT false,
    "walkingTours" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FunThings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomFacilities" (
    "id" SERIAL NOT NULL,
    "privateBathroom" BOOLEAN NOT NULL DEFAULT false,
    "airConditioning" BOOLEAN NOT NULL DEFAULT false,
    "kitchen" BOOLEAN NOT NULL DEFAULT false,
    "balcony" BOOLEAN NOT NULL DEFAULT false,
    "privatePool" BOOLEAN NOT NULL DEFAULT false,
    "seaView" BOOLEAN NOT NULL DEFAULT false,
    "bathTub" BOOLEAN NOT NULL DEFAULT false,
    "hotTub" BOOLEAN NOT NULL DEFAULT false,
    "spaTub" BOOLEAN NOT NULL DEFAULT false,
    "shower" BOOLEAN NOT NULL DEFAULT false,
    "refrigerator" BOOLEAN NOT NULL DEFAULT false,
    "toilet" BOOLEAN NOT NULL DEFAULT false,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "terrace" BOOLEAN NOT NULL DEFAULT false,
    "washingMachine" BOOLEAN NOT NULL DEFAULT false,
    "mountainView" BOOLEAN NOT NULL DEFAULT false,
    "tv" BOOLEAN NOT NULL DEFAULT false,
    "coffee" BOOLEAN NOT NULL DEFAULT false,
    "hairdryer" BOOLEAN NOT NULL DEFAULT false,
    "toiletPaper" BOOLEAN NOT NULL DEFAULT false,
    "singleRoomForGuestAccommodation" BOOLEAN NOT NULL DEFAULT false,
    "upperFloorsAccessibleByElevator" BOOLEAN NOT NULL DEFAULT false,
    "soundProof" BOOLEAN NOT NULL DEFAULT false,
    "accessibleByElevator" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RoomFacilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meals" (
    "id" SERIAL NOT NULL,
    "kitchen" BOOLEAN NOT NULL DEFAULT false,
    "breakfast" BOOLEAN NOT NULL DEFAULT false,
    "dinner" BOOLEAN NOT NULL DEFAULT false,
    "launch" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Meals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Facilities_stayId_key" ON "Facilities"("stayId");

-- AddForeignKey
ALTER TABLE "Facilities" ADD CONSTRAINT "Facilities_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
