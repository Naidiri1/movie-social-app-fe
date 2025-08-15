import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ReactNode } from "react";

// DO NOT set window.__REDUX_STORE__ - this causes loops
export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
