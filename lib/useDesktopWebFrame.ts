import { Platform, useWindowDimensions } from "react-native";

export const useDesktopWebFrame = () => {
  const { width } = useWindowDimensions();

  return Platform.OS === "web" && width >= 768;
};
