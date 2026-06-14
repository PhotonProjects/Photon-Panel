import { createContext } from "react";

export const SidebarContext = createContext<{sideBarExpanded: boolean, inSideBar: boolean}>({sideBarExpanded: true, inSideBar: false});