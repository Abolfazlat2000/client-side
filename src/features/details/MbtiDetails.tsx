import react from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button, Image } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores/store';

export default function MbtiDetails() {
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
        navigate('/AgreementPage');
    }
    return(
        <>
            <NavBar />
            <div className='page-container'>
                <div className='Title'>
                    <h1 style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: '3rem', textAlign: 'center'}}>MBTI</h1>
                </div>
                <div className='description-image'>
                    <div className='Description'>
                        <p style={{marginTop: -20, marginLeft: 120, fontSize: '1.6rem', fontWeight: 'medium'}}>Welcome to our MBTI Test!</p>
                        <p style={{ marginTop:-60, marginRight: 100, marginLeft: 120, direction: 'ltr', fontWeight: 'normal', fontSize: '1.2rem', lineHeight: 2.5}}>
                        <br />a fascinating journey into self-discovery! Uncover the intricacies of your personality by answering thought-provoking questions that explore your preferences in social interactions, decision-making, perception, and planning. Embark on this insightful exploration and gain a deeper understanding of yourself, your communication style, and the dynamics of your relationships. Begin your journey now!
                        </p>
                        <div className='Start-button' style={{marginLeft: 125}}>
                            <Button onClick={handleOnclickButton} style={customButtonStyle}  type='button' content='Start' />
                        </div>
                    </div>
                    <div>
                        <Image src='assets/pic9.PNG' alt='mbti-background' style={{height: 350, width: 350, marginRight: 500, marginBottom: 100}} />
                    </div>
                </div>
            </div>
        </>
    )
}