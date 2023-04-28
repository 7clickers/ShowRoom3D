import { createContext } from "react";

const SidebarContext = createContext({ isSidebarVisible: false, setIsSidebarVisible: () => {} });

export default SidebarContext;
