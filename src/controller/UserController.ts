import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/HashGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";
import { SignupInputDTO } from "../dto/UserDTO";


export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashGenerator(),
    new TokenGenerator(),
    new RefreshTokenDatabase()
  );

  async signupListener(req: Request, res: Response) {
    try {
      const userData: SignupInputDTO = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        device: req.body.device,
      };

      const result = await UserController.UserBusiness.signupListener(
        userData.name,
        userData.nickname,
        userData.email,
        userData.password,
        userData.role,
        userData.device
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
