export interface Album {
    _id: String;
    id: String;
    title: String;
    artist: String;
    artist_alphabetical: String;
    genre: String;
    decade: String;
    year: String;
    description: String;
    created: String;
    updated: String;
  }

  export interface Genre {
    value: string;
    viewValue: string;
  }