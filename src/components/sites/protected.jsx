import React, { useState } from "react";
import { useEffect } from "react";
import { apiFetch } from "../../api";
import Cars from "./cars";
//STYLE
import "./style_main.css";
import "./style_protected.css";

function Protected() {
    //prepare data to use in frontend
    const [email, setEmail] = useState("");
    //more data..

    useEffect(() => {
        apiFetch("http://localhost/react/cardoc/backend/profile.php")
            .then(data => {
                setEmail(data.email);
                console.log(data);
                //setUser(data.user);
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div className="body-div">
            <p id="greeting">Hallo {email}</p>
            <div id="cars-container">
                <h3>Dein Fuhrpark</h3>

                <Cars />

            </div>

            <button onClick={logout}>Ausloggen</button>
        </div>
    )
}

export default Protected;