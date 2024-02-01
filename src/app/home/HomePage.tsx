import React, { useEffect, useState } from "react";
import { Button, Image } from "semantic-ui-react";
import NavBar from "../layout/NavBar";
import CategoryList from "../../features/questionPages/CategoryList";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function HomePage(){
    const navigate = useNavigate();
    const {counselingStore} = useStore();
    const {setActiveItem} = counselingStore;

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
    };
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimationClass('animate');
        }, 500)
        return () =>
        clearTimeout(animationTimeout)
    }, [])

    const handleOnclickButton = () => {
        setActiveItem('categoryList');
    }
    return(
        <div className="home-page">
            <NavBar />
            <div className="main-content">
                <Image src='assets/pic7.JPG' alt='home-page-background' fluid style={{position: 'fixed', top: 60, left: 0, width: '100%', height: '100%', zIndex: -1}} />
                <div className={`text-container ${animationClass}`}>
                    <h2 className="text-header">
                        Elvate Your Well-being with<br />Insightful Psychological Tests
                    </h2>
                    <h4 className="text-main" >
                        {/*a dedicated space for enhancing mental well-being<br />through advanced psycological assessments. */}
                        Welcome To Counseling,<br />Uncover valuable insights into your strengths and<br />personal challenges with our diverse range of tests.
                    </h4> 
                    <Button onClick={handleOnclickButton} floated = 'left' style={customButtonStyle}  type='button' content='Take me to the Test' />
                </div>
                <Image className={animationClass} src='assets/pic8.JPG' fluid style={{position: 'fixed', top: 135, left: 650, width: '350px', height: '350px'}}/>
            </div>
        </div>
    )
})