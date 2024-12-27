import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Importar Link para redirigir
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} alt="Rigo" />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>

			{/* Botones de Registro e Inicio de sesión */}
			<div className="mt-4">
				<Link to="/register">
					<button className="btn btn-primary mx-2">Registro</button>
				</Link>
				<Link to="/login">
					<button className="btn btn-secondary mx-2">Iniciar sesión</button>
				</Link>
			</div>
		</div>
	);
};
