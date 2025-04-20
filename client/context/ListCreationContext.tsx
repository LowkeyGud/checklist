import React, { createContext, useContext, useState } from "react";

type ListCreationContextType = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedEmoji: (emoji: string) => void;
  setSelectedColor: (color: string) => void;
};

const ListCreationContext = createContext<ListCreationContextType | undefined>(
  undefined
);

export function ListCreationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedEmoji, setSelectedEmoji] = useState("🛒"); // Default emoji
  const [selectedColor, setSelectedColor] = useState("#9CCAFF"); // Default color

  return (
    <ListCreationContext.Provider
      value={{
        selectedEmoji,
        selectedColor,
        setSelectedEmoji,
        setSelectedColor,
      }}
    >
      {children}
    </ListCreationContext.Provider>
  );
}

export function useListCreation() {
  const context = useContext(ListCreationContext);
  if (context === undefined) {
    throw new Error(
      "useListCreation must be used within a ListCreationProvider"
    );
  }
  return context;
}
