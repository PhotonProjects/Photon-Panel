import { createContext } from "react";

interface ButtonContextType {
    fillWholeWidth: boolean;
}

export const ButtonContext = createContext<ButtonContextType>({
    fillWholeWidth: false,
});
