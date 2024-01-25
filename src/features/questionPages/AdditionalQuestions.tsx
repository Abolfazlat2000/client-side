import react, { useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { TestReadDTO } from '../../app/shared/TestReadDTO';
import { AnswerReadDTO } from '../../app/shared/AnswerReadDTO';
import agent from '../../app/api/agent';
import { useNavigate } from 'react-router-dom';


export default observer (function AdditionalQuestions(){
    const {counselingStore} = useStore();
    const {setActiveItem, nextQuestion, getCurrentQuestion, loadTests, categoryId, setSelectedAnswerId, selectedAnswerId} = counselingStore;
    const [currentQuestion, setCurrentQuestion] = useState<TestReadDTO | null>(null);
    const categoryIds = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const navigate = useNavigate();

    useEffect(() => {
        loadQuestionForCurrentCategory();
    }, []);

    const loadQuestionForCurrentCategory = () => {
        if(categoryIds.length > 0) {
            const currentCategoryId = categoryIds.shift();
            if (currentCategoryId !== undefined) {
                loadTests(currentCategoryId);
                setCurrentQuestion(getCurrentQuestion);
            }
        }
    };

    const handleNextQuestion = () => {
        try{
            await agent.Tests.UpdateAnswerValue(selectedAnswerId);
            
        } catch (error) {
            console.error('Error updating value', error);
        }
        if(currentQuestion?.number === 11) {
            if (categoryId === 1){
                navigate("MbtiResultPage")
            } else if (categoryId === 2){
                navigate("PhqResultPage");
            } else if (categoryId === 3) {
                navigate("GadResultPage")
            }
        } else {
            nextQuestion();
            setCurrentQuestion(getCurrentQuestion);
        }
    };

    const handleAnswerSelect = async(selectedAnswerId: number, score: number) => {
        setSelectedAnswerId(selectedAnswerId, score);
        try{
            await agent.Tests.UpdateAnswerValue(selectedAnswerId);
            setSelectedAnswerId(selectedAnswerId, score);
            
        } catch (error) {
            console.error('Error updating value', error);
        }
    };

    // resetResult();

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
                    <h2 style={{marginTop: 50, color: '#48767d', fontWeight: 'bolder', fontSize: '3rem', textAlign: 'center'}}>GAD-7 Test</h2>
                </div>
                {currentQuestion && (
                <div className='questions'>
                    {/* questions should come one by one from API */}
                    <p style={{marginLeft: 450, marginRight: 450}}>{currentQuestion.question}</p>
                
                {/* answers will come in multiple choise form from API */}
                    {/* <ul>
                        {currentQuestion.answers.map((answer) => (
                        
                            <li key={answer.answerID} onClick={() => handleAnswerSelect()}>
                                {answer.title}
                            </li>
                        ))}
                    </ul> */}
                    <div className='button-container' style={{marginBottom: 150, marginLeft: 100}} >
                        {/* we have to use if statement here,        
                        when we're in the last question, the content of button will be finish */}
                        <Button onClick={handleNextQuestion} style={customButtonStyle}  type='button'>
                            {currentQuestion?.number === 11 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
                )}
            </div>
            
        </>
    )
})