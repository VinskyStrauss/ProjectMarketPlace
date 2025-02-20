import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AppLayout } from "./layouts/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  );
}
