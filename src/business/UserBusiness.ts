import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashGenerator } from "../services/HashGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { User, stringToUserRole } from "../model/User";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";
import { RefreshToken } from "../model/RefreshToken";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private refreshTokenDatabase: RefreshTokenDatabase
  ) {}

  public async signupListener(
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string,
    device: string
  ) {
    if (!name || !nickname || !email || !password || !role || !device) {
      throw new InvalidParameterError("Missing input");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid Email");
    }

    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password");
    }

    const id = this.idGenerator.generate();

    const hashPassword = await this.hashGenerator.createHash(password);

    await this.userDatabase.createUser(
      new User(
        id,
        name,
        nickname,
        email,
        hashPassword,
        stringToUserRole(role),
        1
      )
    );

    const accessToken = this.tokenGenerator.generateToken(
      { id, role },
      process.env.ACCESS_TOKEN_EXPIRES_IN
    );

    const refreshToken = this.tokenGenerator.generateToken(
      { id, device },
      process.env.REFRESH_TOKEN_EXPIRES_IN
    );

    await this.refreshTokenDatabase.storeRefreshToken(
      new RefreshToken(refreshToken, device, 1, id)
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
