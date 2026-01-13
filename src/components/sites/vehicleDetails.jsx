import React from "react";
import Home from "../home";
import GetVehicleData from "../getVehicleData";
import "./style_vehicledata.css";

function VehicleDetails(){
    return(
        <div className="body-div vehicleDetails-div">
           <Home />
           <GetVehicleData />


        </div>
    )

}

export default VehicleDetails;