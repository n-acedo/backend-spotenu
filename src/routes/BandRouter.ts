import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.get("/", new BandController().getBands);
bandRouter.put("/:id", new BandController().approveBand)
bandRouter.post("/genre/create", new BandController().createGenre)
