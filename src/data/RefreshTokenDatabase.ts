import { BaseDataBase } from "./BaseDatabase";
import { RefreshToken } from "../model/RefreshToken";

export class RefreshTokenDatabase extends BaseDataBase {
  protected TABLE_NAME: string = "Spotenu_RefreshToken";

  public async storeRefreshToken(refreshToken: RefreshToken): Promise<void> {
    const tokenIsActive = super.convertBooleanToInt(refreshToken.getIsActive());
    await super.getConnection().raw(`
        INSERT INTO ${
          this.TABLE_NAME
        } (refresh_token, device, is_active, user_id)
        VALUES(
            "${refreshToken.getToken()}",
            "${refreshToken.getDevice()}",
            "${tokenIsActive}",
            "${refreshToken.getUserId()}"
        )
    `);
  }

  public async getRefreshTokenByIdAndDevice(
    id: string,
    device: string
  ): Promise<RefreshToken | undefined> {
    const result = await this.getConnection().raw(`
        SELECT * FROM ${this.TABLE_NAME}
        WHERE user_id = "${id}"
        AND device = "${device}"
    `);

    const retrievedToken = result[0][0];

    if (retrievedToken === undefined) {
      return undefined;
    }

    return new RefreshToken(
      retrievedToken.token,
      retrievedToken.device,
      super.convertIntToBoolean(retrievedToken.is_active),
      retrievedToken.user_id
    );
  }

  public async deleteRefreshToken(token: string): Promise<void> {
    await this.getConnection().raw(`
      DELETE FROM ${this.TABLE_NAME}
      WHERE refresh_token = "${token}" 
    `);
  }
}
