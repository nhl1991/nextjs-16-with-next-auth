export interface SpotifyProfile {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}
export interface SpotifyItem {
  external_urls: ExternalUrls,
  followers: Followers,
  genres: string[],
  href: string,
  id: string,
  images: SpotifyImage[],
  name: string,
  popularity: number,
  type: string,
  uri: string,
}
