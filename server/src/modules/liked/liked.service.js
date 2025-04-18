import { BaseException } from "../../middlewares/base.exception.js";
import likedModel from "./liked.model.js";

class LikedService {
  #_likedModel;
  constructor() {
    this.#_likedModel = likedModel;
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
}

export default new LikedService();
