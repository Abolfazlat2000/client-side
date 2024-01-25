import NavBar from "../../app/layout/NavBar";

export default function MbtiResultPage(){
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
        </div>
        </>
    )
}