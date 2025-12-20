import React, { useState } from "react";
import { useEffect } from "react";
import { apiFetch } from "../../api";

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
            <h1>Willkommen im geschüzten Bereich User mit der Email: {email}</h1>
            <button onClick={logout}>Ausloggen</button>
        </div>
    )
}

export default Protected;