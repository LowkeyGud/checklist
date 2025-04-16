import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import { IS_WEB } from "@/constants/Platform";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Type definitions
interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}

export interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message?: string;
  buttons?: ButtonProps[];
  onDismiss?: () => void;
  cancelable?: boolean;
  animationType?: "fade" | "scale" | "slide";
}

/**
 * CustomAlert - A cross-platform alert component for React Native & Web using Reanimated
 */
const CustomAlert: React.FC<CustomAlertProps> = ({
  visible = false,
  title = "",
  message = "",
  buttons = [{ text: "OK", onPress: () => {} }],
  onDismiss = () => {},
  cancelable = true,
  animationType = "fade",
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const progress = useSharedValue(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setIsAnimating(true);
      progress.value = withTiming(1, { duration: 300 }, () => {
        runOnJS(setIsAnimating)(false);
      });
    } else if (modalVisible) {
      setIsAnimating(true);
      progress.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setModalVisible)(false);
          runOnJS(setIsAnimating)(false);
        }
      });
    }
  }, [visible]);

  const handleDismiss = () => {
    if (cancelable && !isAnimating) {
      setIsAnimating(true);
      progress.value = withTiming(0, { duration: 200 }, (finished) => {
        if (finished) {
          runOnJS(setModalVisible)(false);
          runOnJS(setIsAnimating)(false);
          runOnJS(onDismiss)();
        }
      });
    }
  };

  const handleButtonPress = (onPress?: () => void) => {
    if (isAnimating) return; // Prevent multiple presses during animation

    setIsAnimating(true);
    progress.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(setModalVisible)(false);
        runOnJS(setIsAnimating)(false);
        if (onPress) {
          runOnJS(onPress)();
        }
      }
    });
  };

  // Animation styles based on the chosen animation type
  const animatedContainerStyle = useAnimatedStyle(() => {
    const opacity = progress.value;

    let transform = [];

    if (animationType === "scale") {
      transform.push({
        scale: interpolate(
          progress.value,
          [0, 1], // Input range : When progress.value is 0, the output will be 0.8.
          [0.8, 1], // Output range : When progress.value is 1, the output will be 1.
          Extrapolation.CLAMP
          // Clamp: Restrict the output to the outputRange.
          // Extend: Allow values to go beyond the outputRange.
        ),
      });
    } else if (animationType === "slide") {
      transform.push({
        translateY: interpolate(
          progress.value,
          [0, 1],
          [50, 0],
          Extrapolation.CLAMP
        ),
      });
    }

    return {
      opacity,
      transform,
    };
  });

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value * 0.5, // 50% black backdrop
    };
  });

  // For web platform
  if (IS_WEB) {
    if (!modalVisible) return null;

    return (
      <div style={webStyles.overlay}>
        <Pressable onPress={handleDismiss}>
          <Animated.View style={[webStyles.backdrop, backdropAnimatedStyle]} />
        </Pressable>
        <Animated.View style={[webStyles.container, animatedContainerStyle]}>
          <View
            style={[styles.alertBox, isDark && { backgroundColor: "black" }]}
          >
            {title ? (
              <ThemedText style={styles.title}>{title}</ThemedText>
            ) : null}
            {message ? (
              <ThemedText style={styles.message}>{message}</ThemedText>
            ) : null}
            <View
              style={[
                styles.buttonContainer,
                buttons.length > 2 && styles.buttonVertical,
              ]}
            >
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  style={[
                    // styles.button,
                    index > 0 && buttons.length <= 2 && styles.buttonMarginLeft,
                    index > 0 && buttons.length > 2 && styles.buttonMarginTop,
                    button.style,
                  ]}
                  variant={index === 0 ? "ghost" : "filled"}
                  textStyle={button.textStyle}
                  onPress={() => handleButtonPress(button.onPress)}
                  disabled={isAnimating}
                >
                  {button.text}
                </Button>
              ))}
            </View>
          </View>
        </Animated.View>
      </div>
    );
  }

  // For native platforms (iOS, Android)
  return (
    <Modal
      animationType="none" // We'll handle animations with Reanimated
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <Pressable onPress={handleDismiss} style={styles.backdrop}>
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        </Pressable>

        <Animated.View
          style={[
            styles.alertBox,
            animatedContainerStyle,
            isDark && { backgroundColor: "black" },
          ]}
        >
          {title ? <ThemedText style={styles.title}>{title}</ThemedText> : null}
          {message ? (
            <ThemedText style={styles.message}>{message}</ThemedText>
          ) : null}
          <View
            style={[
              styles.buttonContainer,
              buttons.length > 2 && styles.buttonVertical,
            ]}
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                style={[
                  // styles.button,
                  index > 0 && buttons.length <= 2 && styles.buttonMarginLeft,
                  index > 0 && buttons.length > 2 && styles.buttonMarginTop,
                  button.style,
                ]}
                variant={index === 0 ? "ghost" : "filled"}
                textStyle={[styles.buttonText, button.textStyle]}
                onPress={() => handleButtonPress(button.onPress)}
                disabled={isAnimating}
              >
                {button.text}
              </Button>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Web-specific styles
const webStyles = StyleSheet.create({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  container: {
    zIndex: 1001,
  },
});

// Shared styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
  },
  alertBox: {
    // backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: Platform.OS === "web" ? 350 : "80%",
    maxWidth: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonVertical: {
    flexDirection: "column",
  },
  button: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#2196F3",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonMarginLeft: {
    marginLeft: 10,
  },
  buttonMarginTop: {
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CustomAlert;
