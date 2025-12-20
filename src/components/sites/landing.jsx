import React from "react";
import { Link } from "react-router-dom";
import "./style_main.css";
import "./style_landing.css";

function Landing() {
    return (
        <div className="body-div">
            <div id="landing-logo-div">
                <h1>cardoc</h1>
                <h2>digital car management</h2>
            </div>
            <div className="main-div" id="user-access-div">
                <Link to={"/login"} className="link">
                    Login
                </Link>
                <Link to={"/registration"} className="link">
                    Registrieren
                </Link>
            </div>

        </div>
    )
}

export default Landing;