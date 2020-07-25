import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { BandBusiness } from "../business/BandBusiness";
import { ApproveBandInputDTO, CreateGenreInputDTO } from "../dto/BandDTO";
import { BandDatabase } from "../data/BandDatabase";

export class BandController {
  private static bandBusiness = new BandBusiness(
    new UserDatabase(),
    new TokenGenerator(),
    new IdGenerator(),
    new BandDatabase
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
        genre: req.body.genre
      }
      
      await BandController.bandBusiness.createGenre(data.token, data.genre)

      res.status(200).send({ message: "Genre created" });
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
