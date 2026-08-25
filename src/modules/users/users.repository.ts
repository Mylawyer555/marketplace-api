import { db } from "../../config/db";
import { UpdateProfile } from "./users.types";

export const findUserProfile = async (userId: number) => {
  return db.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const updateUserProfile = async (
  userId: number,
  data: UpdateProfile,
) => {
  const updateData: Record<string, string> = {};
  if (data.first_name !== undefined) {
    updateData.first_name = data.first_name;
  }
  if (data.last_name !== undefined) {
    updateData.last_name = data.last_name;
  }
  if (data.phone_number !== undefined) {
    updateData.phone_number = data.phone_number;
  }
  return db.user.update({
    where: {
      user_id: userId,
    },
    data: updateData,
    select: {
      user_id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const deactivateUser = async (userId: number) => {
  const now = new Date();

  const deletionAt = new Date(now);
  deletionAt.setDate(deletionAt.getDate() + 30);
  return db.user.update({
    where: {
      user_id: userId,
    },
    data: {
      account_status: "DEACTIVATED",
      deactivated_at: now,
      deletion_at: deletionAt,
    },
    select: {
      user_id: true,
      account_status: true,
      deactivated_at: true,
      deletion_at: true
    },
  });
};
