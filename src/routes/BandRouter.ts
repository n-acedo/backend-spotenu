import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.put("/:id", new BandController().approveBand)
bandRouter.post("/genre/create", new BandController().createGenre)
bandRouter.get("/", new BandController().getBands);
bandRouter.get("/genres", new BandController().getGenres)
