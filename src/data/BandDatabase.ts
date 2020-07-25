import { BaseDataBase } from "./BaseDatabase";

export class BandDatabase extends BaseDataBase {
  protected TABLE_NAME: string = "";
  protected GENRE_TABLE: string = "Genre_Spotenu";

  public async createGenre(id: string, genre: string): Promise<void> {
    await super.getConnection().raw(`
            INSERT INTO ${this.GENRE_TABLE} (id, genre)
            VALUES(
                "${id}",
                "${genre}"               
            );
        `);
  }

  public async getGenres(): Promise<any> {
    const genres = await super.getConnection().raw(`
        SELECT * FROM ${this.GENRE_TABLE}
      `);

    return genres[0];
  }
}
