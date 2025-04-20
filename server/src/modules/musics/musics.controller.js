import { BaseException } from "../../middlewares/base.exception.js";
import musicsService from "./musics.service.js";

class MusicsController {
  #_musicService;
  constructor() {
    this.#_musicService = musicsService;
  }

  getAllMusics = async (req, res, next) => {
    try {
      const data = await this.#_musicService.getAllMusics();

      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  addMusics = async (req, res, next) => {
    try {
      console.log("controller");
      const { name, musicianId, duration } = req.body;
      const file = req.file;


      if (!file) {
        throw new BaseException("Music file is required", 400);
      }

      const data = await this.#_musicService.addMusics(
        name,
        musicianId,
        duration,
        file.filename
      );

      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  deleteMusics = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.#_musicService.deleteMusics(id);
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  getMusicsById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await this.#_musicService.getMusicsById(id);
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  updateMusics = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const data = await this.#_musicService.updateMusics(id, name);

      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new MusicsController();
