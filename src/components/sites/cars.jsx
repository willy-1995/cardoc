import React from "react";
import { useState, useEffect } from "react";
import "./style_main.css";
import "./style_cars.css";

function Cars(){

    return(
        <div className="body-sub-div main-div">
            <button id="add-button">Fahrzeug hinzufügen</button>
            <div id="vehicle-list">
                
            </div>
        </div>
    )
}

export default Cars;