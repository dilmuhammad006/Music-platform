import { isValidObjectId } from "mongoose";
import musicsModel from "./musics.model.js";
import musicianModel from "../musician/musician.model.js";
import { BaseException } from "../../middlewares/base.exception.js";

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

  addMusics = async (name, musicianId, duration, filename) => {
    console.log("keldi")
    if (!name || !musicianId || !duration || !filename) {
      throw new BaseException("All fields are required", 409);
    }

    if (!isValidObjectId(musicianId)) {
      throw new BaseException("Given id is not valid", 409);
    }

    const foundedMusician = await this.#_musicianModel.findOne({
      _id: musicianId,
    });
    if (!foundedMusician) {
      throw new BaseException("Musician not found", 404);
    }

    const foundedMusic = await this.#_musicModel.findOne({ name, musicianId });
    if (foundedMusic) {
      throw new BaseException("This music already exists", 409);
    }

    const music = await this.#_musicModel.create({
      name,
      musicianId,
      duration,
      fileUrl: `/uploads/music/${filename}`,
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
      throw new BaseException("Given id is not valid", 409);
    }

    const foundedMusic = await this.#_musicModel.findOne({ _id: id });

    if (!foundedMusic) {
      throw new BaseException("This music not found", 404);
    }

    await this.#_musicModel.findByIdAndDelete({ _id: id });

    return {
      status: 204,
    };
  };

  getMusicsById = async (id) => {
    if (!isValidObjectId(id)) {
      throw new BaseException("Given id is not valid", 409);
    }

    const foundedMusic = await this.#_musicModel.findOne({ _id: id });

    if (!foundedMusic) {
      throw new BaseException("This music not found", 404);
    }

    return {
      status: 200,
      message: "success",
      data: foundedMusic,
    };
  };

  updateMusics = async (id, newName) => {
    if (!isValidObjectId(id)) {
      throw new BaseException("Given id is not valid", 409);
    }

    if (!newName) {
      throw new BaseException("That fields are required", 409);
    }
    const foundedMusic = await this.#_musicModel.findOne({ _id: id });

    if (!foundedMusic) {
      throw new BaseException("This music not found", 404);
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
