export interface Restaurant {
  createdAt: string;
  name: string;
  photo: string;
  distance: number;
  rate: number;
  deliverPrice: number;
  averageTime: string;
  id: string;
  categories: string[];
}

export const restaurantCategories = [
  "Popular",
  "Drinks",
  "Arabian",
  "Barbecue",
  "Foodtruck",
  "Sushi",
];
