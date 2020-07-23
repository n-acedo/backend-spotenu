import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/HashGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";
import { UnauthorizedError } from "../errors/NotFoundError";
import { BandBusiness } from "../business/BandBusiness";
import { ApproveBandInputDTO } from "../dto/BandDTO";

export class BandController {
  private static bandBusiness = new BandBusiness(
    new UserDatabase(),
    new TokenGenerator()
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

  async approveBand(req: Request, res: Response){
    try{
      const data: ApproveBandInputDTO = {
        token: req.headers.token as string, 
        bandId: req.params.id
      }

     await BandController.bandBusiness.approveBand(data.token, data.bandId);

      res.status(200).send({ message: "Band approved"});

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
