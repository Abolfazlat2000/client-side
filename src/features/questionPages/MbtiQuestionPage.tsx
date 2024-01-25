import react, { useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { TestReadDTO } from '../../app/shared/TestReadDTO';

export default observer (function MbtiQuestionPage(){
    const {counselingStore} = useStore();
    const {setActiveItem, nextQuestion, getCurrentQuestion, loadTests} = counselingStore;
    const [currentQuestion, setCurrentQuestion] = useState<TestReadDTO | null>(null);

    useEffect(() => {
        loadTests(1);
        setCurrentQuestion(getCurrentQuestion);
    }, []);

    const handleNextQuestion = () => {
        if(currentQuestion?.number === 60) {
            setActiveItem("additionalQuestions")
        } else {
            nextQuestion();
            setCurrentQuestion(getCurrentQuestion);
        }
    };

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10
    };
    
    return(
        <>
            <NavBar />
            <div className='question-page-container'>
                <div className='title' style={{textAlign: 'center'}}>
                    <p style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: '2rem', textAlign: 'center'}}>MBTI Test</p>
                </div>
                {currentQuestion && (
                <div className='questions'>
                    {/* questions should come one by one from API */}
                    <p style={{marginLeft: 450, marginRight: 450}}>{currentQuestion.question}</p>
                
                {/* answers will come in multiple choise form from API */}
                    {/* <ul>
                        {currentQuestion.answers.map((answer) => (
                            <li key={answer.id}>{answer.title}</li>
                        ))}
                    </ul> */}
                    <div className='button-container' style={{marginBottom: 150, marginLeft: 100}} >
                        {/* we have to use if statement here,        
                        when we're in the last question, the content of button will be finish */}
                        <Button onClick={handleNextQuestion} style={customButtonStyle}  type='button'>
                            {currentQuestion?.number === 60 ? 'Further' : 'Next'}
                        </Button>
                    </div>
                </div>
                )}
            </div>
            
        </>
    )
})