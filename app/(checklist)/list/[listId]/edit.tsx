import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useListCreation } from "@/context/ListCreationContext";
import { useCheckListValue } from "@/stores/CheckListStore";
import { safeImpactMedium } from "@/utils/SafeHaptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ListScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };

  // List values
  const [name, setName] = useCheckListValue(listId, "name");
  const [description, setDescription] = useCheckListValue(
    listId,
    "description"
  );
  const [emoji, setEmoji] = useCheckListValue(listId, "emoji");
  const [color, setColor] = useCheckListValue(listId, "color");

  // List creation context
  const { selectedEmoji, selectedColor, setSelectedColor, setSelectedEmoji } =
    useListCreation();

  // Initialize context with current values
  useEffect(() => {
    setSelectedEmoji(emoji);
    setSelectedColor(color);
    return () => {
      setSelectedEmoji("");
      setSelectedColor("");
    };
  }, [listId]);

  // Update list when context changes
  useEffect(() => {
    if (selectedEmoji && selectedEmoji !== emoji) setEmoji(selectedEmoji);
    if (selectedColor && selectedColor !== color) setColor(selectedColor);
  }, [selectedEmoji, selectedColor]);

  const handleEmojiPress = () => {
    safeImpactMedium();
    router.push("/emoji-picker");
  };

  const handleColorPress = () => {
    safeImpactMedium();
    router.push("/color-picker");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button variant="ghost" onPress={() => router.back()}>
              Back
            </Button>
          ),
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            placeholder="Potatoes"
            value={name}
            onChangeText={setName}
            returnKeyType="done"
            containerStyle={styles.titleInputContainer}
          />
          <Pressable
            onPress={handleEmojiPress}
            style={[styles.emojiButton, { borderColor: color }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{emoji}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={handleColorPress}
            style={[styles.colorButton, { borderColor: color }]}
          >
            <View style={styles.colorContainer}>
              <View style={[styles.colorPreview, { backgroundColor: color }]} />
            </View>
          </Pressable>
        </View>
        <TextInput
          label="Description"
          placeholder="Potatoes are good"
          textAlignVertical="top"
          value={description}
          multiline
          numberOfLines={4}
          onChangeText={setDescription}
        />
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
    marginTop: 16,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  colorButton: {
    marginTop: 16,
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 100,
  },
});
