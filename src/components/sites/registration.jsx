import React from "react";

function Registration() {

    const registHandler = async (e) => {
        e.preventDefault();
        sendRequest();
    }

    const sendRequest = async () => {
        const form = document.getElementById("regist-form");
        const msgDiv = document.getElementById("msg-regist");
        const formData = new FormData(form);

        try {
            const response = await fetch('', {
                method: 'POST',
                body: formData

            });

            //ERROR HANDLING

            const result = await response.json();

            if (result.success) {
                msgDiv.textContent = " ${result.message}";
                form.reset();
            }
            else {
                msgDiv.textContent = "${result.message}";
            }

        } catch (error) {
            console.error("Sende-Fehler:", error);
            msgDiv.textContent = "Ein unerwarteter Fehler ist aufgetreten: ${error.message}";
        }

    }

    return (
        <div className="body-div">
            <form id="regist-form" onClick={registHandler}>
                <input type="text" name="username" placeholder="Dein Nutzername" />
                <input type="email" name="email" placeholder="Deine E-Mail-Adresse" />
                <input type="password" name="password" placeholder="Dein Passwort" />
                <input type="submit" className="button" value={"Registrieren"} />
            </form>
            <div id="msg-regist">

            </div>

        </div>
    )
}

export default Registration;