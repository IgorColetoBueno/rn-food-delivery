import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { Restaurant } from "../../../model/restaurant";
import Theme from "../../../theme";
import { Column, Row } from "../../flex";
import { TextBody, TextBody2, TextH4 } from "../../typography";
import { formatMoney } from "../../../util/money";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({
  restaurant: {
    name,
    photo,
    rate,
    categories,
    distance,
    averageTime,
    deliverPrice,
  },
}: RestaurantCardProps) => {
  return (
    <Row borderRadius={Theme.spacing.sm} gap={Theme.spacing.sm}>
      <Image
        height={100}
        width={100}
        source={{ uri: photo, cache: "force-cache" }}
        style={{
          borderRadius: Theme.spacing.sm,
        }}
      />
      <Column flex={1} gap={Theme.spacing.xs} flexWrap="wrap" width={150}>
        <Row>
          <TextH4>{name}</TextH4>
        </Row>
        <Row gap={Theme.spacing.xxs} alignItems="center">
          <Ionicons color={Theme.colors.yellow} name="star" />
          <TextBody color="yellow">{rate}</TextBody>
          <Ionicons size={6} name="ios-remove" />
          <Row alignItems="center" gap={Theme.spacing.xxs}>
            {categories.map((category) => {
              return (
                <>
                  <TextBody2>{category}</TextBody2>
                  <Ionicons size={6} name="ios-remove" />
                </>
              );
            })}
          </Row>
          <Row>
            <TextBody2>{distance} Km</TextBody2>
          </Row>
        </Row>
        <Row gap={Theme.spacing.xxs} alignItems="center">
          <TextBody2>{averageTime}</TextBody2>
          <Ionicons size={6} name="ios-remove" />
          <TextBody2>{formatMoney(deliverPrice)}</TextBody2>
        </Row>
      </Column>
    </Row>
  );
};

export default RestaurantCard;
