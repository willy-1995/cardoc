import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Home from "./home";

function GetVehicleData() {
    const { id } = useParams(); // get vehicle id from url( cut out)
    const [vehicle, setVehicle] = useState(null);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchVehicle = async () => {
            const token = localStorage.getItem("token");

            // vehicle data
            const resVehicle = await fetch(`http://localhost/cardoc/backend/vehicles_list.php?id=${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const vehicleData = await resVehicle.json();
            setVehicle(vehicleData[0]); //because of array = [0]

            // trips
            const resTrips = await fetch(`http://localhost/cardoc/backend/trips.php?vehicle_id=${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const tripsData = await resTrips.json();
            setTrips(tripsData);
        };

        fetchVehicle();
    }, [id]);

    if (!vehicle) return <div>Lade Fahrzeug…</div>;

    return (
        <div className="content-container">
            <h1>Fahrzeug-Details</h1>
            <div id="vehicledata-header-div">
                <h3>
                    {vehicle.brand} {vehicle.model} {vehicle.license_plate}
                </h3>
            </div>

            <div className="vehicledata-div main-div">
                <h2>Fahrzeugdaten</h2>
                
            </div>

            <div className="vehicledata-div main-div">
                <h2>Wartungshistorie</h2>

            </div>
            

        </div>
    )

}

export default GetVehicleData;