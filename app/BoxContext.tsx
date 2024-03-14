import React, { createContext } from "react";

interface BoxContextType {
  markPlaced: (id: number, boxType: string) => void;
}

export const BoxContext = createContext<BoxContextType>({
  markPlaced: () => {},
});
