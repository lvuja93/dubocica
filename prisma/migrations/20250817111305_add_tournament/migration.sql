-- CreateTable
CREATE TABLE "public"."TournamentApplication" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentApplication_pkey" PRIMARY KEY ("id")
);
