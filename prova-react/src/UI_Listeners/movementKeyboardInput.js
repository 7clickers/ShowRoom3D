import { useCallback, useEffect, useState } from "react";

export const useKeyboardInput = (keysToListen = []) => {
  // Callback per trasformare keysToListen in oggetto keysPressed
  const getKeys = useCallback(() => {
    const lowerCaseArray = [];
    const hookReturn = {};

    keysToListen.forEach((key) => {
      const lowerCaseKey = key.toLowerCase();
      lowerCaseArray.push(lowerCaseKey);
      hookReturn[lowerCaseKey] = false;
    });

    return {
      lowerCaseArray,
      hookReturn
    };
  }, [keysToListen]);

  // Stato dei tasti premuti
  const [keysPressed, setPressedKeys] = useState(getKeys().hookReturn);

  //Gestione degli eventi "keydown" e "keyup"
  useEffect(() => {
    const handleKeyDown = (e) => {
      const lowerKey = e.key.toLowerCase();
      if (getKeys().lowerCaseArray.includes(lowerKey)) {
        setPressedKeys((keysPressed) => ({ ...keysPressed, [lowerKey]: true }));
      }
    };
    const handleKeyUp = (e) => {
      const lowerKey = e.key.toLowerCase();
      if (getKeys().lowerCaseArray.includes(lowerKey)) {
        setPressedKeys((keysPressed) => ({
          ...keysPressed,
          [lowerKey]: false
        }));
      }
    };

    // Aggiungi event listener per "keydown" e "keyup"
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Rimuovi event listener quando il componente si smonta
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysToListen, getKeys]);

  // Restituisci lo stato dei tasti premuti
  return keysPressed;
};
