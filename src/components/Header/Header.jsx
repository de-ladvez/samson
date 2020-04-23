import React from "react";
import TopBar from "./TopBar/TopBar"
import Notification from "../Notification/Notification";

const Header = () => {
    return (
        <div>
            <TopBar/>
            <Notification/>
        </div>
    );
};

export default Header;