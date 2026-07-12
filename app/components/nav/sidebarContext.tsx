import { createContext } from "react";

interface SidebarContextType {
    isExpanded: boolean;
    inSidebar: boolean;
    toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
    isExpanded: true,
    inSidebar: false,
    toggleSidebar: () => {},
});
