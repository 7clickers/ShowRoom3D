import { createContext } from "react";

const ControlsContext = createContext({
  lockControls: () => {},
  unlockControls: () => {},
});

export default ControlsContext;
