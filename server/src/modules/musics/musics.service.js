import { isValidObjectId } from "mongoose";
import musicsModel from "./musics.model.js";
import musicianModel from "../musician/musician.model.js";

class MusicsService {
  #_musicModel;
  #_musicianModel;
  constructor() {
    this.#_musicModel = musicsModel;
    this.#_musicianModel = musicianModel;
  }

  getAllMusics = async () => {
    const musics = await this.#_musicModel.find();

    return {
      status: 200,
      message: "success",
      count: musics.length,
      data: musics,
    };
  };

  addMusics = async (name, musicianId, duration) => {
    if (!name || !musicianId || !duration) {
      return {
        status: 400,
        message: "Request not completed",
      };
    }

    if (!isValidObjectId(musicianId)) {
      return {
        status: 409,
        message: `${musicianId} not valid`,
      };
    }

    const foundedMusician = await this.#_musicianModel.findOne({
      _id: musicianId,
    });

    if (!foundedMusician) {
      return {
        status: 404,
        message: "Musician not found",
      };
    }

    const foundedMusic = await this.#_musicModel.findOne({ name, musicianId });

    if (foundedMusic) {
      return {
        status: 409,
        message: "This music already exists!",
      };
    }

    const music = await this.#_musicModel.create({
      name,
      musicianId,
      duration,
    });
    await this.#_musicianModel.findByIdAndUpdate(musicianId, {
      $push: { musics: music._id },
      $inc: { musicsCount: 1 },
    });

    return {
      status: 201,
      message: "success",
      data: music,
    };
  };
  deleteMusics = async (id) => {
    if (!isValidObjectId(id)) {
      return {
        status: 409,
        message: `${id} is not suitable`,
      };
    }

    const foundedMusic = await this.#_musicModel.findOne({ _id: id });

    if (!foundedMusic) {
      return {
        status: 404,
        message: "This music not found",
      };
    }

    await this.#_musicModel.findByIdAndDelete({ _id: id });

    return {
      status: 204,
    };
  };

  getMusicsById = async (id) => {
    if (!isValidObjectId(id)) {
      return {
        status: 409,
        message: `${id} is not suitable`,
      };
    }

    const foundedMusic = await this.#_musicModel.findOne({ _id: id });

    if (!foundedMusic) {
      return {
        status: 404,
        message: "This music not found",
      };
    }

    return {
      status: 200,
      message: "success",
      data: foundedMusic,
    };
  };

  updateMusics = async (id, newName) => {
    if (!isValidObjectId(id)) {
      return {
        status: 409,
        message: `${id} is not suitable`,
      };
    }

    if (!newName) {
      return {
        status: 400,
        message: "Request not completed",
      };
    }
    const foundedMusic = await this.#_musicModel.findOne({ _id: id });

    if (!foundedMusic) {
      return {
        status: 404,
        message: "This music not found",
      };
    }

    const music = await this.#_musicModel.findByIdAndUpdate(
      { _id: id },
      { name: newName },
      { new: true }
    );

    return {
      status: 200,
      message: "success",
      data: music,
    };
  };
}

export default new MusicsService();
