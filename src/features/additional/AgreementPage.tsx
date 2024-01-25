import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Grid } from "semantic-ui-react";
import NavBar from "../../app/layout/NavBar";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function AgreementPage(){
    
    const [agree, setAgree] = useState(false);
    const {counselingStore} = useStore();
    const {categoryId, setActiveItem} = counselingStore;


    const handleAgree = () => {
        if(agree){
            setActiveItem('userInfoForm');
        }
    };
    const handleCancel = () => {
        if(categoryId === 1){
           setActiveItem('mbtiDetails');
        } else if(categoryId === 2){
            setActiveItem('phqDetails');
        } else if(categoryId === 3){
            setActiveItem('gadDetails');
        }
        console.log("canceled");
    };

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'smaller',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    };

    return(
        <>
            <NavBar />
            <div className="agree-container">
                <div className="box">
                    <div className="agreement-text">
                        <p>The website will not store any information about you.<br />
                        The entered data is solely used for psycological analysis and research purpose.</p>
                    </div>
                    <div className="agreement-form">
                        <div>
                        <Checkbox label="I agree to the terms and conditions" checked={agree} onChange={() => setAgree(!agree)} />
                        </div> 
                        <div className="button-container">
                            <Button style={customButtonStyle} onClick={handleAgree}>Continue</Button>
                            <Button style={customButtonStyle} onClick={handleCancel}>Cancel</Button> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})