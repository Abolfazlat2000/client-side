import react, { useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { TestReadDTO } from '../../app/shared/TestReadDTO';
import { useNavigate } from 'react-router-dom';
import { AnswerSubmitDTO } from '../../app/shared/AnswerSubmitDTO';
import { AnswerReadDTO } from '../../app/shared/AnswerReadDTO';
import agent from '../../app/api/agent';

export default observer (function GadQuestionPage(){
    const {counselingStore} = useStore();
    const {setActiveItem, nextQuestion, getCurrentQuestion, getResult, loadTests, userAnswerId} = counselingStore;
    const [currentQuestion, setCurrentQuestion] = useState<TestReadDTO | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            await loadTests(3);
            setCurrentQuestion(getCurrentQuestion);
        };
    
        loadInitialData();
    }, [loadTests, getCurrentQuestion, setCurrentQuestion]);

    const handleNextQuestion = () => {
        if(currentQuestion?.number === 7) {
            setActiveItem("AdditionalQuestions")
        } else {
            counselingStore.nextQuestion();
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
        paddingBottom: 10,
    };

    const handleAnswerSelect = (answer: AnswerReadDTO) => {
        counselingStore.getResult(answer.score);
    }

    return(
        <>
            <NavBar />
            <div className='question-page-container'>
                <div className='title' style={{textAlign: 'center'}}>
                    <p style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: '2rem', textAlign: 'center'}}>GAD-7 Test</p>
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
                                        <input type="radio" name="answer" onClick={() => handleAnswerSelect(answer)} />
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
                            {currentQuestion?.number === 7 ? 'Further' : 'Next'}
                        </Button>
                    </div>
                </div>
                )}
            </div>
            
        </>
    )
})