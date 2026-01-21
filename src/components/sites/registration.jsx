import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style_registration.css";

function Registration() {
    // 1. Alle Input-Felder als States
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordrules, setPasswordRules] = useState(false);
    const [message, setMessage] = useState(""); // State für die globale Meldung

    const navigate = useNavigate();

    // 2. Passwort-Check Logik (wird bei jeder Änderung aufgerufen)
    const checkPasswordValidity = (value) => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,12}$/;
        return regex.test(value);
    };

    const registHandler = async (e) => {
        e.preventDefault();

        // Validierung vor dem Absenden
        if (!checkPasswordValidity(password)) {
            setMessage("Das Passwort entspricht nicht den Regeln!");
            return;
        }

        const data = { username, email, password };

        try {
            const response = await fetch('http://localhost/cardoc/backend/registration.php', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            setMessage(result.message);

            if (result.success) {
                // Felder leeren
                setUsername(""); setEmail(""); setPassword("");
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            setMessage("Fehler: " + error.message);
        }
    };

    return (
        <div className="body-div registration-div">
            <form className="main-div" onSubmit={registHandler} id="regist-form">
                <h1 id="regist-heading">Registrierung</h1>

                <input
                    type="text"
                    placeholder="Dein Nutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Deine E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Dein Passwort"
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordRules(true)} 
                    onBlur={() => setPasswordRules(false)} //hidden if click out
                    required
                />

                {passwordrules && (
                    <div id="password-div">
                        <ul className={checkPasswordValidity(password) ? "rules-ok" : "rules-fail"}>
                            <li>8 - 12 Zeichen</li>
                            <li>Mind. 1 Großbuchstabe</li>
                            <li>1 Kleinbuchstabe & 1 Zahl</li> 
                        </ul>
                        <div id="pw-msg">
                            {checkPasswordValidity(password)
                                ? "Passwortanforderungen erfüllt!"
                                : "Passwortanforderungen nicht erfüllt!"}
                        </div>
                    </div>
                )}

                <button type="submit">Registrieren</button>

                <Link to={"/landing"} id="to-landing">
                    <span className="link-normal">zur Startseite</span>
                </Link>
            </form>

            <div id="msg-regist">{message}</div>
        </div>
    );
}

export default Registration;