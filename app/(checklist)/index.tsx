import CheckListItem from "@/components/CheckListItem";
import { IconCircle } from "@/components/IconCircle";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { backgroundColors } from "@/constants/Colors";
import { useCheckListIds } from "@/stores/CheckListsStore";
import { safeImpactMedium } from "@/utils/SafeHaptics";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { FlatList, Platform, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";

const ICON_COLOR = "#007AFF";

const CheckListApp = () => {
  const router = useRouter();
  const CheckListIds = useCheckListIds();
  const handleNewListPress = () => {
    safeImpactMedium();
    router.push("/list/new");
  };

  const handleProfilePress = () => {
    safeImpactMedium();
    router.push("/(checklist)/profile");
  };
  const renderHeaderRight = () => (
    <Pressable onPress={handleNewListPress} style={styles.headerButton}>
      <IconSymbol name="plus" color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={handleProfilePress}
      style={[styles.headerButton, styles.headerButtonLeft]}
    >
      <IconSymbol
        name="gear"
        color={ICON_COLOR}
        style={{ marginRight: Platform.select({ default: 0, android: 8 }) }}
      />
    </Pressable>
  );

  const renderEmptyList = () => (
    <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
      <IconCircle
        emoji="🛒"
        backgroundColor={
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }
      />
      <Button onPress={handleNewListPress} variant="ghost">
        Create your first list
      </Button>
    </BodyScrollView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Check lists",
          headerTitleAlign: "center",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <FlatList
        data={CheckListIds}
        renderItem={({ item: listId }) => <CheckListItem listId={listId} />}
        contentContainerStyle={styles.listContainer}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={renderEmptyList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 100,
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
});

export default CheckListApp;
