import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style_main.css";
import "./style_login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


function Login() {
    //STATES
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [showReactivate, setShowReactivate] = useState(false);
    const [reactiveMessage, setReactiveMessage] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    //FUNCTIONS
    const loginHandler = async (e) => {
        console.log("FORM SUBMITTED");

        e.preventDefault();
        sendRequest();
    }

    const sendRequest = async () => {
        const form = document.getElementById("login-form");
        const msgDiv = document.getElementById("msg-login");
        const data = {
            //username: form.username.value, only for username login, add into login form!!
            email: form.email.value,
            password: form.password.value
        };

        try {
            const response = await fetch('http://localhost/cardoc/backend/login.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            
            const result = await response.json();



            if (response.ok && result.success) {
                setMessage(<span id="login-check-message"><FontAwesomeIcon icon={faCircleCheck} className="icon" /> Login erfolgreich!</span>);
                form.reset();
                setTimeout(() => {
                    navigate("/protected");
                }, 3000);

                //safe jwt
                localStorage.setItem("token", result.token);
            }
            else {
                setMessage(result.message);
                setLoginError(result.message);

                //check if user is deactivated
                if (result.message === "Dein Profil ist deaktiviert.") {
                    setShowReactivate(true);
                }
            }

        } catch (error) {
            console.error(error); //DEBUG
            setMessage("Serverfehler: " + error.message);

        }
    }

    //=====REACTIVATE=====
    const reactivateAccount = async () => {
        setLoginEmail("");
        setLoginPassword("");

        try {
            const email = document.getElementById("login-form").email.value;
            console.log("Email to reactivate:", email);

            const response = await fetch('http://localhost/cardoc/backend/reactivate_user.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            console.log("Fetch completed, status:", response.status);

            const text = await response.text();
            console.log("Server Response as text:", text);

            // Danach parse JSON
            const result = JSON.parse(text);
            console.log("Server Response as JSON:", result);

            if (result.success) {
                setMessage("Profil erfolgreich reaktiviert! Du kannst dich nun wie gewohnt einloggen.");
                setShowReactivate(false);
            } else {
                setMessage(result.message);
            }

        } catch (error) {
            console.error("Fehler bei Reactivate:", error);
            setMessage("Serverfehler: " + error.message);
        }
    };


    return (
        <div className="body-div login-div">
            <form id="login-form" onSubmit={loginHandler} className="main-div">
                <h1>Login</h1>
                <input type="email" name="email" placeholder="E-Mail-Adresse" onChange={e => setLoginEmail(e.target.value)}/>
                <input type="password" name="password" placeholder="Passwort" onChange={e => setLoginPassword(e.target.value)} />
                <button type="submit">Einloggen</button>
            </form>
            <div id="msg-login">
                {message}
            </div>
            {showReactivate && (
                <div className="reactivate-div">
                    <button onClick={reactivateAccount}>Profil reaktivieren</button>
                </div>
            )}
        </div>
    )
}

export default Login;