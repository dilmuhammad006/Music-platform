import musicianService from "./musician.service.js";

class MusicianController {
  #_musicianService;
  constructor() {
    this.#_musicianService = musicianService;
  }

  getAllMusicians = async (req, res, next) => {
    try {
      const data = await this.#_musicianService.getAllMusicians();
      data.role = req.user.role;
      data.email = req.user.email;
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  addMusicians = async (req, res, next) => {
    try {
      const { name, nickname } = req.body;
      console.log(req.body)

      const data = await this.#_musicianService.addMusicians(name, nickname);
      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new MusicianController();
