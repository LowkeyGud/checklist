import { appleRed, borderColor } from "@/constants/Colors";
import {
  useCheckListProductCell,
  useCheckListValue,
  useDelCheckListProductCallback,
} from "@/stores/CheckListStore";
import { safeImpactMedium, safeImpactSoft } from "@/utils/SafeHaptics";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

export default function CheckListProductItem({
  listId,
  productId,
}: {
  listId: string;
  productId: string;
}) {
  const router = useRouter();
  const [name] = useCheckListProductCell(listId, productId, "name");
  const [color] = useCheckListValue(listId, "color");
  const [isChecked, setIsChecked] = useCheckListProductCell(
    listId,
    productId,
    "isChecked"
  );

  const deleteCallback = useDelCheckListProductCallback(listId, productId);

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
      };
    });

    return (
      <Pressable
        onPress={() => {
          safeImpactMedium();
          deleteCallback();
        }}
      >
        <Reanimated.View style={[styleAnimation, styles.rightAction]}>
          <IconSymbol name="trash.fill" size={24} color="white" />
        </Reanimated.View>
      </Pressable>
    );
  };

  return (
    <ReanimatedSwipeable
      key={productId}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
      overshootRight={false}
      enableContextMenu
      containerStyle={{
        paddingBottom: 12,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Pressable
          onPress={() => {
            safeImpactSoft();
            setIsChecked(!isChecked);
          }}
        >
          <IconSymbol
            name={isChecked ? "checkmark.circle.fill" : "circle"}
            size={28}
            color={color}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/list/[listId]/product/[productId]",
              params: { listId, productId },
            });
          }}
          style={styles.swipeable}
        >
          <ThemedText
            type="defaultSemiBold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              maxWidth: "95%",
              opacity: isChecked ? 0.5 : 1,
              textDecorationLine: isChecked ? "line-through" : "none",
            }}
          >
            {name}
          </ThemedText>
          {/* <IconSymbol name="chevron.right" size={14} color="#A1A1AA" /> */}
        </Pressable>
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    gap: 8,
    paddingVertical: 8,
  },
  rightAction: {
    width: 80,
    height: 40,
    backgroundColor: appleRed,
    alignItems: "center",
    justifyContent: "center",
  },
});
