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
      return {
        status: 409,
        message: "You've already liked this music",
      };
    }

    await this.#_likedModel.create({ userId, musicId, musicianId });

    return {
      status: 201,
      message: "You successfully liked this music",
    };
  };

  unLike = async (userId, musicianId, musicId) => {
    if (!userId || !musicId || !musicianId) {
      return {
        status: 400,
        message: "Required fields are missing",
      };
    }

    const foundedLiked = await this.#_likedModel.findOne({
      userId,
      musicId,
      musicianId,
    });

    if (!foundedLiked) {
      return {
        status: 404,
        message: "Like not found",
      };
    }

    await this.#_likedModel.findByIdAndDelete(foundedLiked._id);

    return {
      status: 200,
      message: "Successfully unliked",
    };
  };
}

export default new LikedService();
