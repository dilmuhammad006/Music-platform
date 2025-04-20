import { BaseException } from "../../middlewares/base.exception.js";
import sendMail from "../../utils/mail.util.js";
import userModel from "./user.model.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

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

    console.log("default user yaratildi");
  };

  register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new BaseException("That fields are required", 400);
    }

    const foundedUser = await this.#_userModel.findOne({ email });

    if (foundedUser) {
      throw new BaseException(
        `This user already exists with this ${email}`,
        409
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.#_userModel.create({
      name,
      email,
      password: passwordHash,
    });

    sendMail({
      to: email,
      subject: "Welcome",
      text: "You have succesfully registered out platform 😁",
    });

    return {
      status: 201,
      message: "You are registered successfully",
      data: user,
    };
  };

  login = async (email, password) => {
    if (!email || !password) {
      throw new BaseException("That fields are required", 400);
    }

    const foundedUser = await this.#_userModel.findOne({ email });

    if (!foundedUser) {
      throw new BaseException("User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);

    if (!isMatch) {
      throw new BaseException("Email or password error", 409);
    }

    return {
      status: 200,
      message: "You are succesfullly logged in",
      data: foundedUser,
    };
  };

  forgot = async (email) => {
    const foundedUser = await this.#_userModel.findOne({ email });

    if (!foundedUser) {
      throw new BaseException("User not found", 404);
    }

    const resetToken = crypto.randomBytes(50).toString("hex");

    foundedUser.resetToken = resetToken;
    await foundedUser.save();

    await sendMail({
      to: email,
      subject: "Reset password",
      html: `
      <h2> Click here</h2>
      <a href="http://localhost:4000/pages/reset?resetToken=${resetToken}">Reset Password</a>
      `,
    });

    return {
      status: 200,
      message: "Link sended to you email",
    };
  };

  reset = async (newPassword, resetToken) => {
    
    if (newPassword.length < 6) {
      throw new BaseException(
        "The password must be at least 6 characters",
        409
      );
    }

    if (!resetToken) {
      throw new BaseException("You don't have any token", 409);
    }

    const user = await this.#_userModel.findOne({ resetToken });

    if (!user) {
      throw new BaseException("Your token is so old 😢", 404);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    await user.save();

    return {
      status: 200,
      message: "Your password succesfully updated",
    };
  };
}

export default new UserService();
