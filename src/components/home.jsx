import React from "react";
import { Link } from "react-router-dom";


function Home(){
    return(
        <div id="home-div">
            <Link to={"/protected"}>
            <button>
                Zurück
            </button>
            </Link>
        </div>
    )
}

export default Home;