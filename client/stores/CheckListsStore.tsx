import { useCreateClientPersisterAndStart } from "@/stores/persistence/useCreateClientPersisterAndStart";
import { useUser } from "@clerk/clerk-expo";
import { randomUUID } from "expo-crypto";
import React, { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, NoValuesSchema } from "tinybase/with-schemas";
import CheckListStore from "./CheckListStore";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useCreateServerSynchronizerAndStart";

const STORE_ID_PREFIX = "CheckListsStore-";

const TABLES_SCHEMA = {
  lists: {
    id: { type: "string" },
    valuesCopy: { type: "string" },
  },
} as const;

const {
  useCell,
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useSetCellCallback,
  useSortedRowIds,
  useStore,
  useTable,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

const useStoreId = () => STORE_ID_PREFIX + useUser().user.id;

// Returns a callback that adds a new Check list to the store.
export const useAddCheckListCallback = () => {
  const store = useStore(useStoreId());
  return useCallback(
    (name: string, description: string, emoji: string, color: string) => {
      const id = randomUUID();
      store.setRow("lists", id, {
        id,
        valuesCopy: JSON.stringify({
          id,
          name,
          description,
          emoji,
          color,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      return id;
    },
    [store]
  );
};

// Returns a callback that adds an existing Check list to the store.
export const useJoinCheckListCallback = () => {
  const store = useStore(useStoreId());
  return useCallback(
    (listId: string) => {
      store.setRow("lists", listId, {
        id: listId,
        valuesCopy: "{}",
      });
    },
    [store]
  );
};

export const useValuesCopy = (
  id: string
): [string, (valuesCopy: string) => void] => [
  useCell("lists", id, "valuesCopy", useStoreId()),
  useSetCellCallback(
    "lists",
    id,
    "valuesCopy",
    (valuesCopy: string) => valuesCopy,
    [],
    useStoreId()
  ),
];

// Returns a callback that deletes a Check list from the store.
export const useDelCheckListCallback = (id: string) =>
  useDelRowCallback("lists", id, useStoreId());

// Returns the IDs of all Check lists in the store.
export const useCheckListIds = () => useRowIds("lists", useStoreId());

// Returns the (copy of) values of up to 10 Check lists in the store.
export const useCheckListsValues = () =>
  Object.values(useTable("lists", useStoreId()))
    .slice(0, 10)
    .map(({ valuesCopy }) => {
      try {
        return JSON.parse(valuesCopy);
      } catch {
        return {};
      }
    });

// Create, persist, and sync a store containing the IDs of the Check lists.
export default function CheckListsStore() {
  const storeId = useStoreId();
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setTablesSchema(TABLES_SCHEMA)
  );
  useCreateClientPersisterAndStart(storeId, store);
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  // In turn 'render' (i.e. create) all of the Check lists themselves.
  return Object.entries(useTable("lists", storeId)).map(([listId]) => (
    <CheckListStore
      listId={listId}
      key={listId}
      useValuesCopy={useValuesCopy}
    />
  ));
}
