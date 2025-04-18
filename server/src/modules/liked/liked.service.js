import mongoose from "mongoose";
import { BaseException } from "../../middlewares/base.exception.js";
import musicsModel from "../musics/musics.model.js";
import likedModel from "./liked.model.js";

class LikedService {
  #_musicsModel;
  #_likedModel;
  constructor() {
    this.#_likedModel = likedModel;
    this.#_musicsModel = musicsModel;
  }

  like = async (userId, musicianId, musicId) => {
    const isExistsLike = await this.#_likedModel.findOne({
      userId,
      musicId,
      musicianId,
    });

    if (isExistsLike) {
      throw new BaseException("You're already liked to this music", 409);
    }

    await this.#_likedModel.create({ userId, musicId, musicianId });

    return {
      status: 201,
      message: "You successfully liked this music",
    };
  };

  unLike = async (userId, musicianId, musicId) => {
    if (!userId || !musicId || !musicianId) {
      throw new BaseException("Request not completed", 400);
    }

    const foundedLiked = await this.#_likedModel.findOne({
      userId,
      musicId,
      musicianId,
    });

    if (!foundedLiked) {
      throw new BaseException("This music not found", 404);
    }

    await this.#_likedModel.findByIdAndDelete(foundedLiked._id);

    return {
      status: 200,
      message: "Successfully unliked",
    };
  };

  getAllLiked = async (userId) => {
    const liked = await this.#_likedModel.find({ userId });

    const likedId = liked.map((lk) => new mongoose.Types.ObjectId(lk.musicId));

    const likedMusics = await this.#_musicsModel
      .find({
        _id: { $in: likedId },
      })
      .sort({ createdAt: -1 });

    if (!likedMusics.length) {
      throw new BaseException("You don't have any liked musics", 404);
    }

    return {
      status: 200,
      message: "success",
      musics: likedMusics,
    };
  };
}

export default new LikedService();
