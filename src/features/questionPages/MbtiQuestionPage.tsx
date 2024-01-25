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
        const loadInitialData = async () => {
            await loadTests(1);
            setCurrentQuestion(getCurrentQuestion);
        };
    
        loadInitialData();
    }, [loadTests, getCurrentQuestion, setCurrentQuestion]);

    const handleNextQuestion = async () => {
        if(currentQuestion?.number === 60) {
            setActiveItem("AdditionalQuestions")
        } else {
            await nextQuestion();
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
                <div>
                    <div className='questions'>
                        {/* questions should come one by one from API */}
                        <p>{currentQuestion.question}</p>

                        {/* answers will come in multiple choise form from API */}
                        <ul style={{ listStyleType: 'none' }}>
                            {currentQuestion.answers.map((answer) => (
                                <li key={answer.answerID} style={{ marginBottom: '10px' }}>
                                    <label>
                                        <input type="radio" name="answer" />
                                        {answer.title}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='button-container' style={{marginBottom: '120px', marginLeft: 50, marginTop: '50px'}}>
                        {/* we have to use if statement here,        
                        when we're in the last question, the content of button will be finish */}
                        <Button onClick={handleNextQuestion} style={customButtonStyle} type='button'>
                            {currentQuestion?.number === 60 ? 'Further' : 'Next'}
                        </Button>
                    </div>
                </div>
                )}
            </div>
            
        </>
    )
})