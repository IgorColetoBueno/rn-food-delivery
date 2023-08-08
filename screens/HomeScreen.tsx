import BaseScreen from "../components/base-screen";  
import CardShimmer from "../components/card/CardShimmer";
import RestaurantCard from "../components/card/restaurant-card";
import { Column } from "../components/flex";
import { TextBody, TextH1, TextH4 } from "../components/typography";
import { useGetRestaurantsQuery } from "../store/api";
import Theme from "../theme";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  const { isLoading, isError, error, data } = useGetRestaurantsQuery();
  const shouldShowData = !isLoading && !isError;

  return (
    <BaseScreen scrollable>
      <Column gap={Theme.spacing.xl}>
        <TextH1>RN Food Delivery</TextH1>
        <Column gap={Theme.spacing.md}>
          {isLoading && <CardShimmer />}
          {isError && <TextBody>{JSON.stringify(error)}</TextBody>}
          {shouldShowData &&
            data?.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)}
        </Column>
      </Column>
    </BaseScreen>
  );
};

export default HomeScreen;
