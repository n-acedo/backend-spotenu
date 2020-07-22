import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/HashGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";
import { SignupInputDTO, LoginInputDTO, SignupBandInputDTO } from "../dto/UserDTO";
import { UnauthorizedError } from "../errors/NotFoundError";


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

  async signupAdm(req: Request, res: Response) {
    try {
      const userData: SignupInputDTO = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        device: req.body.device,
      };

      const token = req.headers.token as string;

      const authenticationData = new TokenGenerator().getData(token);

      if (authenticationData.role !== "ADMIN") {
        throw new UnauthorizedError(
          "You must be an administrator to register another administrator"
        );
      }

      const result = await UserController.UserBusiness.signupAdm(
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

  async signupBand(req: Request, res: Response) {
    try{
      const userData: SignupBandInputDTO = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        device: req.body.device,
        description: req.body.description
      }

      await UserController.UserBusiness.signupBand(
        userData.name,
        userData.nickname,
        userData.email,
        userData.password,
        userData.role,
        userData.device,
        userData.description
      );

      res.status(200).send({ message: "Band registered. Wait for approval." });
    }catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userData: LoginInputDTO = {
        emailOrNick: req.body.emailOrNick,
        password: req.body.password,
        device: req.body.device,
      };

      const result = await UserController.UserBusiness.login(
        userData.emailOrNick,
        userData.password,
        userData.device,
      );

      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }
}
