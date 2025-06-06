import likedService from "./liked.service.js";

class LikedController {
  #_likedService;
  constructor() {
    this.#_likedService = likedService;
  }

  like = async (req, res, next) => {
    try {
      const { userId, musicId, musicianId } = req.body;

      const data = await this.#_likedService.like(userId, musicId, musicianId);
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  unlike = async (req, res, next) => {
    try {
      const { userId, musicianId, musicId } = req.body;

      const data = await this.#_likedService.unLike(
        userId,
        musicId,
        musicianId
      );

      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  getAllLiked = async (req, res, next) => {
    try {
      console.log(req.user)
      const { id } = req.user;
  
      const data = await this.#_likedService.getAllLiked(id);
  
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };
  
}

export default new LikedController();
