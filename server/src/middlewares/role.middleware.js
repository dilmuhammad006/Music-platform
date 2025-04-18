import { BaseException } from "./base.exception.js";

const checkRole = (roles) => async (req, res, next) => {
  try {
    if (!roles.includes(req.user.role)) {
      throw new BaseException("You don't have any permission for this action");
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default checkRole;
