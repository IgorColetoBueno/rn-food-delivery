export interface Review {
  id: string;
  review: string;
  stars: number;
  user: string;
}

export interface Product {
  createdAt: string;
  name: string;
  value: number;
  photos: string[];
  reviews: Review[];
  restaurantId: string;
  id: string;
}
