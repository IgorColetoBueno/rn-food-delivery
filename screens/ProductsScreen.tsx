import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BaseScreen from "../components/base-screen";
import RoundedButton from "../components/button/RoundedButton";
import CardShimmer from "../components/card/CardShimmer";
import ProductCard from "../components/card/product-card";
import { Column, Row } from "../components/flex";
import ShimmerRectangle from "../components/shimmer/Rectangle";
import { TextBody, TextBody2, TextH2 } from "../components/typography";
import useShimmer from "../hooks/useShimmer";
import { Product } from "../model/product";
import { BaseStackParams, Routes } from "../navigation";
import { useAppDispatch } from "../store";
import {
  useGetProductsByRestaurantQuery,
  useGetRestaurantByIdQuery,
} from "../store/api";
import { setDetailProduct } from "../store/detailSlice";
import Theme from "../theme";
import { formatMoney } from "../util/money";

type ProfileScreenRouteProp = RouteProp<BaseStackParams, Routes.Products>;

const ProductsScreen = () => {
  const dispatch = useAppDispatch();
  const opacity = useShimmer();
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();
  const { resturantId } = route.params;
  const { data, isFetching, isError, error } =
    useGetProductsByRestaurantQuery(resturantId);
  const {
    data: restaurant,
    isFetching: restaurantFetching,
    isError: restaurantError,
  } = useGetRestaurantByIdQuery(resturantId);
  const shouldShowData = !isFetching && !isError;
  const shouldShowRestaurant = !restaurantFetching && !restaurantError;

  const handleProduct = (product: Product) => () => {
    dispatch(setDetailProduct({ ...product, restaurant }));
  };

  return (
    <BaseScreen
      noSpacing
      scrollable
      showsVerticalScrollIndicator={false}
      safeAreaProps={{ style: { backgroundColor: Theme.colors.white } }}
    >
      <StatusBar backgroundColor="transparent" />
      <Column flex={1}>
        <ImageBackground
          style={{ height: 200, flex: 1, justifyContent: "space-between" }}
          resizeMode="cover"
          source={{
            height: 200,
            uri: restaurant?.photo,
          }}
        >
          <Row marginTop={top} marginLeft={Theme.spacing.sm}>
            <RoundedButton onPress={navigation.goBack}>
              <Ionicons
                size={Theme.spacing.md}
                name="chevron-back"
                color={Theme.colors.white}
              />
            </RoundedButton>
          </Row>
          <View style={styles.roundedSection} />
        </ImageBackground>
        <Column
          backgroundColor={Theme.colors.white}
          paddingHorizontal={Theme.spacing.sm}
          paddingBottom={Theme.spacing.lg}
          gap={Theme.spacing.md}
        >
          {restaurantFetching && (
            <Column gap={Theme.spacing.sm}>
              <ShimmerRectangle opacity={opacity} />
            </Column>
          )}
          {shouldShowRestaurant && (
            <Column gap={Theme.spacing.xs}>
              <TextH2 family="poppins">{restaurant?.name}</TextH2>
              <Row alignItems="center" gap={Theme.spacing.xxs}>
                <Ionicons color={Theme.colors.yellow} name="star" />
                <TextBody color="yellow">{restaurant?.rate}</TextBody>
                <Ionicons size={6} name="ios-remove" />
                {restaurant?.categories.map((category) => {
                  return (
                    <Fragment key={restaurant.id + category}>
                      <TextBody2>{category}</TextBody2>
                      <Ionicons size={6} name="ios-remove" />
                    </Fragment>
                  );
                })}
                <TextBody2>{restaurant?.distance} Km</TextBody2>
              </Row>
              <Row alignItems="center" gap={Theme.spacing.xxs}>
                <TextBody2>{restaurant?.averageTime}</TextBody2>
                <Ionicons size={6} name="ios-remove" />
                <TextBody2>
                  {formatMoney(restaurant?.deliverPrice ?? 0)}
                </TextBody2>
              </Row>
            </Column>
          )}
          {isFetching && <CardShimmer />}
          {isError && <TextBody>{JSON.stringify(error)}</TextBody>}
          {shouldShowData &&
            data?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={handleProduct(product)}
              />
            ))}
        </Column>
      </Column>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  roundedSection: {
    backgroundColor: "white",
    borderTopLeftRadius: Theme.spacing.sm,
    borderTopRightRadius: Theme.spacing.sm,
    height: Theme.spacing.sm,
  },
});

export default ProductsScreen;
