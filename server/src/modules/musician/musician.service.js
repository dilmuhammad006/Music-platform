import musicianModel from "./musician.model.js";

class MusicianService {
  #_musicianModel;
  constructor() {
    this.#_musicianModel = musicianModel;
    this.#_seedMusicians();
  }

  getAllMusicians = async () => {
    const musicians = await this.#_musicianModel.find().populate("musics");

    return {
      status: 200,
      message: "success",
      count: musicians.length,
      data: musicians,
    };
  };
  #_seedMusicians = async () => {
    const defaultMusicians = [
      {
        name: "Bakhtiyar Mammadov",
        nickname: "Jah Khalib",
      },
      {
        name: "Matvey Aleksandrovich",
        nickname: "Mot",
      },
    ];

    for (let m of defaultMusicians) {
      const musician = await this.#_musicianModel.findOne({
        nickname: m.nickname,
      });

      if (!musician) {
        await this.#_musicianModel.create({
          name: m.name,
          nickname: m.nickname,
        });
      }
    }

    // console.log("Default Musicians yaratildi ✅");
  };
  addMusicians = async (name, nickname) => {
    if (!name || !nickname) {
      return {
        status: 400,
        message: "Request not completed",
      };
    }

    const foundedMusician = await this.#_musicianModel.findOne({ nickname });

    if (foundedMusician) {
      return {
        status: 409,
        message: "This musician already exists with this nickname",
      };
    }

    const musician = await this.#_musicianModel.create({ name, nickname });

    return {
      status: 201,
      message: "Musician succesfully added",
      data: musician,
    };
  };
}

export default new MusicianService();
