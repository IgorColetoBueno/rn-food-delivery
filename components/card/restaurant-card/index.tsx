import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
import { Image, TouchableOpacity } from "react-native";

import { Restaurant } from "../../../model/restaurant";
import Theme from "../../../theme";
import { formatMoney } from "../../../util/money";
import { Column, Row } from "../../flex";
import { TextBody, TextBody2, TextH4 } from "../../typography";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
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
    id,
  },
  onPress,
}: RestaurantCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row borderRadius={Theme.spacing.sm} gap={Theme.spacing.sm}>
        <Image
          height={100}
          width={100}
          source={{ uri: photo, cache: "force-cache" }}
          style={{
            borderRadius: Theme.spacing.sm,
          }}
        />
        <Column flex={1} gap={Theme.spacing.xs}>
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
                  <Fragment key={id + category}>
                    <TextBody2>{category}</TextBody2>
                    <Ionicons size={6} name="ios-remove" />
                  </Fragment>
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
    </TouchableOpacity>
  );
};

export default RestaurantCard;
