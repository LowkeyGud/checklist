import { appleBlue, zincColors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * A customizable button component for React Native applications.
 *
 * This component supports multiple variants, sizes, and themes, and includes
 * features like loading state and disabled state. It adapts to light and dark
 * modes using the `useColorScheme` hook.
 *
 * @component
 * @param {Object} props - The properties for the Button component.
 * @param {() => void} props.onPress - Callback function triggered when the button is pressed.
 * @param {"filled" | "outline" | "ghost"} [props.variant="filled"] - The visual style of the button.
 *    - `"filled"`: A solid background button.
 *    - `"outline"`: A button with a border and transparent background.
 *    - `"ghost"`: A button with no background or border.
 * @param {"sm" | "md" | "lg"} [props.size="md"] - The size of the button.
 *    - `"sm"`: Small size.
 *    - `"md"`: Medium size (default).
 *    - `"lg"`: Large size.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled. Disabled buttons are non-interactive and have reduced opacity.
 * @param {boolean} [props.loading=false] - Whether the button is in a loading state. Displays a spinner instead of the button text when true.
 * @param {React.ReactNode} props.children - The content to display inside the button, typically text.
 * @param {StyleProp<ViewStyle>} [props.style] - Additional styles for the button container.
 * @param {StyleProp<TextStyle>} [props.textStyle] - Additional styles for the button text.
 *
 * @returns {React.ReactElement} A styled button component.
 *
 * @example
 * ```tsx
 * <Button
 *   onPress={() => console.log("Button pressed")}
 *   variant="outline"
 *   size="lg"
 *   disabled={false}
 *   loading={false}
 *   style={{ margin: 10 }}
 *   textStyle={{ fontSize: 18 }}
 * >
 *   Click Me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  /**
   * A mapping of button sizes to their corresponding style properties.
   *
   * This object defines the height, font size, and padding for each button size.
   * It is used to standardize the appearance of buttons across the application.
   *
   * @typeParam ButtonSize - A union type representing the available button sizes (e.g., 'sm', 'md', 'lg').
   *
   * @property sm - Style properties for a small button:
   *   - `height`: The height of the button in pixels (36px).
   *   - `fontSize`: The font size of the button text in pixels (14px).
   *   - `padding`: The padding inside the button in pixels (12px).
   *
   * @property md - Style properties for a medium button:
   *   - `height`: The height of the button in pixels (44px).
   *   - `fontSize`: The font size of the button text in pixels (16px).
   *   - `padding`: The padding inside the button in pixels (16px).
   *
   * @property lg - Style properties for a large button:
   *   - `height`: The height of the button in pixels (55px).
   *   - `fontSize`: The font size of the button text in pixels (18px).
   *   - `padding`: The padding inside the button in pixels (20px).
   */
  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 12 },
    md: { height: 44, fontSize: 16, padding: 16 },
    lg: { height: 55, fontSize: 18, padding: 20 },
  };

  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[50] : zincColors[900],
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? zincColors[700] : zincColors[300],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }

    switch (variant) {
      case "filled":
        return isDark ? zincColors[900] : zincColors[50];
      case "outline":
      case "ghost":
        return appleBlue;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyle(),
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
          style={StyleSheet.flatten([
            // Flattens an array of style objects, into one aggregated single style object
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: "700",
            },
            textStyle,
          ])}
        >
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
};

export default Button;
