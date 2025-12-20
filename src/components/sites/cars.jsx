import React from "react";
import { useState, useEffect, useRef } from "react";
import "./style_main.css";
import "./style_cars.css";

function Cars() {
    //Array to collect details
    const [vehicles, setVehicles] = useState([]);

    //states
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [license_plate, setLicensePlate] = useState("");


    //dialog handling

    const dialogRef = useRef(null);
    //show dialog
    const openDialog = () => {
        console.log("OPEN DIALOG");  // Debug
        if (dialogRef.current) dialogRef.current.showModal();   // öffnet das dialog-Fenster
    };

    // close dialog
    const closeDialog = () => {
        console.log("CLOSE DIALOG"); // Debug
        alert("Vorgang ohne Speicherung abbrechen?")
        if (dialogRef.current) dialogRef.current.close();       // schließt das dialog-Fenster
    };

    //add new vehicle to list
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost/react/cardoc/backend/vehicle_list.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ brand, model, license_plate, details })
        });

        //reload list
        await fetchVehicles();
        //close dialog and clear inputs
        dialogRef.current.close();
        setBrand(""); setModel(""); setLicensePlate("");

    }

    //get vehicles list
    const fetchVehicles = async () => {
        const res = await fetch("http://localhost/react/cardoc/backend/vehicle_list.php");
        const data = await res.json();
        setVehicles(data);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);
    //_____


    return (
        <div className="body-sub-div main-div">
            <button id="add-button" onClick={openDialog}>Fahrzeug hinzufügen</button>
            <dialog ref={dialogRef}>
                <form id="vehicle-form" onSubmit={handleSubmit}>
                    <label htmlFor="brand">
                        Marke
                        <input type="text" id="brand" name="brand" value={brand} onChange={e => setBrand(e.target.value)} />
                    </label>
                    <label htmlFor="model">
                        Modell
                        <input type="text" id="model" name="model" value={model} onChange={e => setModel(e.target.value)} />
                    </label>
                    <label htmlFor="license_plate">
                        KFZ-Kennzeichen
                        <input type="text" id="license_plate" name="license_plate" value={license_plate} onChange={e => setLicensePlate(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Speichern</button>
                        <button onClick={closeDialog}>Abbrechen</button>
                    </div>
                </form>
            </dialog>
            <div id="vehicle-list">
                {vehicles.map((vehicle, index) => (
                    <details key={index}>
                        <summary>
                            {vehicle.brand} {vehicle.model} {vehicle.license_plate}
                        </summary>
                    </details>
                ))}
            </div>
        </div>
    )
}

export default Cars;