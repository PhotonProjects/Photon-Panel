import { createContext } from "react";

interface SidebarContextType {
    isExpanded: boolean;
    inSidebar: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
    isExpanded: true,
    inSidebar: false,
});
