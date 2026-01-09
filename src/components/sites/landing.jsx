import React from "react";
import { Link } from "react-router-dom";
import "./style_main.css";
import "./style_landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from '@fortawesome/free-solid-svg-icons'; 

function Landing() {
    return (
        <div className="body-div landing-div">
            <div className="body-sub" id="preview-div">
                <h1>cardoc</h1>
                <ul>
                    <li> <FontAwesomeIcon icon={faCheck} /> digitales Fahrtenbuch</li>
                    <li> <FontAwesomeIcon icon={faCheck} /> Steuerkonforme Buchführung</li>
                    <li> <FontAwesomeIcon icon={faCheck} /> leichte Bedienung</li>
                    <li> <a href="#access-div" className="button">Jetzt Testen</a></li>
                </ul>
                <div id="info-div" className="user-info-div">
                    <h3>WICHTIGER HINWEIS!</h3>
                    <p>Hierbei handelt es sich um eine Testversion. cardoc wird stetig weiterentwickelt und verbessert.
                        Die Plattform ist beim Anbieter  <a href="https://www.infinityfree.com/">www.infinityfree.com</a> zu Demonstrationszwecken gehostet.
                        Aus Datenschutzgründen sollten die angebotenen Zugangsdaten verwendet werden. Bei Registrierung mit eigenen Zugangsdaten, insbesondere 
                        private E-Mail-Adresse, sollte das Profil nach Testung wieder gelöscht werden oder eine ausgedachte E-Mail-Adresse verwendet werden!
                    </p>
                </div>
            </div>
            <div className="body-sub" id="access-div">
                <div className="main-div" id="user-access-div">
                    <Link to={"/login"} className="link">
                        Login
                    </Link>
                    <Link to={"/registration"} className="link">
                        Registrieren
                    </Link>
                </div>
                <div id="login-data-div" className="user-info-div">
                    <h3>Testzugang:</h3>
                    <p>E-Mail-Adresse: <b>muster@beispiel.de</b></p>
                    <p>Passwort: <b>geheim</b></p>

                </div>
            </div>



        </div>
    )
}

export default Landing;