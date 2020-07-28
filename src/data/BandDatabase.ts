import { BaseDataBase } from "./BaseDatabase";

export class BandDatabase extends BaseDataBase {
  protected TABLE_NAME: string = "";
  protected GENRE_TABLE: string = "Genre_Spotenu";
  protected ALBUM_TABLE: string = "Albums_Spotenu";
  protected ALBUM_GENRE_RELATION_TABLE = "Album_Genre_Relation_Spotenu";

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

  async checkGenres(genres: string[]): Promise<boolean> {
    let count = 0;
    for (const genre of genres) {
      const check = await super.getConnection().raw(`
        SELECT * 
        FROM ${this.GENRE_TABLE}
        WHERE genre = '${genre}'
      `);

      if (check[0][0]) {
        count += 1;
      }
    }

    if (genres.length === count) {
      return true;
    }

    return false;
  }

  public async createAlbum(
    albumId: string,
    name: string,
    bandId: string,
    genres: string[]
  ): Promise<void> {
    if (!(await this.checkGenres(genres))) {
      throw new Error("Invalid genre");
    }

    await super.getConnection().raw(`
        INSERT INTO ${this.ALBUM_TABLE} (id, name, createdBy)
        VALUES(
          "${albumId}",
          "${name}",
          "${bandId}"
        );
    `);

    for (const genre of genres) {
      genre.toLowerCase();
      await super.getConnection().raw(`
        INSERT INTO ${this.ALBUM_GENRE_RELATION_TABLE} (name_album, genre)
        VALUES(
          "${name}",
          "${genre}"
        );
      `);
    }
  }
}
