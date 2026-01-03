import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./sites/style_trips.css";

function GetVehicleTrips() {
    const { id } = useParams(); // get id from url
    const [vehicle, setVehicle] = useState(null);
    const [trips, setTrips] = useState([]);

    //states for handlesubmit
    const [driver, setDriver] = useState("");
    const [start_time, setStart_time] = useState("");
    const [end_time, setEnd_time] = useState("");
    const [start_km, setStart_km] = useState("");
    const [end_km, setEnd_km] = useState("");
    const [start_location, setStart_location] = useState("");
    const [end_location, setEnd_location] = useState("");
    const [purpose, setPurpose] = useState("");
    const [trip_type, setTrip_type] = useState("business");
    const [message, setMessage] = useState("");
    const [warning, setWarning] = useState("");

    const dialogRef = useRef(null);



    const fetchVehicle = async () => {
        const token = localStorage.getItem("token");

        // Vehicle data
        const resVehicle = await fetch(`http://localhost/cardoc/backend/vehicles_list.php?id=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const vehicleData = await resVehicle.json();
        setVehicle(vehicleData[0]); // array!


        // trips
        const resTrips = await fetch(`http://localhost/cardoc/backend/trips.php?vehicle_id=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const tripsData = await resTrips.json();
        setTrips(tripsData);
    };

    useEffect(() => {
        fetchVehicle();
    }, [id]);



    if (!vehicle) return <div>Lade Fahrzeug…</div>;

    //=====DIALOG HANDLING=====

    //show dialog
    const openDialog = () => {
        console.log("OPEN DIALOG");  // Debug
        if (trips.length > 0) {
            setStart_km(trips[0].end_km);
        } else {
            setStart_km(""); // first vehicle, no trips
        }
        if (dialogRef.current) dialogRef.current.showModal();
    };

    // close dialog
    const closeDialog = () => {
        console.log("CLOSE DIALOG"); // Debug
        if (confirm("Vorgang ohne Speicherung abbrechen?")) {
            if (dialogRef.current) dialogRef.current.close();
            setDriver(""); setStart_time(""); setEnd_time(""); setStart_km(""); setEnd_km("");
            setStart_location(""); setEnd_location(""); setPurpose(""); setTrip_type("");
        }
    };

    //=====ADD NEW TRIP=====
    const handleSubmit = async () => {

        console.log("SUBMIT AUSGELÖST");

        const distance_km = Number(end_km) - Number(start_km);
        //check if end km is higer than start km
        if (Number(end_km) <= Number(start_km)) {
            setWarning("End-km muss größer als Start-km sein");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                "http://localhost/cardoc/backend/trips.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        vehicle_id: id,
                        driver,
                        start_time,
                        end_time,
                        start_km,
                        end_km,
                        distance_km,
                        start_location,
                        end_location,
                        purpose,
                        trip_type
                    })
                }
            );

            console.log("FETCH OK", response.status);


            const result = await response.json();
            //DEBUG
            console.log("Status:", response.status);


            if (result.status === "success") {
                dialogRef.current.close();
                setMessage(result.message);
                setDriver(""); setStart_time(""); setEnd_time(""); setStart_km(""); setEnd_km("");
                setStart_location(""); setEnd_location(""); setPurpose(""); setTrip_type("");



                //reload list
                await fetchVehicle();

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
        <div className="content-container">
            <h1>Fahrtenbuch</h1>
            <div id="trips-container">
                <div id="trips-header-div">
                    <h3>
                        {vehicle.brand} {vehicle.model} {vehicle.license_plate}
                    </h3>

                    <button id="addTrip-button" onClick={openDialog}>Fahrt hinzüfügen</button>
                </div>
                <div id="msg-trips" className="msg-div">
                    {message}
                </div>
                {/*DIALOG FOR TRIP */}
                <dialog ref={dialogRef}>
                    <div className="dialog-div">
                        <h3>Fahrt hinzufügen</h3>
                        <div id="wng-trips" className="msg-div">
                            {warning}
                        </div>
                        <input placeholder="Fahrer" value={driver} onChange={e => setDriver(e.target.value)} />
                        <input type="datetime-local" value={start_time} onChange={e => setStart_time(e.target.value)} />
                        <input type="datetime-local" value={end_time} onChange={e => setEnd_time(e.target.value)} />
                        <input placeholder="Start km" value={start_km} onChange={e => setStart_km(e.target.value)} />
                        <input placeholder="End km" value={end_km} onChange={e => setEnd_km(e.target.value)} />
                        <input type="text" value={start_km && end_km
                            ? Number(end_km) - Number(start_km)
                            : ""} disabled />
                        <input placeholder="Startort" value={start_location} onChange={e => setStart_location(e.target.value)} />
                        <input placeholder="Zielort" value={end_location} onChange={e => setEnd_location(e.target.value)} />
                        <input placeholder="Zweck" value={purpose} onChange={e => setPurpose(e.target.value)} />
                        <select name="trip_type">
                            <option value="business">Geschäftlich</option>
                            <option value="private">Privat</option>
                            <option value="commute">Pendeln</option>
                        </select>
                        <div className="dialog-button-div">
                            <button type="button" onClick={handleSubmit}>Speichern</button>
                            <button type="button" onClick={closeDialog}>Abbrechen</button> {/*type has to be button, or handled as submit*/}
                        </div>
                    </div>

                </dialog>
                {/*no if else in jsx return! */}
                {trips.length === 0 ? (
                    <p>Keine Fahrten vorhanden</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Startzeit</th>
                                <th>Endzeit</th>
                                <th>Startpunkt</th>
                                <th>Zielpunkt</th>
                                <th>KM-Stand Start</th>
                                <th>KM-Stand Ziel</th>
                                <th>Distanz</th>
                                <th>Zweck</th>
                                <th>Art</th>
                                <th>Fahrer</th>
                                <th>erstellt am</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map(trip => (
                                <tr key={trip.id}>
                                    <td>{trip.start_time}</td>
                                    <td>{trip.end_time}</td>
                                    <td>{trip.start_location}</td>
                                    <td>{trip.end_location}</td>
                                    <td>{trip.start_km}</td>
                                    <td>{trip.end_km}</td>
                                    <td>{trip.distance_km}</td>
                                    <td>{trip.purpose}</td>
                                    <td>{trip.trip_type}</td>
                                    <td>{trip.driver}</td>
                                    <td>{trip.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    )
}

export default GetVehicleTrips;