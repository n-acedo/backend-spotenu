import { UserDatabase } from "../data/UserDatabase";
import { TokenGenerator } from "../services/TokenGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError, NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
import { IdGenerator } from "../services/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";

export class BandBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator,
    private bandDatabase: BandDatabase
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

    const bands = await this.userDatabase.getBands();

    return bands;
  }

  public async approveBand(token: string, bandId: string) {
    if (!token || !bandId) {
      throw new InvalidParameterError("Missing input");
    }

    const authorization = this.tokenGenerator.getData(token);

    if (authorization.role !== "ADMIN") {
      throw new UnauthorizedError(
        "You must be an admin to access this endpoint"
      );
    }

    const band = await this.userDatabase.getUserById(bandId);

    if (!band) {
      throw new NotFoundError("Band not found");
    }

    if (band.getIsApproved()) {
      throw new GenericError("The band is already approved ");
    }

    this.userDatabase.approveBand(bandId);

    return band;
  }

  public async createGenre(token: string, genre: string) {
    if (!token || !genre) {
      throw new InvalidParameterError("Missing input");
    }

    const authorization = this.tokenGenerator.getData(token);

    if (authorization.role !== "ADMIN") {
      throw new UnauthorizedError(
        "You must be an admin to access this endpoint"
      );
    }

    const id = this.idGenerator.generate();

    await this.bandDatabase.createGenre(id, genre);
  }

  public async getGenres(token: string) {
    if (!token) {
      throw new InvalidParameterError("Missing input");
    }

    const authorization = this.tokenGenerator.getData(token);

    if (authorization.role === "ADMIN" || authorization.role === "BAND") {
      const genres = await this.bandDatabase.getGenres()

      return genres
    } else {
      throw new UnauthorizedError(
        "You must be an admin to access this endpoint"
      );
    }
  }
}
