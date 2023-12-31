import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { Routes, Stack } from "./navigation";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import Cart from "./screens/cart/Cart";
import ProductDetail from "./screens/product-detail/ProductDetail";
import { store } from "./store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "garamond-bold": require("./assets/fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf"),
    "garamond-semibold": require("./assets/fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf"),
    "garamond-regular": require("./assets/fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar translucent backgroundColor="transparent" />

          <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator
              initialRouteName={Routes.Home}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name={Routes.Home} component={HomeScreen} />
              <Stack.Screen name={Routes.Products} component={ProductsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          <ProductDetail />
          <Cart />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
