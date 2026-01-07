import React from "react";
import { useNavigate } from "react-router-dom";

function Registration() {

    const navigate = useNavigate();
    const registHandler = async (e) => {
        e.preventDefault();
        sendRequest();
    }

    const sendRequest = async () => {
        const form = document.getElementById("regist-form");
        const msgDiv = document.getElementById("msg-regist");
        const data = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        };

        console.log(data); //DEBUG


        try {
            const response = await fetch('http://localhost/cardoc/backend/registration.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });


            //ERROR HANDLING




            const result = await response.json();

            if (result.success) {
                msgDiv.textContent = result.message;
                form.reset();
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
            else {
                msgDiv.textContent = result.message;
            }

        } catch (error) {
            //console.error("Sende-Fehler:", error);
            msgDiv.textContent = "Ein unerwarteter Fehler ist aufgetreten: " + error.message;
        }

    }

    return (
        <div className="body-div">
            <form id="regist-form" onSubmit={registHandler} className="main-div">

                <h1 id="regist-heading">Registrierung</h1>
                <input type="text" name="username" placeholder="Dein Nutzername" />
                <input type="email" name="email" placeholder="Deine E-Mail-Adresse" />
                <input type="password" name="password" placeholder="Dein Passwort" />
                <button type="submit">Registrieren</button>
            </form>
            <div id="msg-regist">

            </div>

        </div>
    )
}

export default Registration;