import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import BaseScreen from "../components/base-screen";
import CardShimmer from "../components/card/CardShimmer";
import RestaurantCard from "../components/card/restaurant-card";
import CategoryList from "../components/category-tags";
import { Column } from "../components/flex";
import SearchInput from "../components/search-input";
import { TextBody } from "../components/typography";
import useDebounce from "../hooks/useDebounce";
import { restaurantCategories } from "../model/restaurant";
import { BaseStackParams, Routes } from "../navigation";
import { useGetRestaurantsQuery } from "../store/api";
import Theme from "../theme";

const HomeScreen = () => {
  const navigation =
    useNavigation<NavigationProp<BaseStackParams, Routes.Home>>();
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { isFetching, isError, error, data } = useGetRestaurantsQuery({
    categories: selected ?? undefined,
    name: debouncedSearch ?? undefined,
  });
  const shouldShowData = !isFetching && !isError;

  return (
    <BaseScreen
      scrollable
      noSpacing
      showsVerticalScrollIndicator={false}
      safeAreaProps={{ style: { backgroundColor: Theme.colors.white } }}
    >
      <StatusBar translucent backgroundColor="transparent" />

      <Column flex={1}>
        <ImageBackground
          style={{ height: 400, flex: 1 }}
          resizeMode="cover"
          source={{
            height: 400,
            uri: "https://images.pexels.com/photos/375467/pexels-photo-375467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
        >
          <Column
            flexGrow={1}
            justifyContent="center"
            alignItems="center"
            gap={Theme.spacing.sm}
          >
            <Column
              justifyContent="center"
              alignItems="center"
              paddingHorizontal={Theme.spacing.sm}
            >
              <SearchInput
                placeholder="Ex: sushi"
                value={search}
                onChangeText={setSearch}
              />
            </Column>

            <CategoryList
              categories={restaurantCategories}
              selected={selected}
              onSelectedChange={setSelected}
            />
          </Column>
          <View style={styles.roundedSection} />
        </ImageBackground>
        <Column
          backgroundColor={Theme.colors.white}
          paddingHorizontal={Theme.spacing.sm}
          paddingBottom={Theme.spacing.lg}
          gap={Theme.spacing.md}
        >
          {isFetching && <CardShimmer />}
          {isError && <TextBody>{JSON.stringify(error)}</TextBody>}
          {shouldShowData &&
            data?.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onPress={() =>
                  navigation.navigate(Routes.Products, {
                    resturantId: restaurant.id,
                  })
                }
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

export default HomeScreen;
