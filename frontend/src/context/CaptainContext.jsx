// import React, { createContext, useContext, useState } from "react";

// export const CaptainDataContext = createContext();

// export const useCaptain = () => {
//   const context = useContext(CaptainContext);
//   if (!context) {
//     throw new Error("useCaptain must be used within a CaptainProvider");
//   }
//   return context;
// };

// /*************  ✨ Codeium Command 🌟  *************/
// export const CaptainContext = ({ children }) => {
//   const value = useContext(CaptainDataContext);
//   if (!value) {
//     throw new Error("useCaptainContext must be used within a CaptainProvider");
//   }
//   console.log("context cap", children);

//   const [captain, setCaptain] = useState(null);

//   const [isLoading, setIsLoading] = useState(null);
//   const [error, setError] = useState(null);

//   const CaptainContext = (captainData) => {
//     setCaptain(captainData);
//   };
//   console.log(captain);

//   const value = {
//     captain,
//     isLoading,
//     error,
//     CaptainContext,
//   };

//   return (
//     <CaptainDataContext.Provider value={value}>
//       {children}
//     </CaptainDataContext.Provider>
//   );
// };
// /******  bd6bb3fe-44ce-490d-8b0e-e07884b0f129  *******/

import React, { createContext, useContext, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    isLoading,
    error,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={{captain, setCaptain}}>
      {children}
    </CaptainDataContext.Provider>
  );
};
