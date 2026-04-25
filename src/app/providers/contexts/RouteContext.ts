import { createContext } from "react";

export interface RouteContextType {
  currentRoute: string;
  navigate: (path: string) => void;
  handlePopState?: () => void;
}

export const RouteContext = createContext<RouteContextType>({
  currentRoute: "/",
  navigate: () => {},
  handlePopState: () => {},
});
