import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Crime {
  id: string;
  lat: number;
  lng: number;
  hour_of_day: number;
  neighbourhood: string;
  building_type: string;
  crime_type: string;
  reported_at: string;
}

export interface Call {
  call_time: string;
  call_type: number;
  lat: number;
  lng: number;
  cross_streets: string;
}

type SelectionContextType = {
  selectedCrime: Crime | null;
  nearbyCrimes: Crime[];
  selectedCenter: { lat: number; lng: number } | null;
  selectionRadius: number;
  recentCalls: Call[]
  setSelectedCrime: (crime: Crime | null) => void;
  setNearbyCrimes: (crimes: Crime[]) => void;
  setSelectedCenter: (center: { lat: number; lng: number } | null) => void;
  setSelectionRadius: (radius: number) => void;
  setRecentCalls: (calls: Call[]) => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);
  const [nearbyCrimes, setNearbyCrimes] = useState<Crime[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [selectionRadius, setSelectionRadius] = useState<number>(500);
  const [recentCalls, setRecentCalls] = useState<Call[]>([]);

  return (
    <SelectionContext.Provider
      value={{
        selectedCrime,
        nearbyCrimes,
        selectedCenter,
        selectionRadius,
        recentCalls,
        setSelectedCrime,
        setNearbyCrimes,
        setSelectedCenter,
        setSelectionRadius,
        setRecentCalls,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelectionContext = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelectionContext must be used within a SelectionProvider");
  }
  return context;
};
