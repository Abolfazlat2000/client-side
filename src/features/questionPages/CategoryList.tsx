
import { Button, Grid, Image, Item, Segment } from 'semantic-ui-react';
import NavBar from '../../app/layout/NavBar';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import MbtiDetails from '../details/MbtiDetails';
import { useNavigate } from 'react-router-dom';
// import { CategoryReadDTO } from '../../app/shared/CategoryReadDto';



export default function CategoryList(){
    const {counselingStore} = useStore();
    const {setActiveItem, setCategoryId} = counselingStore;
    const navigate = useNavigate();

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 50
    };

    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const animationTimeout = setTimeout(() => {
            setAnimationClass('animate');
        }, 500)
        return () =>
        clearTimeout(animationTimeout)
    }, [])

    // const handleOnclickMbtiButton = () => {
    //     navigate('/MbtiDetails');
    // }

    // const handleOnclickGadButton = () => {
    //     navigate('/GadDetails');
    // }

    // const handleOnclickPhqButton = () => {
    //     navigate('/PhqDetails');
    // }
    const handleOnclickButton = (id: number) => {
        if(id === 1)
            navigate('/MbtiDetails');
        if(id === 2)
            navigate('/PhqDetails');
        if(id === 3)
            navigate('/GadDetails');
    }
    
    return(
        <>
            <NavBar />
            <div className='categoryList-container'>
                <div>
                    <h1 style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: 'xx-large', textAlign: 'center'}}>Categories</h1>
                </div>
                 <div className='images-container'>
                    <div className='image-title'>
                        <span>
                            <Image className={animationClass} src='assets/pic19.png' alt='MBTI-image' style={{height: 250, width: 250, marginRight: 100, marginLeft: 100}} />
                        </span>
                        <span style={{marginTop: 20, marginRight: 80}}>
                            <Button style={customButtonStyle} onClick={() => {
                                setCategoryId(1)
                                handleOnclickButton(1)
                            }} >
                                MBTI
                            </Button>
                        </span>
                    </div>
                    <div className='image-title'>
                        <span>
                            <Image className={animationClass} src='assets/pic12.JPG' alt='PHQ-image' style={{height: 250, width: 250, marginRight: 100}} />
                        </span>
                        <span style={{marginTop: 20, marginRight: 130}} >
                            <Button style={customButtonStyle} onClick={() => {
                                setCategoryId(2)
                                handleOnclickButton(2)
                                }} >
                                PHQ-9
                            </Button>
                        </span>
                        
                    </div>
                    <div className='image-title'>
                        <span>
                            <Image className={animationClass} src='assets/pic20.JPG' alt='GAD-image' style={{height: 250, width: 250, marginRight: 100}} />
                        </span>
                        <span style={{marginTop: 20, marginRight: 135}}>
                            <Button style={customButtonStyle} onClick={() => {
                                setCategoryId(3)
                                handleOnclickButton(3)
                                }} >
                                GAD-7
                            </Button>
                        </span>
                        
                    </div>
                 </div>
        </div>
        
        </>
    );
}