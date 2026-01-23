import React from "react";
import { Link } from "react-router-dom";
import "./style_main.css";
import "./style_landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

function Landing() {
    return (
        <div className="body-div landing-div">
            <div className="body-sub" id="preview-div">
                <h1>digiTour</h1>
                <ul>
                    <li> <FontAwesomeIcon icon={faCheck} /> digitales Fahrtenbuch</li>
                    <li> <FontAwesomeIcon icon={faCheck} /> Steuerkonforme Buchführung</li>
                    <li> <FontAwesomeIcon icon={faCheck} /> leichte Bedienung</li>
                    <li> <a href="#access-div" className="button">Jetzt Testen</a></li>
                </ul>
                <div id="info-div" className="user-info-div">
                    <h3>WICHTIGER HINWEIS</h3>
                    <p>Testversion von cardoc - digitales Fahrtebuch. Erstellt mit React.js, PHP, MySQL und Docker.
                        Bitte nutze die unten angegebenen Login-Daten, eine ausgedachte E-Mail-Adresse oder lösche dein Profil nach Testung.
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
            <div id="legals-div">
                <Link className="legal-link">
                    <span className="link-normal">Impressum</span>
                </Link>
                <Link className="legal-link">
                    <span className="link-normal">Datenschutz</span>
                </Link>
            </div>

        </div>
    )
}

export default Landing;