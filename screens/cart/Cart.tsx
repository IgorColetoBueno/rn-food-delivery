import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppState } from "../../store";

const snapPoints = ["25%", "50%"];

const Cart = () => {
  const cart = useAppState((q) => q.cart);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  if (!cart.items.length) return null;

  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Cart;
