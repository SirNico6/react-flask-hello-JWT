import React, { useContext, useState } from "react";
import { Context } from "../store/appContext"; // Importar Context para usar Flux
import { Link, useNavigate } from "react-router-dom"; // Hook para manejar navegación

export const Register = () => {
  const { actions } = useContext(Context); // Acceso a las acciones del contexto
  const navigate = useNavigate(); // Hook para redirigir
  const [name, setName] = useState(""); // Estado para almacenar el nombre
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const handleSubmit = async () => {
    // Validar que no haya campos vacíos
    if (!name || !email || !password) {
      setError("Por favor, completa todos los campos."); // Mostrar error si hay campos vacíos
      return;
    }

    // Limpiar mensaje de error si todos los campos están completos
    setError("");

    // Llamar a la acción de registro en Flux
    const success = await actions.register(name, email, password);

    if (success) {
      navigate("/login");
    } else {
      setError("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="mb-3">
        <label className="form-label fw-bold">Nombre</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="form-control"
          placeholder="Nombre completo"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          placeholder="Ingrese su email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Contraseña</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
          placeholder="Ingrese su contraseña"
        />
      </div>

      <button onClick={handleSubmit} type="button" className="btn btn-primary me-3">
        Registrar
      </button>

      <Link to="/">
        <button className="btn btn-secondary">Volver al inicio</button>
      </Link>
    </div>
  );
};
