import { createContext, useState } from "react";

export const DetectionContext = createContext(null);

export const DetectionProvider = ({ children }) => {
  const [detected, setDetected] = useState(false);

  return (
    <DetectionContext.Provider value={{ detected, setDetected }}>
      {children}
    </DetectionContext.Provider>
  );
};