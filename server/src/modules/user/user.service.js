import userModel from "./user.model.js";
import bcrypt from "bcrypt";

class UserService {
  #_userModel;
  constructor() {
    this.#_userModel = userModel;
    this.#_seedUsers();
  }

  getAllUsers = async () => {
    const users = await this.#_userModel.find();

    return {
      status: 200,
      message: "success",
      count: users.length,
      data: users,
    };
  };

  #_seedUsers = async () => {
    const defaultUser = {
      name: "Dilmuhammad",
      email: "dilmuhammadabdumalikov06@gmail.com",
      password: "20060524",
      role: "ADMIN",
    };

    const foundedUser = await this.#_userModel.findOne({
      email: defaultUser.email,
    });

    defaultUser.password = await bcrypt.hash(defaultUser.password, 10);

    if (!foundedUser) {
      await this.#_userModel.create(defaultUser);
    }

    // console.log("default user yaratildi");
  };

  register = async (name, email, password) => {
    if (!name || !email || !password) {
      return {
        status: 400,
        message: "Request not completed",
      };
    }

    const foundedUser = await this.#_userModel.findOne({ email });

    if (foundedUser) {
      return {
        status: 409,
        message: "This user already exists!",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.#_userModel.create({
      name,
      email,
      password: passwordHash,
    });

    return {
      status: 201,
      message: "You are registered successfully",
      data: user,
    };
  };

  login = async (email, password) => {
    if (!email || !password) {
      return {
        status: 400,
        message: "Request not completed",
      };
    }

    const foundedUser = await this.#_userModel.findOne({ email });

    if (!foundedUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);

    if (!isMatch) {
      return {
        status: 409,
        message: "Email or password not suitable",
      };
    }

    return {
      status: 201,
      message: "You are succesfullly logged in",
      data: foundedUser,
    };
  };
}

export default new UserService();
