const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			token: localStorage.getItem("token") || null,
			user: null,
			isAuthenticated: localStorage.getItem("token") ? true : false,
		},
		actions: {
			register: async (name, email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
						method: "POST",
						headers: myHeaders,
						body: JSON.stringify({ name, email, password }),
					});

					const data = await response.json();

					if (response.ok) {
						alert("User created sucessfully");
						return true;
					} else {
						alert(data.msg || "Error creating user");
						return false;
					}
				} catch (error) {
					console.error("Error at register:", error);
					return false;
				}
			},

			login: async (email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: myHeaders,
						body: JSON.stringify({ email, password }),
					});
					const data = await response.json();
					if (response.ok) {
						localStorage.setItem("token", data.token);
						setStore({ token: data.access_token, user: email, isAuthenticated: true });
						return true;
					} else {
						alert(data.msg || "Invalid credentials");
						return false;
					}
				} catch (error) {
					console.error("Login error:", error);
					return false;
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null, user: null, isAuthenticated: false });
			},

			isAuthenticated: () => {
				const store = getStore();
				return !!store.token;
			},

			getProtectedData: async () => {
				const store = getStore();

				if (!store.token) {
					console.error("User not autenticated");
					return;
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/protected`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${store.token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Protected data:", data);
					} else {
						alert("Not authorized or invalid token");
					}
				} catch (error) {
					console.error("Error at get protected data:", error);
				}
			},

		},
	};
};

export default getState;
