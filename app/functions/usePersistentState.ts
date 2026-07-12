"use client";

import { useSyncExternalStore } from "react";

const STORAGE_EVENT_NAME = "photon-panel-storage-change";

export function usePersistentState<T>(storageKey: string, initialValue: T) {
    const subscribe = (onStoreChange: () => void) => {
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
    };

    const getSnapshot = () => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const storedValue = window.localStorage.getItem(storageKey);

            if (storedValue !== null) {
                return JSON.parse(storedValue) as T;
            }
        } catch {
            // If stored data is missing or invalid, fall back to the provided default.
        }

        return initialValue;
    };

    const value = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

    const setValue = (nextValue: T | ((currentValue: T) => T)) => {
        const resolvedValue =
            typeof nextValue === "function"
                ? (nextValue as (currentValue: T) => T)(getSnapshot())
                : nextValue;

        window.localStorage.setItem(storageKey, JSON.stringify(resolvedValue));
        window.dispatchEvent(new CustomEvent(STORAGE_EVENT_NAME, { detail: storageKey }));
    };

    return [value, setValue] as const;
}
