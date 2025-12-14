import React from "react";

function Login(){

    return(
        <div className="body-div">
            <form id="login-form">
                <input type="email" name="email" placeholder="Deine E-Mail-Adresse"/>
                <input type="password" name="password" placeholder="Dein Passwort" />
                <input type="submit" className="button" value={"Einloggen"} />
            </form>

        </div>
    )
}

export default Login;