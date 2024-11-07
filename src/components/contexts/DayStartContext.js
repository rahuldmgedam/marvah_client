// DayStartContext.js
import React, { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const DayStartContext = createContext();

export const DayStartProvider = ({ children }) => {
  // Shared state and function
  const [isRed, setIsRed] = useState(false);
  const [dayStartRed, setDayStartRed] = useState(false); // Tracks Day Start button color

  const saveMs = () => {
 
  
        setDayStartRed(true); // Set Day Start button to red
      }

      
  

  return (
    <DayStartContext.Provider value={{ isRed, saveMs,dayStartRed }}>
      {children}
    </DayStartContext.Provider>
  );
};
