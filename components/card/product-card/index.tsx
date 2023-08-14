import { Image, TouchableOpacity } from "react-native";

import { Product } from "../../../model/product";
import Theme from "../../../theme";
import { formatMoney } from "../../../util/money";
import { Column, Row } from "../../flex";
import { TextBody2, TextH4 } from "../../typography";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard = ({
  product: { name, photos, value, description },
  onPress,
}: ProductCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row borderRadius={Theme.spacing.sm} gap={Theme.spacing.sm}>
        <Image
          height={100}
          width={100}
          source={{ uri: photos[0], cache: "force-cache" }}
          style={{
            borderRadius: Theme.spacing.sm,
          }}
        />
        <Column flex={1} gap={Theme.spacing.xs}>
          <Row>
            <TextH4>{name}</TextH4>
          </Row>
          <Row>
            <TextBody2>{description}</TextBody2>
          </Row>
          <Row>
            <TextBody2>{formatMoney(value)}</TextBody2>
          </Row>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};

export default ProductCard;
