import React, { useState } from "react";
import Home from "../home";
import "./style_main.css";
import "./style_profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';

function Profile() {

    //STATES
    //show logout-msg
    const [showLogout, setShoweLogout] = useState(false);
    //UPDTATE PROFILE
    //DEACTIVATE PROFILE
    //DELETE PROFILE
    //LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        setShoweLogout(true);
        setTimeout(() => {
            setShoweLogout(false);
        }, 5000);

        setTimeout(() => {
            window.location.href = "/login";
        }, 3000);
        
    }
    return (
        <div className="body-div profile-div">
            <Home />
            <h1>Profil</h1>
            <details id="profile-details">
                <summary>
                   <span className="button show-profile">Profil bearbeiten</span> 
                </summary>
                <div className="details-div">
                    <div className="details-content">
                        <h3>Basisdaten ändern</h3>
                        <input type="text" name="username" />
                        <input type="email" name="email" />
                        <h3>Passwort ändern</h3>
                        <input type="passwort" placeholder="aktuelles Passwort" name="currentPassword" />
                        <input type="passwort" placeholder="neues Passwort" name="updPassword" />
                        <button type="submit" className="profile-button">Änderungen speichen</button>
                        <button id="soft-delete-button" className="profile-button">Profil deaktivieren</button>
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

            </div>
                <footer>
                    <button onClick={logout} id="logout-button">Logout</button>
                </footer>
        </div>
    )
}

export default Profile;