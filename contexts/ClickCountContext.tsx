import React, { createContext, useContext, useState, ReactNode } from "react";

interface ClickCountContextType {
  count: number;
  incrementCount: () => void;
}

const ClickCountContext = createContext<ClickCountContextType | undefined>(undefined);

export const ClickCountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <ClickCountContext.Provider value={{ count, incrementCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

export const useClickCount = () => {
  const context = useContext(ClickCountContext);
  if (!context) {
    throw new Error("useClickCount must be used within a ClickCountProvider");
  }
  return context;
};