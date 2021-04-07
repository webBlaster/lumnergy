import React from "react";
import { Link } from "react-router-dom";
import "./setupbuttons.css";

const DesktopViewButtons = ({ route }) => {
    return (
        <span className="desktop-setup-form-container">
            <Link to={route} className="btn btn-primary mt-2 btn-block previous-button">Previous</Link>
            <button className="btn btn-primary next-button" type="submit">Next</button>
        </span>
    )
}

export default DesktopViewButtons;