/*
  Warnings:

  - The `role` column on the `group_memberships` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "GroupVisibility" AS ENUM ('VISIBLE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "MembershipApprovalType" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MembershipVisibility" AS ENUM ('VISIBLE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "MembershipInvitationStatus" AS ENUM ('NONE', 'SENT', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "group_memberships" ADD COLUMN     "invitationStatus" "MembershipInvitationStatus" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "status" "MembershipStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "visibility" "MembershipVisibility" NOT NULL DEFAULT 'VISIBLE',
DROP COLUMN "role",
ADD COLUMN     "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "membershipApproval" "MembershipApprovalType" NOT NULL DEFAULT 'MANUAL',
ADD COLUMN     "status" "GroupStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "type" "GroupType" NOT NULL DEFAULT 'PRIVATE',
ADD COLUMN     "visibility" "GroupVisibility" NOT NULL DEFAULT 'VISIBLE';
