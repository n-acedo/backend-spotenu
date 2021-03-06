export interface ApproveBandInputDTO {
  token: string;
  bandId: string;
}

export interface CreateGenreInputDTO {
  token: string;
  genre: string;
}

export interface CreateAlbumInputDTO {
  token: string;
  name: string;
  genres: string[];
}

export interface CreateMusicInputDTO {
  token: string;
  name: string;
  album: string;
}
