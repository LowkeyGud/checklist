import { zincColors } from "@/constants/Colors";
import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";

type InputVariant = "default" | "filled" | "outlined" | "ghost";
type InputSize = "sm" | "md" | "lg";

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
}

/**
 * A customizable `TextInput` component for React Native that supports multiple styles, sizes, and themes.
 *
 * @component
 * @param {TextInputProps} props - The props for the `TextInput` component.
 * @param {string} [props.label] - Optional label text displayed above the input field.
 * @param {string} [props.error] - Optional error message displayed below the input field.
 * @param {"default" | "filled" | "outlined" | "ghost"} [props.variant="default"] - The visual style of the input field.
 * @param {"sm" | "md" | "lg"} [props.size="md"] - The size of the input field, affecting height, font size, and padding.
 * @param {StyleProp<ViewStyle>} [props.containerStyle] - Custom styles for the container wrapping the input field.
 * @param {StyleProp<TextStyle>} [props.inputStyle] - Custom styles for the input field itself.
 * @param {boolean} [props.disabled=false] - Whether the input field is disabled and non-editable.
 * @param {TextInputProps} [props.props] - Additional props passed to the underlying `RNTextInput` component.
 *
 * @returns {React.ReactElement} A styled text input component with optional label and error message.
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Username"
 *   variant="outlined"
 *   size="lg"
 *   error="This field is required"
 *   containerStyle={{ marginBottom: 16 }}
 *   inputStyle={{ color: 'blue' }}
 *   placeholder="Enter your username"
 * />
 * ```
 */
export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  variant = "default",
  size = "md",
  containerStyle,
  inputStyle,
  disabled = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizeStyles: Record<
    InputSize,
    { height?: number; fontSize: number; padding: number }
  > = {
    sm: { fontSize: 16, padding: 8 },
    md: { height: 50, fontSize: 16, padding: 14 },
    lg: { height: 55, fontSize: 32, padding: 16 },
  };

  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      backgroundColor: isDark ? zincColors[900] : "rgb(229, 229, 234)",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[700] : zincColors[100],
        };
      case "outlined":
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: isDark ? zincColors[600] : zincColors[200],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }
    return isDark ? zincColors[50] : zincColors[900];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View style={[getVariantStyle(), disabled && styles.disabled]}>
        <RNTextInput
          style={[
            {
              height: sizeStyles[size].height,
              fontSize: sizeStyles[size].fontSize,
              padding: sizeStyles[size].padding,
              color: getTextColor(),
            },
            inputStyle,
          ]}
          placeholderTextColor={isDark ? zincColors[500] : zincColors[400]}
          editable={!disabled}
          {...props}
        />
      </View>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  error: {
    color: "#ef4444", // red-500
    marginTop: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default TextInput;
