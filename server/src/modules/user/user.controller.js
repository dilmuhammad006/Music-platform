import tokenMiddleWare from "../../middlewares/token.middleware.js";
import userService from "./user.service.js";

class UserController {
  #_userService;
  constructor() {
    this.#_userService = userService;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const { page, limit, srotBy, sortOrder } = req.params;
      const data = await this.#_userService.getAllUsers(
        page,
        limit,
        srotBy,
        sortOrder
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const data = await this.#_userService.register(name, email, password);

      if (data.status >= 400) {
        return res.status(data.status).send(data);
      }

      tokenMiddleWare(data.data, res);

      res.status(data.status).send(data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await this.#_userService.login(email, password);

      if (data.status >= 400) {
        return res.status(data.status).send(data);
      }

      tokenMiddleWare(data.data, res);

      const tokens = tokenMiddleWare(data.data, res);

      res.status(data.status).send({ ...data, tokens });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie("ACCES_TOKEN");
      res.clearCookie("REFRESH_TOKEN");

      return res.status(200).send({
        status: 200,
        message: "You are successfully logged out",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
