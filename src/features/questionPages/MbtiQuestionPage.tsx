import react, { useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { TestReadDTO } from '../../app/shared/TestReadDTO';
import { AnswerReadDTO } from '../../app/shared/AnswerReadDTO';

export default observer (function MbtiQuestionPage(){
    const {counselingStore} = useStore();
    const {setActiveItem, nextQuestion, getCurrentQuestion, loadTests} = counselingStore;
    const [currentQuestion, setCurrentQuestion] = useState<TestReadDTO | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    useEffect(() => {
        const loadInitialData = async () => {
            await loadTests(1);
            setCurrentQuestion(getCurrentQuestion);
        };

        loadInitialData();
    }, [loadTests, getCurrentQuestion, setCurrentQuestion]);

    const handleNextQuestion = () => {
        if(currentQuestion?.number === 60) {
            setActiveItem("additionalQuestions");
        } else {
            if (selectedAnswer !== "") {
                nextQuestion();
                setCurrentQuestion(getCurrentQuestion);
                setSelectedAnswer("");
                setErrorMessage(null);
            } else {
                setErrorMessage("Must Select one at least!");
            }
        }
    };
    const handleAnswerSelect = (answer: AnswerReadDTO) => {
        setSelectedAnswer(answer.answerID.toString());
        setErrorMessage(null);
    }
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
                    {errorMessage ?
                            <div className="ui warning message">
                                <i className="close icon"></i>
                                    <div className="header">
                                        You must select an answer first!
                                    </div>
                        </div>

                        : null}
                    <p style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: '2rem', textAlign: 'center'}}>MBTI Test</p>
                </div>
                {currentQuestion && (
                <div>
                    <div className='questions'>
                        {/* questions should come one by one from API */}
                        <p>{currentQuestion.number}. {currentQuestion.question}</p>

                        {/* answers will come in multiple choise form from API */}
                        <ul style={{ listStyleType: 'none' }}>
                            {currentQuestion.answers.map((answer) => (
                                <li key={answer.answerID} style={{ marginBottom: '10px' }}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={answer.answerID}
                                            checked={selectedAnswer === answer.answerID.toString()}
                                            onChange={() => handleAnswerSelect(answer)}
                                        />
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