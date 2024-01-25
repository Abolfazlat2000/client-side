import react from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button, Image } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer( function GadDetails() {
    const {counselingStore} = useStore();
    const {setActiveItem} = counselingStore;
    const navigate = useNavigate();

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10
    };
    
    const handleOnclickButton = () => {
        setActiveItem("agreementPage");
    }
    return(
        <>
            <NavBar />
            <div className='page-container'>
                <div className='Title' style={{marginBottom:'20px'}}>
                    <h1 style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: '3rem', textAlign: 'center'}}>GAD-7</h1>
                </div>
                <div className='description-image'>
                    <div className='Description'>
                        <p style={{marginTop: -20, marginLeft: 120, fontSize: '1.6rem', fontWeight: 'medium'}}>Welcome to our GAD-7 Test!</p>
                        <p style={{ marginTop:-60, marginRight: 100, marginLeft: 120, direction: 'ltr', fontWeight: 'normal', fontSize: '1.2rem', lineHeight: 2.5}}>
                            <br />an effective tool to assess and understand your levels of anxiety! Respond to seven carefully crafted questions that delve into common symptoms of Generalized Anxiety Disorder (GAD). Take the first step in managing your well-being by completing the GAD-7 Test today. Your mental health matters.
                        </p>
                        <div className='Start-button' style={{marginLeft: 125}}>
                            <Button onClick={handleOnclickButton} style={customButtonStyle}  type='button' content='Start' />
                        </div>
                    </div>
                    <div>
                        <Image src='assets/pic15.png' alt='gad-background' style={{height: 350, width: 350, marginRight: 500, marginBottom: 50}} />
                    </div>
                </div>
            </div>
        </>
    )
})