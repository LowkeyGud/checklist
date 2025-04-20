import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import {
  useCheckListProductCell,
  useCheckListProductCreatedByNickname,
  useCheckListUserNicknames,
} from "@/stores/CheckListStore";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ProductScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };

  // Check if the product exists by trying to get any of its properties
  const [name] = useCheckListProductCell(listId, productId, "name");

  // If the product doesn't exist anymore, redirect to the list
  React.useEffect(() => {
    if (name === undefined) {
      router.replace(`/list/${listId}`);
    }
  }, [listId, name]);

  // If the product is deleted, show nothing while redirecting
  if (name === undefined) {
    return null;
  }

  return <ProductContent listId={listId} productId={productId} />;
}

function ProductContent({
  listId,
  productId,
}: {
  listId: string;
  productId: string;
}) {
  const [name, setName] = useCheckListProductCell(listId, productId, "name");
  const [quantity, setQuantity] = useCheckListProductCell(
    listId,
    productId,
    "quantity"
  );
  const [units, setUnits] = useCheckListProductCell(listId, productId, "units");
  const [notes, setNotes] = useCheckListProductCell(listId, productId, "notes");
  const createdBy = useCheckListProductCreatedByNickname(listId, productId);
  const [createdAt] = useCheckListProductCell(listId, productId, "createdAt");
  const userNicknames = useCheckListUserNicknames(listId);

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}
    >
      <ThemedText
        type="default"
        style={{ marginBottom: 8, opacity: 0.3, fontWeight: "800" }}
      >
        Asterik(*) indicates the editable fields.
      </ThemedText>
      <FieldItem label="Product name" value={name} onChangeText={setName} />
      <FieldItem label="Created by" value={createdBy ?? "unknown"} />
      <FieldItem
        label="Created at"
        value={createdAt ? new Date(createdAt).toDateString() : "unknown"}
      />
      <FieldItem
        label="Quantity"
        value={quantity.toString()}
        onChangeText={(value) => setQuantity(Number(value))}
      />
      <FieldItem label="Units" value={units} onChangeText={setUnits} />
      <View
        style={{
          gap: 8,
        }}
      >
        <ThemedText type="defaultSemiBold">Notes*</ThemedText>
        <TextInput
          value={notes ?? "(none)"}
          editable={true}
          onChangeText={setNotes}
          variant="ghost"
          placeholder="Add a note..."
          size="sm"
          inputStyle={{ padding: 0 }}
        />
      </View>
      <ThemedText type="defaultSemiBold">Shared with</ThemedText>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {userNicknames.map((nickname, index) => (
          <ThemedText key={nickname} type="default">
            {nickname}
            {index < userNicknames.length - 1 ? ", " : ""}
          </ThemedText>
        ))}
      </View>
    </BodyScrollView>
  );
}

function FieldItem({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <ThemedText type="defaultSemiBold">
        {label}
        {onChangeText !== undefined && "*"}
      </ThemedText>
      <TextInput
        value={value}
        editable={onChangeText !== undefined}
        onChangeText={onChangeText}
        variant="ghost"
        placeholder="..."
        size="sm"
        containerStyle={{ maxWidth: "60%" }}
        inputStyle={{ padding: 0, margin: 0, textAlign: "right" }}
      />
    </View>
  );
}
