import React, { useRef, useEffect } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolateColor,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

interface Props {
  images: string[];
}

const PhotoCarousel = ({ images }: Props) => {
  const scrollX = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item, index) => item + index.toString()}
        onScroll={(e) => {
          try {
            scrollHandler(e);
          } catch (error) {}
        }}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Animated.Image
              source={{ uri: item }}
              style={[
                styles.image,
                { transform: [{ translateX: -scrollX.value }] },
              ]}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width,
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 10,
  },
});

export default PhotoCarousel;