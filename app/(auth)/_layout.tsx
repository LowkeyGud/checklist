import { IS_IOS } from "@/constants/Platform";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href="/(checklist)" />;

  return (
    <Stack
      screenOptions={{
        ...(!IS_IOS
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                // NEW: Make the large title transparent to match the background.
                backgroundColor: "transparent",
              },
            }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Welcome back!", headerShown: false }}
      />
      <Stack.Screen
        name="sign-in"
        options={{ headerTitle: "Sign in with Email" }}
      />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen
        name="reset-password"
        options={{ headerTitle: "Reset password" }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{ headerTitle: "Privacy Policy" }}
      />
    </Stack>
  );
}
