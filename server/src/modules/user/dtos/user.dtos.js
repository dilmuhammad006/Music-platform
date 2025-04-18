import Joi from "joi";
export const RegisterSchema = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
}).required();

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

export const ForgotPassword = Joi.object({
  email: Joi.string().email().required(),
}).required();

export const ResetPassword = Joi.object({
  newPassword: Joi.string().min(6).max(20).required(),
});
