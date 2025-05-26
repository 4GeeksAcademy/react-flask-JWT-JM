import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";
import { register } from "../store";

export const Register = () => {
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Cuando el registro sea exitoso, mostramos alerta y vamos al login
    useEffect(() => {
        if (store.message) {
            alert("Registro exitoso. Redirigiendo al login...");
            setTimeout(() => dispatch({ type: 'clear_error' }), 2000);
            navigate("/");
        }
    }, [store.message, navigate]);

    // Limpiar error después de 5s
    useEffect(() => {
        if (store.error) {
        //    alert(store.error);
            setTimeout(() => dispatch({ type: 'clear_error' }), 3000);
        //    navigate("/");
        }
    }, [store.error, dispatch]);


 //Manejo al pulsar enviar
 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      dispatch({ type: 'add_user_error', payload: "Todos los campos son requeridos" });
      return;
    }

    let resp = await register(email, password, dispatch);
    if (resp) {
      console.log("Usuario Agregado");
    }
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registro</h2>
              
              {store.error && (
                <div className="alert alert-danger">{store.error}</div>
              )}
              
              {store.message && (
                <div className="alert alert-success">{store.message}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                >
                  Registrarse
                </button>

                <div className="text-center">
                  <Link to="/" className="btn btn-link"  onClick={() => dispatch({ type: "clear_error" })}>
                    Volver al Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};