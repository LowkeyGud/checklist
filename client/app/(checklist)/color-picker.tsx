import { backgroundColors } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { safeImpactMedium } from "@/utils/SafeHaptics";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, View } from "react-native";

export default function ColorPickerScreen() {
  const router = useRouter();
  const { setSelectedColor } = useListCreation();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    router.back();
  };

  return (
    <FlatList
      data={backgroundColors}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            safeImpactMedium();
            handleColorSelect(item);
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: item,
            }}
          />
        </Pressable>
      )}
      numColumns={5}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: 0 }}
      scrollIndicatorInsets={{ bottom: 0 }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        paddingBottom: 100,
      }}
    />
  );
}
