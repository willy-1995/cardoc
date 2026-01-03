import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        apiFetch("http://localhost/cardoc/backend/profile.php")
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
            <div id="greeting">
                <p>Hallo {email}</p>
                <Link to={"/profile"} className="button">
                    Profil
                </Link>
                <button onClick={logout}>Ausloggen</button>
            </div>
            
            <div id="cars-container">

                <Cars />

            </div>

            
        </div>
    )
}

export default Protected;