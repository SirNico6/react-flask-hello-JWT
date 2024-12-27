import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const LogedIn = () => {
  const { store } = useContext(Context); // Obtener el estado global
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      // Si no hay token, redirigir a la página de login
      navigate('/login');
    }
  }, [store.token, navigate]);

  return (
    <div className="container">
      <h1>¡Has iniciado sesión correctamente!</h1>
      <p>Bienvenido, has accedido a tu cuenta de forma exitosa.</p>
    </div>
  );
};
