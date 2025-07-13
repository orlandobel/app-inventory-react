import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContextHook";
import { usePreferences } from "@/context/PreferencesContextHook";
import "@/styles/login.css";

const Login = () => {
    const { login, isLoading, error } = useAuth();
    const { theme, toggleTheme } = usePreferences();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login({ username, password, rememberMe });

        if (success) {
            navigate("/");
        } else {
            setLocalError("Credenciales inválidas.");
        }
    };

    return (
        <div className={`login ${theme === "dark" ? "login--dark" : ""}`}>
            <div className="login__preferences">
                <button onClick={toggleTheme}>
                    Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
                </button>
            </div>
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Iniciar Sesión</h2>
                <div className="login__form-group">
                    <label htmlFor="username" className="login__label">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        className="login__input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login__form-group">
                    <label htmlFor="password" className="login__label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="login__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login__form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Recordarme
                    </label>
                </div>
                {(localError || error) && (
                    <p className="login__error">{localError || error}</p>
                )}
                <button type="submit" className="login__button" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    );
};

export default Login;