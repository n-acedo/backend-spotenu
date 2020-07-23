import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.get("/", new BandController().getBands);
bandRouter.post("/:id", new BandController().approveBand)
