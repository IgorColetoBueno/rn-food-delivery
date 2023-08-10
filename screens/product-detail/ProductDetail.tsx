import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppState } from "../../store";
import { removeDetailProduct } from "../../store/detailSlice";
import PhotoCarousel from "../../components/carousel";
import { Column } from "../../components/flex";
import Theme from "../../theme";
import { TextBody, TextH2, TextH4 } from "../../components/typography";

const snapPoints = ["10%", "80%"];

const ProductDetail = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useAppDispatch();
  const detail = useAppState((q) => q.detail.detail);

  useEffect(() => {
    if (detail) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [detail]);

  const onClose = useCallback(async () => {
    await dispatch(removeDetailProduct());
    bottomSheetRef.current?.snapToIndex(-1);
  }, []);

  return (
    <BottomSheet
      onClose={onClose}
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
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
      <Column gap={Theme.spacing.sm} >
        <Column gap={Theme.spacing.xxs} paddingHorizontal={Theme.spacing.md}>
          <TextH2 family="poppins">{detail?.name}</TextH2>
          <TextBody>{detail?.description}</TextBody>
        </Column>
        <PhotoCarousel images={detail?.photos || []} />
      </Column>
    </BottomSheet>
  );
};

export default ProductDetail;
