import React, { useEffectEvent } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GetVehicleTrips from "../getVehicleTrips";
import Home from "../home";
import "./style_main.css";

function Driversbook() {




    return (
        <div className="body-div driversbook-div">
            <Home />
            <GetVehicleTrips />
        </div>
    )
}

export default Driversbook;