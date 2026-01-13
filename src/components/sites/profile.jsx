import React, { useState, useEffect } from "react";
import Home from "../home";
import "./style_main.css";
import "./style_profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

function Profile() {

    //STATES
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileMsg, setProfileMsg] = useState(false);
    const [updateMessage, setupdateMessage] = useState("");

    //show logout-msg/ inactive-msg
    const [showLogout, setShoweLogout] = useState(false);
    const [showInactive, setShowInactive] = useState(false);

    //READ USER
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost/cardoc/backend/user_crud.php", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            //response
            const data = await res.json();

            if (data.length > 0) { //bc response is an array
                if (data[0].deleted_at !== null) {
                    console.warn("Profil ist deaktiviert. Logout...");
                    logout();
                    return;
                }
                setUser(data[0]); //safe complete user in state //0 = first dataset in array
                setUsername(data[0].username);
                setEmail(data[0].email);
            }

        } catch (err) {
            console.error("Profildaten konnten nicht geladen werden", err);
        }

    }

    //load user
    useEffect(() => {
        fetchUser();
    }, []);


    //UPDTATE PROFILE

    const updateUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost/cardoc/backend/user_crud.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    action: "update",
                    id: user.id,
                    username,
                    email,
                    password,
                }),
            });

            const result = await res.json();

            setProfileMsg(true);
            setupdateMessage(result.message);

            setTimeout(() => {
                setProfileMsg(false);
                setupdateMessage("");
            }, 3000);


            setPassword("");
        }
        catch (err) {
            console.error("Update fehlgeschlagen", err);
        }


    };

    //DEACTIVATE PROFILE
    const softDeleteProfile = async () => {
        console.log("Button geklickt, User-State ist:", user); // DEBUG
        if (!user || !user.id) return; //safety check for id
        if (!confirm("Profil wirklich deaktivieren?")) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost/cardoc/backend/user_crud.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    action: "soft_delete",
                    id: user.id,
                }),
            });
            //check if answere ist ok
            if (!res.ok) throw new Error("Server-Fehler");

            const result = await res.json();


            if (result.status === "success") {
                setShowInactive(true);
                setTimeout(() => {
                    setShowInactive(false);
                    logout();
                }, 3000);

            }
        } catch (err) {
            console.error("Deaktivierung fehlgeschlagen", err);
        }
    };

    //DELETE PROFILE
    const hardDeleteProfile = async () => {
        if (!confirm("Profil unwiderruflich löschen?")) return;

        const token = localStorage.getItem("token");

        await fetch("http://localhost/cardoc/backend/user_crud.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: user.id }),
        });

        logout();
    };

    //LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        setShoweLogout(true);
        setTimeout(() => {
            setShoweLogout(false);
        }, 3000);

        setTimeout(() => {
            window.location.href = "/login";
        }, 3000);

    }
    return (
        <div className="body-div profile-div">
            <Home />
            <div className="content-div">
                <h1>Profil</h1>
                <div id="profile-msg">
                    {updateMessage}
                </div>
                <details id="profile-details">
                    <summary>
                        <span className="button show-profile">Profil bearbeiten</span>
                    </summary>
                    <div className="details-div">
                        <div className="details-content">
                            <h3>Basisdaten ändern</h3>
                            <input type="text" name="username" placeholder="Nutzername" value={username} onChange={e => setUsername(e.target.value)} />
                            <input type="email" name="email" placeholder="E-Mail" value={email}
                                onChange={e => setEmail(e.target.value)} />
                            <h3>Passwort ändern</h3>
                            <input type="passwort" placeholder="aktuelles Passwort" name="currentPassword" />
                            <input type="passwort" placeholder="neues Passwort" name="updPassword" />
                            <button className="profile-button" onClick={updateUser}>Änderungen speichen</button>
                            <button id="soft-delete-button" className="profile-button" onClick={softDeleteProfile}>Profil deaktivieren</button>
                        </div>
                        <p id="hard-delete-button">Profil löschen</p>
                    </div>
                </details>
                <div id="logout-div">
                    {showLogout && (
                        <div id="logout-msg">
                            <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="icon" />
                            <p>Du wirst ausgeloggt!</p>
                        </div>
                    )}
                    {showInactive && (
                        <div id="inactive-msg">
                            <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="icon" />
                            <p>Du hast dein Profil erfolgreich deaktiviert! <br /><br />
                                Logge dich erneut ein, um dein Profil zu reaktivieren.</p>
                        </div>
                    )}

                </div>

            </div>
            <footer>
                <button onClick={logout} id="logout-button">Logout</button>
            </footer>
        </div>

    )
}

export default Profile;