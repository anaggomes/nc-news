import { createContext, useState } from "react";

export const TotalArticlesContext = createContext();

export function TotalArticlesProvider({ children }) {
  const [totalArticles, setTotalArticles] = useState({});

  return (
    <TotalArticlesContext.Provider value={{ totalArticles, setTotalArticles }}>
      {children}
    </TotalArticlesContext.Provider>
  );
}
