import React from "react";
import { Link } from "react-router-dom";


function Landing(){
    return(
        <div className="body-div">
            <Link to={"/login"}>
                Login
            </Link>
            <Link to={"/registration"}>
                Registrieren
            </Link>
        </div>
    )
}

export default Landing;