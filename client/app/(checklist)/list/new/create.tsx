import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useAddCheckListCallback } from "@/stores/CheckListsStore";
import { Link, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CreateListScreen = () => {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const { selectedEmoji, setSelectedEmoji, selectedColor, setSelectedColor } =
    useListCreation();

  const router = useRouter();
  const useAddCheckList = useAddCheckListCallback();

  useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    // Cleanup function to reset context when unmounting
    return () => {
      setSelectedEmoji("");
      setSelectedColor("");
    };
  }, []);

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    const listId = useAddCheckList(
      listName,
      listDescription,
      selectedEmoji,
      selectedColor
    );

    router.replace({
      pathname: "/list/[listId]",
      params: { listId },
    });
  };

  const handleCreateTestLists = () => {
    const testListNames = [
      "To-Do List",
      "Notes",
      "Reminders",
      "Checklist",
      "Projects",
      "Inventory",
      "Bookmarks",
      "Ideas",
      "Schedule",
      "Goals",
    ];

    const testEmojis = [
      "✅",
      "📝",
      "📌",
      "📋",
      "🗂️",
      "📦",
      "🔖",
      "🧠",
      "🕒",
      "🚀",
    ];

    const testColors = Object.values(backgroundColors).slice(0, 10);

    testListNames.forEach((name, index) => {
      useAddCheckList(
        name,
        `This is a test list for ${name}`,
        testEmojis[index],
        testColors[index]
      );
    });

    // Navigate back to the main list view
    router.replace("/");
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "New list",
        }}
      />
      <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Goals"
            value={listName}
            onChangeText={setListName}
            onSubmitEditing={handleCreateList}
            returnKeyType="done"
            variant="ghost"
            size="lg"
            autoFocus
            inputStyle={styles.titleInput}
            containerStyle={styles.titleInputContainer}
          />
          <Link
            href={{ pathname: "/emoji-picker" }}
            style={[styles.emojiButton, { borderColor: selectedColor }]}
          >
            <View style={styles.emojiContainer}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>
          <Link
            href={{ pathname: "/color-picker" }}
            style={[styles.colorButton, { borderColor: selectedColor }]}
          >
            <View style={styles.colorContainer}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link>
        </View>
        <TextInput
          placeholder="Description (optional)"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          inputStyle={styles.descriptionInput}
        />
        <Button
          onPress={handleCreateList}
          disabled={!listName}
          variant="ghost"
          textStyle={styles.createButtonText}
        >
          Create list
        </Button>
        <Button
          onPress={handleCreateTestLists}
          variant="ghost"
          textStyle={styles.createButtonText}
        >
          Create 10 test lists
        </Button>
      </BodyScrollView>
    </>
  );
};

export default CreateListScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
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
});
