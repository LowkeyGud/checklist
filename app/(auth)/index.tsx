import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";

const WelcomeScreen = () => {
  return (
    <View>
      <Link href="/(auth)/sign-in">
        <ThemedText>Go to Sign In</ThemedText>
      </Link>
      <Link href="/(auth)/sign-up">
        <ThemedText>Go to Sign Up</ThemedText>
      </Link>
      <Link href="/(auth)/reset-password">
        <ThemedText>Go to Reset Password</ThemedText>
      </Link>
      <Link href="/(auth)/privacy-policy">
        <ThemedText>Go to Privacy Policy</ThemedText>
      </Link>
    </View>
  );
};

export default WelcomeScreen;
