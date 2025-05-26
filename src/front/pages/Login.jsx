import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";
import { login } from "../store"; // Changed from register to login

export const Login = () => {
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // When login is successful, redirect to dashboard or home
  useEffect(() => {
    if (store.message) {
      alert("Login exitoso. Redirigiendo...");
      setTimeout(() => dispatch({ type: 'clear_error' }), 2000);
      navigate("/dashboard"); // Change to your desired route after login
    }
  }, [store.message, navigate]);

  // Clear error after 5s
  useEffect(() => {
    if (store.error) {
      setTimeout(() => dispatch({ type: 'clear_error' }), 3000);
    }
  }, [store.error, dispatch]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      dispatch({ type: 'add_user_error', payload: "Todos los campos son requeridos" });
      return;
    }

    let resp = await login(email, password, dispatch); // Changed from register to login
    if (resp) {
      console.log("Usuario autenticado");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2> {/* Changed title */}
              
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
                  Iniciar Sesión {/* Changed button text */}
                </button>

                <div className="text-center">
                  <Link to="/register" className="btn btn-link" onClick={() => dispatch({ type: "clear_error" })}>
                    ¿No tienes cuenta? Regístrate {/* Changed link text and destination */}
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