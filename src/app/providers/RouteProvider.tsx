import { createContext, useState, type ReactNode } from "react";
export interface RouteContextType {
  currentRoute: string;
  navigate: (path: string) => void;
}

export const RouteContext = createContext<RouteContextType>({
  currentRoute: "/",
  navigate: () => {},
});

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState("/");
  const navigate = (path: string) => {
    setCurrentRoute(path);
    window.history.pushState({}, "", path);
  };

  return (
    <RouteContext.Provider value={{ currentRoute, navigate }}>{children}</RouteContext.Provider>
  );
};

// will upgrade this to use react-router-dom in the future, but for now this is a simple custom implementation to manage routes in the app
