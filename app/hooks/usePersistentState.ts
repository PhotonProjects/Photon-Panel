"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_EVENT_NAME = "photon-panel-storage-change";

type PersistentValue = boolean | number | string | null;

export function usePersistentState<T extends PersistentValue>(storageKey: string, initialValue: T) {
    const subscribe = useCallback((onStoreChange: () => void) => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === storageKey) {
                onStoreChange();
            }
        };

        const handleLocalChange = (event: Event) => {
            const customEvent = event as CustomEvent<string>;

            if (customEvent.detail === storageKey) {
                onStoreChange();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener(STORAGE_EVENT_NAME, handleLocalChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener(STORAGE_EVENT_NAME, handleLocalChange);
        };
    }, [storageKey]);

    const getSnapshot = useCallback(() => {
        try {
            const storedValue = window.localStorage.getItem(storageKey);

            if (storedValue !== null) {
                const parsedValue: unknown = JSON.parse(storedValue);

                if (
                    parsedValue === null ||
                    typeof parsedValue === "boolean" ||
                    typeof parsedValue === "number" ||
                    typeof parsedValue === "string"
                ) {
                    return parsedValue as T;
                }
            }
        } catch {
            return initialValue;
        }

        return initialValue;
    }, [initialValue, storageKey]);

    const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

    const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const setValue = useCallback((nextValue: T | ((currentValue: T) => T)) => {
        const resolvedValue =
            typeof nextValue === "function"
                ? (nextValue as (currentValue: T) => T)(getSnapshot())
                : nextValue;

        try {
            window.localStorage.setItem(storageKey, JSON.stringify(resolvedValue));
            window.dispatchEvent(new CustomEvent(STORAGE_EVENT_NAME, { detail: storageKey }));
        } catch {
            // Storage can be unavailable in private or restricted browsing contexts.
        }
    }, [getSnapshot, storageKey]);

    return [value, setValue] as const;
}
