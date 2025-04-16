import * as SQLite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite/with-schemas";
import { MergeableStore, OptionalSchemas } from "tinybase/with-schemas";

// On a mobile client, use Expo's SQLite API to persist the store.
/**
 * Creates a client-side persister for managing the persistence of a store's data
 * using Expo's SQLite database. This function is generic and works with stores
 * that implement the `MergeableStore` interface and optionally support schemas.
 *
 * @template Schemas - Represents the optional schemas that the store may use.
 *
 * @param storeId - A unique identifier for the store. This ID is used to name
 * the SQLite database file (e.g., `<storeId>.db`).
 * @param store - The store instance to be persisted. It must implement the
 * `MergeableStore` interface, which allows merging of data during persistence.
 *
 * @returns A persister instance created using `createExpoSqlitePersister`, which
 * handles the persistence of the store's data in an SQLite database.
 *
 * @example
 * ```typescript
 * import { createClientPersister } from './createClientPersister';
 * import { myStore } from './myStore';
 *
 * const persister = createClientPersister('myStoreId', myStore);
 * // The store's data will now be persisted in an SQLite database named "myStoreId.db".
 * ```
 *
 * @remarks
 * - This function is designed for use in React Native applications where Expo's
 * SQLite library is available.
 * - Ensure that the `storeId` is unique to avoid conflicts with other stores.
 * - The `store` should be compatible with the `createExpoSqlitePersister` function.
 */
export const createClientPersister = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>
) => createExpoSqlitePersister(store, SQLite.openDatabaseSync(storeId + ".db"));
