import react, { useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { ExtraQuestionDTO } from '../../app/shared/ExtraQuestionDTO';
import agent from '../../app/api/agent';
import { useNavigate } from 'react-router-dom';



export default observer (function AdditionalQuestions(){
    const {counselingStore} = useStore();
    const {setActiveItem, nextQuestion, getCurrentQuestion, handleExtraAnswer,extAnswers, isInput, categoryId, loadExtraTests,extraTests} = counselingStore;
    const [currentQuestion, setCurrentQuestion] = useState<ExtraQuestionDTO | null>(null);
    const [categoryIds, setCategoryIds] = useState([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    const navigate = useNavigate();


    useEffect(() => {
        loadQuestionForCurrentCategory();
    }, []);

    const loadQuestionForCurrentCategory = async () => {
        if(categoryIds.length > 0) {
            console.log(categoryIds);
            const currentCategoryId = categoryIds[0];
            const newCategoryIds = categoryIds.slice(1); // Create a new array without the first element
            setCategoryIds(newCategoryIds); // Update state
            console.log(newCategoryIds);
            console.log(currentCategoryId);
            if (currentCategoryId !== undefined) {
                await loadExtraTests(currentCategoryId);
                handleExtraAnswer();
                console.log(extraTests);
            }
        }
    };

    const  handleNextQuestion = () => {
        if(categoryIds.length === 0) {
            if (categoryId === 1){
                setActiveItem("mbtiResultPage");
            } else if (categoryId === 2){
                setActiveItem("phqResultPage");
            } else if (categoryId === 3) {
                setActiveItem("gadResultPage");
            }
        }else {
            loadQuestionForCurrentCategory();
        }
    };

    // const handleAnswerSelect = async (answer: AnswerReadDTO, inputAnswer?: string) => {
    //     getResult(answer.score);
    //     let userAnswer = answer.title;
    //     if (answer.categoryID !== 4 && answer.categoryID !== 5) {
    //         userAnswer = inputAnswer ?? answer.title ;
    //     }
    //     try {
    //         await agent.Tests.CreateUserAnswer({
    //             userAnswerID: userAnswerId,
    //             userAnswerTitle: answer.title,
    //             categoryID: answer.categoryID,
    //             questionNumber: currentQuestion?.number ?? 0
    //         });
    //         incrementUserAnswerId();
    //     } catch (error) {
    //         console.error('Error creating user answer', error);
    //     }
    // };

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
                {extraTests && (
                <div className='questions'>
                    {/* questions should come one by one from API */}
                    <p style={{marginLeft: 450, marginRight: 450}}>{extraTests.question}</p>

                {/* answers will come in multiple choise form from API */}
                {isInput ? (
                            <input type="text" />
                           ) : (
                            extAnswers!.map((answer: string, index: number) => <Image key={index} src={answer} alt={`${index + 1}`} />)
                )}
                    <div className='button-container' style={{marginBottom: 150, marginLeft: 100}} >
                        {/* we have to use if statement here,
                        when we're in the last question, the content of button will be finish */}
                        <Button onClick={handleNextQuestion} style={customButtonStyle}  type='button'>
                            {categoryIds.length === 0 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
                )}
            </div>

        </>
    )
})