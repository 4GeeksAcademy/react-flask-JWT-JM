import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard"; // Asegúrate de crear este componente
import Private from "./components/Private"; // Asegúrate de crear este componente
import Error from "./pages/Error"; // Crea un componente de error personalizado
import { Login } from "./pages/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<Error />}
    >
      <Route index element={<Register />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* ESTA RUTA AHORA ESTÁ PROTEGIDA */}
      <Route
        path="private"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
    </Route>
  )
);