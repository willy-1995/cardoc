import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {

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
                //msgDiv.textContent = ; Login success animation
                form.reset();
                setTimeout(() => {
                    navigate("/protected");
                }, 3000);

                //safe jwt
                localStorage.setItem("token", result.token);
            }
            else {
                msgDiv.textContent = result.message;
            }

        } catch (error) {
            console.error(error); //DEBUG
            msgDiv.textContent = "Serverfehler: " + error.message;
        }
    }


    return (
        <div className="body-div">
            <form id="login-form" onSubmit={loginHandler}>
                <input type="email" name="email" placeholder="Deine E-Mail-Adresse" />
                <input type="password" name="password" placeholder="Dein Passwort" />
                <input type="submit" className="button" value={"Einloggen"} />
            </form>
            <div id="msg-login">

            </div>
        </div>
    )
}

export default Login;