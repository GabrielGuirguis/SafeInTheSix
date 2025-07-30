import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Selection {
  lat: number;
  lng: number;
}

type SelectionContextType = {
  selected: Selection | null;
  setSelected: (selection: Selection | null) => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Selection | null>(null);

  return (
    <SelectionContext.Provider value={{ selected, setSelected }}>
        {children}
    </SelectionContext.Provider>
  )
};

export const useSelectionContext = () => {
    const context = useContext(SelectionContext)
    if (!context) {
        throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
};