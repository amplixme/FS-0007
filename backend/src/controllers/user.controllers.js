import { getPublicProfile, updateProfile } from "../services/user.service.js";
import { success } from "../utils/response.js";

export const getPublicProfileController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const profile = await getPublicProfile(id);

    success(res, profile, 200);
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const { name, bio, avatarUrl } = req.body;
    const profile = await updateProfile(req.user.userId, name, bio, avatarUrl);

    success(res, profile, 200);
  } catch (err) {
    next(err);
  }
};
