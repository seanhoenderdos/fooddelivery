import useAuthStore from "@/store/auth.store";
import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import './globals.css';

Sentry.init({
  dsn: 'https://66acae1274bfc2bd9e09f0c4d425a9b5@o4507423845580800.ingest.us.sentry.io/4509825390018560',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});


export default Sentry.wrap(function RootLayout() {
  const {isLoading, fetchAuthenticatedUser} = useAuthStore();
  const { width, height } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === "web" && width >= 768;

  const [fontsLoaded, error] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
  });
  

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  const app = <Stack screenOptions={{ headerShown: false }} />;

  if (!isDesktopWeb) {
    return app;
  }

  const iphone17AspectRatio = 149.6 / 71.5;
  const maxFrameHeight = height - 96;
  const frameWidth = Math.min(374, Math.max(300, maxFrameHeight / iphone17AspectRatio));
  const frameHeight = frameWidth * iphone17AspectRatio;

  return (
    <View
      style={{
        flex: 1,
        minHeight: height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f0ea",
        paddingHorizontal: 24,
        paddingVertical: 24,
      }}
    >
      <View
        style={{
          width: frameWidth,
          height: frameHeight,
          borderRadius: 46,
          backgroundColor: "#111111",
          padding: 7,
          boxShadow: "0 24px 80px rgba(24, 28, 46, 0.22)",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 18,
            left: "50%",
            width: 108,
            height: 30,
            marginLeft: -54,
            borderRadius: 999,
            backgroundColor: "#080808",
            zIndex: 2,
          }}
        />
        <View
          style={{
            flex: 1,
            overflow: "hidden",
            borderRadius: 39,
            backgroundColor: "#ffffff",
          }}
        >
          {app}
        </View>
      </View>
    </View>
  );
});
