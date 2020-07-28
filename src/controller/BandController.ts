import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { BandBusiness } from "../business/BandBusiness";
import {
  ApproveBandInputDTO,
  CreateGenreInputDTO,
  CreateAlbumInputDTO,
  CreateMusicInputDTO,
} from "../dto/BandDTO";
import { BandDatabase } from "../data/BandDatabase";

export class BandController {
  private static bandBusiness = new BandBusiness(
    new UserDatabase(),
    new TokenGenerator(),
    new IdGenerator(),
    new BandDatabase()
  );

  async getBands(req: Request, res: Response) {
    try {
      const token = req.headers.token as string;

      const bands = await BandController.bandBusiness.getBands(token);

      res.status(200).send(bands);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async approveBand(req: Request, res: Response) {
    try {
      const data: ApproveBandInputDTO = {
        token: req.headers.token as string,
        bandId: req.params.id,
      };

      await BandController.bandBusiness.approveBand(data.token, data.bandId);

      res.status(200).send({ message: "Band approved" });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async createGenre(req: Request, res: Response) {
    try {
      const data: CreateGenreInputDTO = {
        token: req.headers.token as string,
        genre: req.body.genre,
      };

      await BandController.bandBusiness.createGenre(data.token, data.genre);

      res.status(200).send({ message: "Genre created" });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async getGenres(req: Request, res: Response) {
    try {
      const genres = await BandController.bandBusiness.getGenres(
        req.headers.token as string
      );

      res.status(200).send({ genres });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async createAlbum(req: Request, res: Response) {
    try {
      const data: CreateAlbumInputDTO = {
        token: req.headers.token as string,
        name: req.body.name,
        genres: req.body.genres,
      };

      await BandController.bandBusiness.createAlbum(
        data.token,
        data.name,
        data.genres
      );

      res.status(200).send({
        message: "Album created",
      });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async createMusic(req: Request, res: Response){
    try{

      const data: CreateMusicInputDTO = {
        token: req.headers.token as string,
        name: req.body.name,
        album: req.body.album
      }

      await BandController.bandBusiness.createMusic(
        data.token,
        data.name,
        data.album
      )

      res.status(200).send({
        message: "Music created",
      });

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
