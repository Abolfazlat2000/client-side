import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    const [isHoveredHome, setIsHoveredHome] = useState(false);
    const [isHoveredTests, setIsHoveredTests] = useState(false);
    const [isHoveredContact, setIsHoveredContact] = useState(false);


    const HomeLinkStyle = {
        color: isHoveredHome ? '#48767d' : 'beige'
    }
    const TestsLinkStyle = {
        color: isHoveredTests ? '#48767d' : 'beige'
    }
    const ContactLinkStyle = {
        color: isHoveredContact ? '#48767d' : 'beige'
    }
    return(
        <nav className="navbar" >
            <div className="left-side">
                Counseling
            </div>
            <div className="right-side">
                <span style={{paddingRight: 20}} >
                    <Link to="/" style={HomeLinkStyle} className="navbar-link" onMouseOver={() => setIsHoveredHome(true)} onMouseOut={() => setIsHoveredHome(false)}>Home</Link>
                </span>
                <span style={{paddingRight : 20}}>
                <Link to="/categoryList" style={TestsLinkStyle} className="navbar-link" onMouseOver={() => setIsHoveredTests(true)} onMouseOut={() => setIsHoveredTests(false)}>Tests</Link>
                </span>
                <span style={{paddingRight : 20}}>
                <Link to="/fff" style={ContactLinkStyle} className="navbar-link" onMouseOver={() => setIsHoveredContact(true)} onMouseOut={() => setIsHoveredContact(false)}>Contact us</Link>

                </span>
            </div>
        </nav>
    )
}