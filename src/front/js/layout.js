import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./pages/register";
import ProtectedRoute from "./component/protectedRoute";
import { LogIn } from "./pages/logIn";
import { LogedIn } from "./pages/logedIn";

const Layout = () => {
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }

    return (
        <div>
            <BrowserRouter>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/logedIn"
                            element={
                                <ProtectedRoute>
                                    <LogedIn />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
