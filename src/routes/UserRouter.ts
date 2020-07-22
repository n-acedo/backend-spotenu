import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup/listener", new UserController().signupListener);
userRouter.post("/signup/adm", new UserController().signupAdm);
userRouter.post("/login", new UserController().login);
