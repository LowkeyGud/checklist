import { Dimensions, Platform } from "react-native";

export const OS = Platform.OS;
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";
export const IS_WEB = Platform.OS === "web";

const { width, height } = Dimensions.get("window");
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const IS_SMALL_DEVICE = width < 375;
