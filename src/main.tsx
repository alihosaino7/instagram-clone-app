import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
