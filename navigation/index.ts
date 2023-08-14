import { createNativeStackNavigator } from "@react-navigation/native-stack";

export enum Routes {
  Home = "Home",
  Products = "Products",
  ProductDetail = "ProductDetail",
  ProductDetailReview = "ProductDetailReview",
}

export type BaseStackParams = {
  [Routes.Home]: undefined;
  [Routes.Products]: { resturantId: string };
  [Routes.ProductDetail]: { productId: string };
  [Routes.ProductDetailReview]: { productId: string };
};

export const Stack = createNativeStackNavigator<BaseStackParams>();
