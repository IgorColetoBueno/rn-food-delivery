import { Restaurant } from "./restaurant";

export interface Review {
  id: string;
  review: string;
  stars: number;
  user: string;
}

export interface Product {
  createdAt: string;
  name: string;
  description: string;
  value: number;
  photos: string[];
  reviews: Review[];
  restaurantId: string;
  restaurant?: Restaurant;
  id: string;
}
