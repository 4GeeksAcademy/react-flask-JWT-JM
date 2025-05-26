import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">¡Ups! Algo salió mal</h1>
      <p>{error.statusText || error.message}</p>
      <a href="/" className="btn btn-primary">
        Volver al inicio
      </a>
    </div>
  );
}