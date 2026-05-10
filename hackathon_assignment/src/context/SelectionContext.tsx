import { createContext, useContext, useState } from "react";
import type { Pet } from "../types/pet";
import { getFileSize } from "../utils/getFileSize";

type ContextType = {
     selected: Pet[],
     toggleSelect: (pet: Pet) => Promise<void>,
     clear: () => void,
     selectAll: (pets: Pet[]) => Promise<void>
};

const SelectionContext = createContext<ContextType | null>(null);

export const SelectionProvider = ({ children }: any) => {
     const [selected, setSelected] = useState<Pet[]>([]);
     const [sizeCache, setSizeCache] = useState<Record<string, number>>({});

     const toggleSelect = async (pet: Pet) => {
          const exists = selected.find((p) => p.title === pet.title);
          if (exists) {
               setSelected((preSelected) => preSelected.filter((p) => p.title !== pet.title));
               return;
          }

          let fileSize = sizeCache[pet.title];

          if (!fileSize) {
               fileSize = await getFileSize(pet.url);

               setSizeCache((prev) => ({
                    ...prev,
                    [pet.title]: fileSize!,
               }));
          }

          setSelected((prev) => [...prev, { ...pet, fileSize }]);
     }

     const clear = () => setSelected([]);

     const selectAll = async (pets: Pet[]) => {
          const updated = await Promise.all(
               pets.map(async (pet) => {
                    let fileSize = sizeCache[pet.title];

                    if (!fileSize) fileSize = await getFileSize(pet.url);

                    return { ...pet, fileSize };
               })
          );

          setSelected(updated);
     }

     return (
          <SelectionContext.Provider value={{ selected, toggleSelect, clear, selectAll }}>
               {children}
          </SelectionContext.Provider>
     )
};

export const useSelection = () => useContext(SelectionContext)!;