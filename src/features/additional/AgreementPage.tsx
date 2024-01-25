import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Grid } from "semantic-ui-react";
import NavBar from "../../app/layout/NavBar";
import { useStore } from "../../app/stores/store";


export default function AgreementPage(){
    
    const [agree, setAgree] = useState(false);
    const {counselingStore} = useStore();
    const {categoryId} = counselingStore;
    const navigate = useNavigate();

    const handleAgree = () => {
        if(agree){
            navigate('/UserInfoForm');
        }
    };
    const handleCancel = () => {
        if(categoryId === 1){
            navigate('/MbtiDetails');
        } else if(categoryId === 2){
            navigate('/PhqDetails');
        } else if(categoryId === 3){
            navigate('/GadDetails');
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
}