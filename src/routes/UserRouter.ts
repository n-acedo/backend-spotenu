import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup/listener", new UserController().signupListener);
userRouter.post("/signup/adm", new UserController().signupAdm);
userRouter.post("/signup/band", new UserController().signupBand)
userRouter.post("/login", new UserController().login);
