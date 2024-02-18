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
    const {setActiveItem, handleExtraAnswer,extAnswers, isInput, categoryId, loadExtraTests,extraTests,extAnswersTitle,handleAnswerTitle} = counselingStore;
    const [categoryIds, setCategoryIds] = useState([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    const navigate = useNavigate();
    let currentCategoryId: number;
    const [inputImage, setInputImage] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState("");

    useEffect(() => {
        loadQuestionForCurrentCategory();
    }, []);

    const loadQuestionForCurrentCategory = async () => {
        if(categoryIds.length > 0) {
            currentCategoryId = categoryIds[0];
            const newCategoryIds = categoryIds.slice(1); // Create a new array without the first element
            setCategoryIds(newCategoryIds); // Update state
            if (currentCategoryId === 7 || currentCategoryId === 8) {
                setInputImage(true);
            }else {
                setInputImage(false);
            }
            if (currentCategoryId !== undefined) {
                await loadExtraTests(currentCategoryId);
                handleExtraAnswer();
                handleAnswerTitle();
            }
            setTextAreaValue("")

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

    const handleAnswerSelect = async (answerTitle: string, inputAnswer?: string) => {
        console.log("fuck you farnaz");

        let userAnswer: string = answerTitle;
        if (isInput) {
            userAnswer = answerTitle ;
        }
        try {
            await agent.Tests.CreateUserAnswer({
                userAnswerTitle: userAnswer,
                categoryID: currentCategoryId,
            });
        } catch (error) {
            console.error('Error creating user answer', error);
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
                {extraTests && (
                <div className='questions'>
                    {/* questions should come one by one from API */}
                    <p style={{marginLeft: -150, marginRight: 450, marginBottom:40}}>{extraTests.question}</p>
                    {inputImage ? <textarea
                                    style={{
                                        height: '100px', // Adjust height as needed
                                        width: '250px', // Adjust width as needed
                                        marginRight: '100px',
                                        marginLeft: '-50px',
                                        resize: 'none', // Prevents resizing
                                        overflow: 'auto', // Allows scrolling
                                        verticalAlign: 'top', // Aligns text to the top
                                        padding: '0', // Adjust padding as needed
                                    }}
                                    value={textAreaValue}
                                    onChange={(e) => setTextAreaValue(e.target.value)}
                                /> : null}
                    {/* answers will come in multiple choise form from API */}
                    {isInput ?
                        (
                            <textarea
                                style={{
                                    height: '250px', // Adjust height as needed
                                    width: '250px', // Adjust width as needed
                                    marginRight: '100px',
                                    marginLeft: '100px',
                                    resize: 'none', // Prevents resizing
                                    overflow: 'auto', // Allows scrolling
                                    verticalAlign: 'top', // Aligns text to the top
                                    padding: '0', // Adjust padding as needed
                                }}
                                value={textAreaValue}
                                onChange={(e) => setTextAreaValue(e.target.value)}
                            />
                        ) : (
                            <ul className='listContainer' style={{marginLeft: -150, marginRight: 300}}>
                                {extAnswers!.map((answer: string, index: number) =>
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        <Image onClick={() => handleAnswerSelect(extAnswersTitle[index])} style={{height: 250, width: 250, marginRight: 100, marginLeft: 100}} src={answer} alt={`${index + 1}`}/>

                                    </li>
                                )}
                            </ul>
                    )}
                    <div className='button-container' style={{marginTop: 150, marginLeft: -150}} >
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