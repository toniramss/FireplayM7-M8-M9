export interface Game {
    id: number | string;
    name: string;
    slug: string;
    background_image?: string;
    rating?: number;
    gameId?: number | string;
    price?: number;
  }