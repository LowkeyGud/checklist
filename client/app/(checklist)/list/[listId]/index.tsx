import CheckListProductItem from "@/components/CheckListProductItem";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  useCheckListProductIds,
  useCheckListValue,
} from "@/stores/CheckListStore";
import { safeImpactMedium } from "@/utils/SafeHaptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export default function ListScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name] = useCheckListValue(listId, "name");
  const [emoji] = useCheckListValue(listId, "emoji");
  const [description] = useCheckListValue(listId, "description");
  const newProductHref = {
    pathname: "/list/[listId]/product/new",
    params: { listId },
  } as const;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: emoji + " " + name,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  safeImpactMedium();
                  router.push({
                    pathname: "/list/[listId]/share",
                    params: { listId },
                  });
                }}
                style={{ padding: 8 }}
              >
                <IconSymbol name="square.and.arrow.up" color={"#007AFF"} />
              </Pressable>
              <Pressable
                onPress={() => {
                  safeImpactMedium();
                  router.push({
                    pathname: "/list/[listId]/edit",
                    params: { listId },
                  });
                }}
                style={{ padding: 8 }}
              >
                <IconSymbol
                  name="pencil.and.list.clipboard"
                  color={"#007AFF"}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  safeImpactMedium();
                  router.push(newProductHref);
                }}
                style={{ paddingLeft: 8 }}
              >
                <IconSymbol name="plus" color={"#007AFF"} />
              </Pressable>
            </View>
          ),
        }}
      />
      <Animated.FlatList
        data={useCheckListProductIds(listId)}
        renderItem={({ item: productId }) => (
          <CheckListProductItem listId={listId} productId={productId} />
        )}
        contentContainerStyle={{
          paddingTop: 12,
        }}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={() =>
          description ? (
            <ThemedText
              style={{ paddingHorizontal: 16, fontSize: 14, color: "gray" }}
            >
              {description}
            </ThemedText>
          ) : null
        }
        ListEmptyComponent={() => (
          <Button
            onPress={() => {
              router.push(newProductHref);
              safeImpactMedium();
            }}
            // variant="ghost"
          >
            Add the first product to this list
          </Button>
        )}
      />
    </>
  );
}
