import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import { Button } from "semantic-ui-react";

export default function NavBar(){
    const [isHoveredHome, setIsHoveredHome] = useState(false);
    const [isHoveredTests, setIsHoveredTests] = useState(false);
    const [isHoveredContact, setIsHoveredContact] = useState(false);
    const {counselingStore} = useStore();
    const {setActiveItem} = counselingStore;


    const HomeLinkStyle = {
        color: isHoveredHome ? '#48767d' : 'beige'

    }
    const TestsLinkStyle = {
        color: isHoveredTests ? '#48767d' : 'beige'
    }
    const ContactLinkStyle = {
        color: isHoveredContact ? '#48767d' : 'beige'
    }

    const handleHomeNavigation = () => {
        setActiveItem('homePage');
    }
    const handleTestsNavigation = () => {
        setActiveItem('categoryList');
    }
    const handleContactNavigation = () => {
        setActiveItem('contactUs');
    }
    return(
        <nav className="navbar" >
            <div className="left-side">
                Counseling
            </div>
            <div className="right-side">
                <span style={{paddingRight: 20}} >
                    <p style={HomeLinkStyle} onClick={handleHomeNavigation} className="navbar-link" onMouseOver={() => setIsHoveredHome(true)} onMouseOut={() => setIsHoveredHome(false)}>Home</p>
                </span>
                <span style={{paddingRight : 20}}>
                <p style={TestsLinkStyle} onClick={handleTestsNavigation} className="navbar-link" onMouseOver={() => setIsHoveredTests(true)} onMouseOut={() => setIsHoveredTests(false)}>Tests</p>
                </span>
                <span style={{paddingRight : 20}}>
                <p style={ContactLinkStyle} onClick={handleContactNavigation} className="navbar-link" onMouseOver={() => setIsHoveredContact(true)} onMouseOut={() => setIsHoveredContact(false)}>Contact us</p>

                </span>
            </div>
        </nav>
    )
}