import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";

import { CartItem } from "../../../model/cart";
import { useAppDispatch } from "../../../store";
import { removeItem, updateQuantity } from "../../../store/cartSlice";
import Theme from "../../../theme";
import { formatMoney } from "../../../util/money";
import Box, { Column, Row } from "../../flex";
import NumberInput from "../../number-input";
import { TextBody, TextBody2, TextH4 } from "../../typography";

interface ProductCartItemProps {
  cartItem: CartItem;
  onPress: () => void;
}

const ProductCartItem = ({
  cartItem: {
    product: { name, photos, value, description, id },
    quantity,
  },
  onPress,
}: ProductCartItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity hitSlop={Theme.spacing.sm} onPress={onPress}>
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
          <Row alignItems="center" gap={Theme.spacing.sm}>
            <Box flexGrow={1} minWidth={100}>
              <NumberInput
                editable={false}
                flat
                value={quantity.toString()}
                onChangeText={(e) =>
                  dispatch(updateQuantity({ id, quantity: +e }))
                }
              />
            </Box>
            <TextBody>x</TextBody>
            <Box flexGrow={1}>
              <TextBody>
                {formatMoney(value)} = {formatMoney(quantity * value)}
              </TextBody>
            </Box>
          </Row>
        </Column>
        <Row alignItems="center">
          <TouchableOpacity onPress={() => dispatch(removeItem(id))}>
            <Ionicons
              size={Theme.spacing.md}
              name="trash"
              color={Theme.colors.red}
            />
          </TouchableOpacity>
        </Row>
      </Row>
    </TouchableOpacity>
  );
};

export default ProductCartItem;
