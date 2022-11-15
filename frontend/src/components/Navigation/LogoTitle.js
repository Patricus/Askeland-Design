import React from "react";
import logo from "../../images/Logo.png";

function LogoTitle() {
    return (
        <div className="title">
            <img src={logo} alt="Askeland Design" className="logo" />
            <h1>ASKELAND DESIGN</h1>
            <p>Inspiration - Ideation - Realization</p>
        </div>
    );
}

export default LogoTitle;
