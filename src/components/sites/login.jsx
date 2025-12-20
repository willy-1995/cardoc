import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style_main.css";
import "./style_login.css";


function Login() {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost/react/cardoc/backend/login.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            //only react to post!!
            if (response.status !== 200) {
                return;
            }

            const result = await response.json();
            //const text = await response.text();
            //console.log("SERVER RESPONSE:", text);


            if (result.success) {
                setMessage("Login erfolgreich!\nWeiterleitung...");
                form.reset();
                setTimeout(() => {
                    navigate("/protected");
                }, 3000);

                //safe jwt
                localStorage.setItem("token", result.token);
            }
            else {
                setMessage(result.message);
            }

        } catch (error) {
            console.error(error); //DEBUG
            setMessage( "Serverfehler: " + error.message);
        }
    }


    return (
        <div className="body-div">
            <div id="landing-logo-div">
                <h1>cardoc</h1>
                <h2>digital car management</h2>
            </div>
            <form id="login-form" onSubmit={loginHandler} className="main-div">
                <input type="email" name="email" placeholder="Deine E-Mail-Adresse" />
                <input type="password" name="password" placeholder="Dein Passwort" />
                <button type="submit">Einloggen</button>
            </form>
            <div id="msg-login">
                {message}
            </div>
        </div>
    )
}

export default Login;