import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/button";
import ProductCartItem from "../../components/card/product-cart-item";
import Box, { Column, Row } from "../../components/flex";
import { TextBody2, TextH4 } from "../../components/typography";
import { useAppState } from "../../store";
import Theme from "../../theme";
import { formatMoney } from "../../util/money";

const Cart = () => {
  const cart = useAppState((q) => q.cart);
  const detail = useAppState((q) => q.detail.detail);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom } = useSafeAreaInsets();
  const [index, setIndex] = useState(-1);

  // Set default to 92% of the screen height initially
  const [dynamicSnapPoints, setDynamicSnapPoints] = useState<string[]>([
    "75%",
    "75%",
  ]);

  const deliverPrice = useMemo(() => {
    const restaurantIds = [
      ...new Set(cart.items.map((q) => q.product.restaurantId)),
    ];

    return restaurantIds
      .map(
        (id) =>
          cart.items.find((q) => q.product.restaurant!.id === id)?.product
            .restaurant
      )
      .reduce((prv, curr) => prv + (curr?.deliverPrice ?? 0), 0);
  }, [cart.items]);

  const totalValue = useMemo(() => {
    const itemsValue = cart.items.reduce((prev, curr) => {
      return curr.quantity * curr.product.value + prev;
    }, 0);

    return itemsValue + deliverPrice;
  }, [cart.items, deliverPrice]);

  const totalQuantity = useMemo(() => {
    return cart.items.reduce((prev, curr) => {
      return curr.quantity + prev;
    }, 0);
  }, [cart.items]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: viewHeight } = event.nativeEvent.layout;
    const screenHeight = Dimensions.get("window").height;

    const percentage = Math.round((viewHeight / screenHeight) * 100);

    if (percentage > 0) {
      setDynamicSnapPoints([`${percentage}%`, `75%`]);
    }
  }, []);

  useEffect(() => {
    if (detail || cart.items.length === 0) {
      bottomSheetRef.current?.close();
      return;
    }
    if (cart && index < 0 && !detail) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [cart, detail, index]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={dynamicSnapPoints}
      onChange={setIndex}
      handleStyle={styles.handle}
      enablePanDownToClose
      backdropComponent={(props: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
          />
        );
      }}
      style={{
        borderWidth: 0.5,
        borderColor: Theme.colors["dark-gray"],
        borderTopLeftRadius: Theme.spacing.sm,
        borderTopRightRadius: Theme.spacing.sm,
      }}
    >
      <BottomSheetView
        style={{
          zIndex: 5,
          flex: 1,
          borderTopLeftRadius: Theme.spacing.sm,
          borderTopRightRadius: Theme.spacing.sm,
          backgroundColor: "white",
        }}
      >
        <Column flex={1} paddingHorizontal={Theme.spacing.sm}>
          {index === 1 && (
            <ScrollView
              alwaysBounceVertical={false}
              bounces={false}
              overScrollMode="never"
            >
              <Column flex={1} gap={Theme.spacing.sm}>
                {cart.items.map((cartItem, index) => (
                  <ProductCartItem
                    key={`cart-item-${index}`}
                    cartItem={cartItem}
                    onPress={() => {}}
                  />
                ))}
              </Column>
            </ScrollView>
          )}
          <View onLayout={onLayout}>
            <Pressable
              disabled={index === 1}
              onPress={() => bottomSheetRef.current?.expand()}
            >
              <Row
                gap={Theme.spacing.sm}
                alignItems="center"
                justifyContent="space-between"
              >
                <Column>
                  <Row>
                    <TextBody2>Total with</TextBody2>
                    <TextBody2 weight="semibold">
                      {" "}
                      {formatMoney(deliverPrice)} of delivery
                    </TextBody2>
                  </Row>
                  <Row alignItems="center" gap={Theme.spacing.xxs}>
                    <TextH4 weight="bold">{formatMoney(totalValue)}</TextH4>
                    <TextBody2>/</TextBody2>
                    <TextBody2>{totalQuantity} items</TextBody2>
                  </Row>
                </Column>
                <Box justifyContent="flex-end" alignItems="center">
                  <Button
                    disabled={index === 0}
                    style={{ width: 120 }}
                    title="Buy"
                    backgroundColor="red"
                    onPress={() => alert("Buy flow finished!")}
                  />
                </Box>
              </Row>
              <View style={{ height: bottom + Theme.spacing.xl }} />
            </Pressable>
          </View>
        </Column>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handle: {
    borderTopRightRadius: Theme.spacing.sm,
    borderTopLeftRadius: Theme.spacing.sm,
  },
});

export default Cart;
