-- CreateTable
CREATE TABLE "Track" (
    "id_mappings" TEXT NOT NULL,
    "track_uri_id" TEXT NOT NULL,
    "trackListRecommendationPlaylistId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id_mappings")
);

-- CreateTable
CREATE TABLE "TrackListRecommendation" (
    "playlistId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "TrackListRecommendation_pkey" PRIMARY KEY ("playlistId")
);

-- CreateTable
CREATE TABLE "User" (
    "display_name" TEXT,
    "email" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_trackListRecommendationPlaylistId_fkey" FOREIGN KEY ("trackListRecommendationPlaylistId") REFERENCES "TrackListRecommendation"("playlistId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackListRecommendation" ADD CONSTRAINT "TrackListRecommendation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
