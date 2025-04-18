import { Button } from "@/components/ui/button";
import { IS_IOS } from "@/constants/Platform";
import { ListCreationProvider } from "@/context/ListCreationContext";
import CheckListsStore from "@/stores/CheckListsStore";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Redirect, router, Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export default function ChecklistLayout() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <SignedIn>
      <TinyBaseProvider>
        <CheckListsStore />
        <ListCreationProvider>
          <Stack
            screenOptions={{
              ...Platform.select({
                ios: {
                  headerLargeTitle: true,
                  headerTransparent: true,
                  headerBlurEffect: "systemChromeMaterial",
                  headerLargeTitleShadowVisible: false,
                  headerShadowVisible: true,
                  headerLargeStyle: {
                    backgroundColor: "transparent",
                  },
                },
                default: {
                  headerShown: true, // For Android and web, ensure headers are visible.
                },
              }),
            }}
          >
            <Stack.Screen
              name="list/[listId]/edit"
              options={{
                presentation: IS_IOS ? "formSheet" : "card",
                headerTitle: "Edit list",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && {
                  sheetAllowedDetents: [0.5, 0.75, 1],
                  sheetGrabberVisible: true,
                  headerLargeTitle: false,
                }),
              }}
            />
            <Stack.Screen
              name="list/[listId]/product/new"
              options={{
                presentation: IS_IOS ? "formSheet" : "card",
                headerTitle: "Add product",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && {
                  sheetAllowedDetents: [0.8, 1],
                  sheetGrabberVisible: true,
                  headerLargeTitle: false,
                }),
              }}
            />
            <Stack.Screen
              name="list/new/create"
              options={{
                headerTitle: "Create new list",
                presentation: IS_IOS ? "formSheet" : "card",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && { sheetGrabberVisible: true }),
              }}
            />
            <Stack.Screen
              name="list/new/index"
              options={{
                headerTitle: "Add new list",
                presentation: IS_IOS ? "formSheet" : "card",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && { sheetGrabberVisible: true }),
              }}
            />
            <Stack.Screen
              name="list/new/scan"
              options={{
                presentation: "fullScreenModal", // fullScreenModal works cross‑platform.
                headerLargeTitle: false,
                headerTitle: "Scan QR code",
                headerLeft: () => (
                  <Button variant="ghost" onPress={() => router.back()}>
                    Cancel
                  </Button>
                ),
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="list/[listId]/product/[productId]"
              options={{
                presentation: IS_IOS ? "formSheet" : "card",
                headerTitle: "Edit Details",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && {
                  sheetAllowedDetents: [0.75, 1],
                  sheetGrabberVisible: true,
                  headerLargeTitle: false,
                }),
              }}
            />
            <Stack.Screen
              name="list/[listId]/share"
              options={{
                presentation: IS_IOS ? "formSheet" : "card",
                headerTitle: "Invite",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && {
                  sheetGrabberVisible: true,
                  headerLargeTitle: false,
                }),
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                headerTitle: "Profile",
                presentation: IS_IOS ? "formSheet" : "card",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && { sheetAllowedDetents: [0.4, 0.9] }),
              }}
            />
            <Stack.Screen
              name="emoji-picker"
              options={{
                presentation: IS_IOS ? "formSheet" : "card",
                headerTitle: "Choose an emoji",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && {
                  sheetAllowedDetents: [0.5, 0.75, 1],
                  sheetGrabberVisible: true,
                  headerLargeTitle: false,
                }),
              }}
            />
            <Stack.Screen
              name="color-picker"
              options={{
                presentation: IS_IOS ? "formSheet" : "card",
                headerTitle: "Choose a color",
                headerShown: IS_IOS ? false : true,
                ...(IS_IOS && {
                  sheetAllowedDetents: [0.5, 0.75, 1],
                  sheetGrabberVisible: true,
                  headerLargeTitle: false,
                }),
              }}
            />
          </Stack>
        </ListCreationProvider>
      </TinyBaseProvider>
    </SignedIn>
  );
}
