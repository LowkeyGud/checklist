import { appleRed, borderColor } from "@/constants/Colors";
import { useDelCheckListCallback } from "@/stores/CheckListsStore";
import {
  useCheckListProductCount,
  useCheckListUserNicknames,
  useCheckListValue,
} from "@/stores/CheckListStore";
import { safeImpactSoft } from "@/utils/SafeHaptics";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  default as Animated,
  configureReanimatedLogger,
  FadeIn,
  default as Reanimated,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { IconCircle } from "./IconCircle";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

configureReanimatedLogger({ strict: false });

export default function CheckListItem({ listId }: { listId: string }) {
  // Listening to just these cells means that the component won't unnecessarily
  // re-render if anything else in the row changes (such as the timestamps).
  const [name] = useCheckListValue(listId, "name");
  const [emoji] = useCheckListValue(listId, "emoji");
  const [color] = useCheckListValue(listId, "color");
  const productCount = useCheckListProductCount(listId);
  const userNicknames = useCheckListUserNicknames(listId);

  const deleteCallback = useDelCheckListCallback(listId);

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + 200 }],
    }));

    return (
      <Pressable
        onPress={() => {
          safeImpactSoft();
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
    <Animated.View entering={FadeIn}>
      <ReanimatedSwipeable
        key={listId}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        overshootRight={false}
        enableContextMenu
      >
        <Link href={{ pathname: "/list/[listId]", params: { listId } }}>
          <View style={styles.swipeable}>
            <View style={styles.leftContent}>
              <IconCircle emoji={emoji} backgroundColor={color} />
              <View style={styles.textContent}>
                <ThemedText type="defaultSemiBold" numberOfLines={2}>
                  {name}
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.productCount}>
                  {productCount} product{productCount == 1 ? "" : "s"}
                </ThemedText>
              </View>
            </View>

            <View style={styles.rightContent}>
              {userNicknames.length > 1 && (
                <View style={styles.nicknameContainer}>
                  {userNicknames.length === 4
                    ? // Show all 4 letters when length is exactly 4
                      userNicknames.map((nickname, index) => (
                        <NicknameCircle
                          key={nickname}
                          nickname={nickname}
                          color={color}
                          index={index}
                        />
                      ))
                    : userNicknames.length > 4
                    ? // Show first 3 letters and ellipsis when length > 4
                      userNicknames
                        .slice(0, 4)
                        .map((nickname, index) => (
                          <NicknameCircle
                            key={nickname}
                            nickname={nickname}
                            color={color}
                            index={index}
                            isEllipsis={index === 3}
                          />
                        ))
                    : // Show all letters when length is 2 or 3
                      userNicknames.map((nickname, index) => (
                        <NicknameCircle
                          key={nickname}
                          nickname={nickname}
                          color={color}
                          index={index}
                        />
                      ))}
                </View>
              )}
              <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
            </View>
          </View>
        </Link>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}

export const NicknameCircle = ({
  nickname,
  color,
  index = 0,
  isEllipsis = false,
}: {
  nickname: string;
  color: string;
  index?: number;
  isEllipsis?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemedText
      type="defaultSemiBold"
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          backgroundColor: color,
          borderColor: isDark ? "#000000" : "#ffffff",
          marginLeft: index > 0 ? -6 : 0,
        },
      ]}
    >
      {isEllipsis ? "..." : nickname[0].toUpperCase()}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    width: 200,
    height: 65,
    backgroundColor: appleRed,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeable: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  textContent: {
    flexShrink: 1,
  },
  productCount: {
    fontSize: 12,
    color: "gray",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nicknameContainer: {
    flexDirection: "row",
    marginRight: 4,
  },
  nicknameCircle: {
    fontSize: 12,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    padding: 1,
    width: 24,
    height: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  ellipsisCircle: {
    lineHeight: 0,
    marginLeft: -6,
  },
});
