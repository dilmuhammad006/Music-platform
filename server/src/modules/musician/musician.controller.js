import musicianService from "./musician.service.js";

class MusicianController {
  #_musicianService;
  constructor() {
    this.#_musicianService = musicianService;
  }

  getAllMusicians = async (req, res, next) => {
    try {
      const data = await this.#_musicianService.getAllMusicians();

      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  addMusicians = async (req, res, next) => {
    try {
      const { name, nickname } = req.body;

      const data = await this.#_musicianService.addMusicians(name, nickname);
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new MusicianController();
