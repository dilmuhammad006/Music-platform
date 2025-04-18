import { BaseException } from "../../middlewares/base.exception.js";
import userModel from "./user.model.js";
import bcrypt from "bcrypt";

class UserService {
  #_userModel;
  constructor() {
    this.#_userModel = userModel;
    this.#_seedUsers();
  }

  getAllUsers = async (
    page = 1,
    limit = 10,
    srotBy = "createdAt",
    sortOrder = "desc"
  ) => {
    const skip = (page - 1) * limit;
    const sortOption = {};
    sortOption[srotBy] = sortOrder === "desc" ? -1 : 1;
    const users = await this.#_userModel
      .find()
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return {
      status: 200,
      message: "success",
      count: users.length,
      page,
      limit,
      srotBy,
      sortOrder,
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
      throw new BaseException("Request not completed", 400);
    }

    const foundedUser = await this.#_userModel.findOne({ email });

    if (foundedUser) {
      throw new BaseException("This  user already exists", 409);
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
      throw new BaseException("Request not completed", 400);
    }

    const foundedUser = await this.#_userModel.findOne({ email });

    if (!foundedUser) {
      throw new BaseException("User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);

    if (!isMatch) {
      throw new BaseException("Email or password are not suitable ", 409);
    }

    return {
      status: 200,
      message: "You are succesfullly logged in",
      data: foundedUser,
    };
  };
}

export default new UserService();
