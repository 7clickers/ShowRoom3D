// Importa le funzioni necessarie dalla libreria di testing
import { renderHook, act } from "@testing-library/react-hooks";
import useRaycasterLogic from "../src/features/raycaster/useRaycasterLogic";

// Avvia una serie di test per il componente useRaycasterLogic
describe("useRaycasterLogic", () => {
  // Definisce un test specifico per verificare se le intersezioni vengono aggiornate quando il mouse si muove
  it("should update intersects when mouse moves", () => {
    // Crea un oggetto camera vuoto come mock (finto) per il test
    const camera = {};
    // Crea un oggetto raycaster finto con due funzioni finte
    const raycaster = {
      setFromCamera: jest.fn(),
      intersectObjects: jest.fn().mockReturnValue([{ object: { productID: 1 } }]),
    };
    // Crea un array vuoto per simulare gli oggetti del prodotto
    const productObjects = [];
    // Utilizza la funzione renderHook per testare il nostro hook personalizzato useRaycasterLogic
    // passando gli oggetti mock creati precedentemente
    const { result } = renderHook(() => useRaycasterLogic(camera, raycaster, productObjects));

    // Verifica che il valore iniziale degli incroci sia un array vuoto
    expect(result.current).toEqual([]);

    // Esegue una simulazione di un evento del mouse
    act(() => {
      // Crea un evento finto di spostamento del mouse con coordinate specifiche
      const event = new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 100,
      });
      // Invia l'evento finto alla finestra
      window.dispatchEvent(event);
    });

    // Verifica che la funzione setFromCamera del raycaster sia stata chiamata
    expect(raycaster.setFromCamera).toHaveBeenCalled();
    // Verifica che la funzione intersectObjects del raycaster sia stata chiamata con gli oggetti del prodotto
    expect(raycaster.intersectObjects).toHaveBeenCalledWith(productObjects);
    // Verifica che il valore corrente delle intersezioni sia l'array atteso con l'oggetto del prodotto
    expect(result.current).toEqual([{ object: { productID: 1 } }]);
  });
});
