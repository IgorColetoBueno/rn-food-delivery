import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, LayoutChangeEvent, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import Button from "../../components/button";
import PhotoCarousel from "../../components/carousel";
import Box, { Column, Row } from "../../components/flex";
import NumberInput from "../../components/number-input";
import { TextBody, TextH2 } from "../../components/typography";
import { useAppState } from "../../store";
import { removeDetailProduct } from "../../store/detailSlice";
import Theme from "../../theme";

const ProductDetail = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch();
  const detail = useAppState((q) => q.detail.detail);
  const [quantity, setQuantity] = useState(1);
  const { bottom } = useSafeAreaInsets();

  // Set default to 92% of the screen height initially
  const [dynamicSnapPoints, setDynamicSnapPoints] = useState<string[]>([
    "90%",
    "90%",
  ]);

  useEffect(() => {
    if (detail) {
      bottomSheetRef.current?.snapToIndex(1);
      setQuantity(1);
    }
  }, [detail]);

  const onClose = useCallback(async () => {
    await dispatch(removeDetailProduct());
    bottomSheetRef.current?.snapToIndex(-1);
  }, [dispatch]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: viewHeight } = event.nativeEvent.layout;
    const screenHeight = Dimensions.get("window").height;

    const percentage = Math.round((viewHeight / screenHeight) * 100);

    if (percentage > 0) {
      setDynamicSnapPoints([`${percentage}%`, `${percentage}%`]);
    }
  }, []);

  return (
    <BottomSheet
      enablePanDownToClose
      onClose={onClose}
      ref={bottomSheetRef}
      index={-1}
      snapPoints={dynamicSnapPoints}
      backdropComponent={(props: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
          />
        );
      }}
    >
      <BottomSheetView onLayout={onLayout}>
        <Column gap={Theme.spacing.sm}>
          <Column gap={Theme.spacing.xxs} paddingHorizontal={Theme.spacing.md}>
            <TextH2 family="poppins">{detail?.name}</TextH2>
            <TextBody>{detail?.description}</TextBody>
          </Column>
          <PhotoCarousel images={detail?.photos || []} />
          <Row
            alignItems="center"
            paddingHorizontal={Theme.spacing.md}
            gap={Theme.spacing.lg}
          >
            <Box flexGrow={0.5}>
              <NumberInput
                value={quantity.toString()}
                onChangeText={(e) => setQuantity(+e)}
                editable={false}
              />
            </Box>
            <Box flexGrow={1}>
              <Button backgroundColor="red" title="Add item" />
            </Box>
          </Row>
          <View style={{ height: bottom + Theme.spacing.lg }} />
        </Column>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ProductDetail;
