import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style_main.css";
import "./style_cars.css";

function Cars() {
    //Array to collect details
    const [vehicles, setVehicles] = useState([]);

    //states
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [license_plate, setLicensePlate] = useState("");
    const [details, setDetails] = useState("");
    const [message, setMessage] = useState("");

    //get vehicles list
    const fetchVehicles = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost/cardoc/backend/vehicles_list.php",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();
        setVehicles(data);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

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
        if (confirm("Vorgang ohne Speicherung abbrechen?")) {
            if (dialogRef.current) dialogRef.current.close();
            setBrand(""); setModel(""); setLicensePlate("");
            setDetails("");
        }

    };

    //add new vehicle to list
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT AUSGELÖST");

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                "http://localhost/cardoc/backend/vehicles_list.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ brand, model, license_plate })
                }
            );

            console.log("FETCH OK", response.status);


            const result = await response.json();
            //DEBUG
            console.log("Status:", response.status);


            if (result.status === "success") {
                dialogRef.current.close();
                setMessage(result.message);
                setBrand(""); setModel(""); setLicensePlate(""); setDetails("");



                //reload list
                await fetchVehicles();

                //clear message
                setTimeout(() => {

                    setMessage("");

                }, 3000);

                dialogRef.current.close();
            }

        } catch (err) {
            console.error("FETCH FEHLER:", err);
        }




    };





    return (
        <div className="body-sub-div">
            <div id="vehicles-header-div">
                <h1>Fuhrpark</h1>
                <button id="add-button" onClick={openDialog}>Fahrzeug hinzufügen</button>
            </div>
            <div id="msg-addVehicle">
                {message}
            </div>
            <dialog ref={dialogRef}>
                <div className="dialog-div">
                    <h3>Fahrzeug hinzufügen</h3>
                    <input type="text" id="brand" placeholder="Marke eingeben" name="brand" value={brand} onChange={e => setBrand(e.target.value)} />
                    <input type="text" id="model" placeholder="Modell eingeben" name="model" value={model} onChange={e => setModel(e.target.value)} />
                    <input type="text" id="license_plate" placeholder="Kennzeichen eingeben" name="license_plate" value={license_plate} onChange={e => setLicensePlate(e.target.value)} />
                    <div className="dialog-button-div">
                        <button type="button" onClick={handleSubmit}>Speichern</button>
                        <button type="button" onClick={closeDialog}>Abbrechen</button> {/*type has to be button, or handled as submit*/}
                    </div>
                </div>

            </dialog>
            <div id="vehicle-list">
                {vehicles.map((vehicle, index) => (
                    <details key={index} className="main-details">
                        <summary>
                            <span>{vehicle.brand}</span> <span>{vehicle.model}</span> <span>{vehicle.license_plate}</span>

                        </summary>

                        <div className="more-data-div">
                            <Link to={`/vehicles/${vehicle.id}/driversbook`} className="button link-button" >
                                Fahrtenbuch
                            </Link>
                            <Link to={`/vehicles/${vehicle.id}/vehicleDetails`} className="button link-button">
                                Fahrzeugdaten
                            </Link>
                            

                        </div>
                    </details>
                ))}
            </div>
        </div>
    )
}

export default Cars;