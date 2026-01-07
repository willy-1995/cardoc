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
    const [username, setUsername] = useState("");
    

    useEffect(() => {
        apiFetch("http://localhost/cardoc/backend/profile.php")
            .then(data => {
                setEmail(data.email);
                setUsername(data.username);
                console.log(data);
                
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div className="body-div">
            <div id="greeting">
                <p>Hallo {username}</p>
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