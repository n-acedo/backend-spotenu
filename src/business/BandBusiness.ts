import { UserDatabase } from "../data/UserDatabase";
import { TokenGenerator } from "../services/TokenGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/NotFoundError";

export class BandBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private tokenGenerator: TokenGenerator
  ) {}

  public async getBands(token: string) {

    if (!token) {
      throw new InvalidParameterError("Missing input");
    }

    const authorization = this.tokenGenerator.getData(token);

    if (authorization.role !== "ADMIN") {
      throw new UnauthorizedError(
        "You must be an admin to access this endpoint"
      );
    }

    const bands = await this.userDatabase.getBands()

    return bands

  }
}
