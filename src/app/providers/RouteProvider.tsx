import { useEffect, useState, type ReactNode } from "react";
import { RouteContext } from "./contexts/RouteContext";

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState("/");
  const navigate = (path: string) => {
    setCurrentRoute(path);
    window.history.pushState({}, "", path);
  };

  /**
   * Listen for browser navigation events (back/forward) to keep currentRoute in sync with the URL.
   */
  const handlePopState = () => {
    setCurrentRoute(window.history.state?.path || window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <RouteContext.Provider value={{ currentRoute, navigate, handlePopState }}>
      {children}
    </RouteContext.Provider>
  );
};
