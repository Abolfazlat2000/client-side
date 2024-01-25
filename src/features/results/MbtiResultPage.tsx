import { observer } from "mobx-react-lite";
import NavBar from "../../app/layout/NavBar";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer( function MbtiResultPage(){
    const {counselingStore} = useStore();
    const {setActiveItem} = counselingStore;

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10
    };
    
    const handleButtonClick = () => {
        setActiveItem('homePage');
    }
    return(
        <>
        <NavBar />
        <div className="page-container">
            <div className="show-score">
                <p style={{color: '#242424'}}>You have:
                    {/* {calculateFinalResult([
                            {min: 0, max:4, resultType:'Minimal anxiety'},
                            {min: 5, max:9, resultType:'Mild anxiety'},
                            {min: 10, max:14, resultType:'Moderate anxiety'},
                            {min: 15, max:21, resultType:'severe anxiety'}
                
                        ])} */}
                </p>
            </div>
                
            <div className="recommendation">
                
            </div>
            <Button onClick={handleButtonClick} style={customButtonStyle}  type='button'>Take me to The Home</Button>
        </div>
        </>
    )
})