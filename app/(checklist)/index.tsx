import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import { appleRed } from "@/constants/Colors";
import { useAlert } from "@/hooks/useAlert";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const CheckListApp = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };

  const handleDeletePress = async () => {
    await user?.delete();
    router.replace("/(auth)");
  };

  const { showAlert, alertComponent, hideAlert } = useAlert();

  const handleDeleteAccount = () => {
    console.log("Delete account button pressed");

    showAlert({
      title: "Delete account",
      message:
        "Are you sure you want to delete your account? This action is irreversible!",
      animationType: "scale",
      buttons: [
        {
          text: "Delete",
          onPress: () => {
            handleDeletePress();
            hideAlert();
            console.log("User Deleted account");
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            hideAlert();
            console.log("User canceled");
          },
        },
      ],
    });
  };

  return (
    <View>
      <ThemedText type="title">CheckListApp</ThemedText>
      <Button
        onPress={handleSignOut}
        variant="ghost"
        textStyle={{ color: appleRed }}
      >
        Sign out
      </Button>

      <Button
        onPress={handleDeleteAccount}
        variant="ghost"
        textStyle={{ color: "gray" }}
      >
        Delete account
      </Button>

      {alertComponent}
    </View>
  );
};

export default CheckListApp;
