export interface Cart {
  id?: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  author: string;
  price: number;
  quantity?: number;
}
