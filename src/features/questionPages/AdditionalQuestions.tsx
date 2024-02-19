import react, { useEffect, useState } from 'react';
import NavBar from '../../app/layout/NavBar';
import { Button, Image, Input } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import { ExtraQuestionDTO } from '../../app/shared/ExtraQuestionDTO';
import agent from '../../app/api/agent';
import { useNavigate } from 'react-router-dom';



export default observer (function AdditionalQuestions(){
    const {counselingStore} = useStore();
    const {setActiveItem, handleExtraAnswer,extAnswers, isInput, categoryId, loadExtraTests,extraTests,extAnswersTitle,handleAnswerTitle,userInfo} = counselingStore;
    const [categoryIds, setCategoryIds] = useState([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    const navigate = useNavigate();
    let currentCategoryId: number;
    const [inputImage, setInputImage] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [extAnswersValue, setExtAnswersValue] = useState("");
    const [HighlightedIndex, setHighlightedIndex] = useState<Number>();

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
            setHighlightedIndex(-10);

        }
    };

    const  handleNextQuestion = async() => {
        if(categoryIds.length === 0) {
            await handleAnswerSelect(extAnswersValue);
            if (categoryId === 1){
                console.log("mbti");
                setActiveItem("mbtiResultPage");
            } else if (categoryId === 2){
                console.log("phq");
                setActiveItem("phqResultPage");
            } else if (categoryId === 3) {
                console.log("gad");
                setActiveItem("gadResultPage");
            }
        }else {
            if ((isInput || inputImage) && textAreaValue) {
                setExtAnswersValue(extAnswersValue+textAreaValue+"|");
            }
            loadQuestionForCurrentCategory();
        }
    };

    const handleImageSelect = async (index: number) => {
        setHighlightedIndex(index);
        //await handleAnswerSelect(extAnswersTitle[index]);
        setExtAnswersValue(extAnswersValue+extAnswersTitle[index]+"|");
    };

    const handleAnswerSelect = async (answerTitle: string) => {

        let userAnswer: string = answerTitle;
        try {
            if (userInfo) {

                await agent.Tests.CreateUserAnswer({
                    userId: userInfo.userId,
                    userAnswerTitle: userAnswer,
                });
            }
            setExtAnswersValue("");
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
                    <p style={{marginLeft: -150, marginRight: 450, marginBottom:20, marginTop: 20}}>{extraTests.question}</p>

                    {/* answers will come in multiple choise form from API */}
                    {isInput ?
                        (
                            <textarea
                                style={{
                                    height: '100px', // Adjust height as needed
                                    width: '350px', // Adjust width as needed
                                    marginRight: '100px',
                                    marginLeft: '-150px',
                                    resize: 'none', // Prevents resizing
                                    overflow: 'auto', // Allows scrolling
                                    verticalAlign: 'top', // Aligns text to the top
                                    padding: '0', // Adjust padding as needed
                                    border: '0px'
                                }}
                                value={textAreaValue}
                                onChange={(e) => setTextAreaValue(e.target.value)}
                            />
                        ) : (
                            <ul className='listContainer' style={{marginLeft: -150, marginRight: 300}}>
                                {extAnswers!.map((answer: string, index: number) =>
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginRight:'10px' }}>
                                        <Image
                                            className={index === HighlightedIndex ? 'highlighted': ''}
                                            onClick={() => inputImage ? '' : handleImageSelect(index)}
                                            style={{height: 250, width: 250, marginRight: 100, marginLeft: 20}}
                                            src={answer}
                                            alt={`${index + 1}`}
                                        />

                                    </li>
                                )}
                            </ul>
                    )}
                    {inputImage ?
                        <textarea
                            style={{
                                height: '100px', // Adjust height as needed
                                width: '350px', // Adjust width as needed
                                marginRight: '100px',
                                marginLeft: '-150px',
                                marginTop: '-5px',
                                resize: 'none', // Prevents resizing
                                overflow: 'auto', // Allows scrolling
                                verticalAlign: 'top', // Aligns text to the top
                                padding: '0', // Adjust padding as needed
                                border: '0px'
                            }}
                            value={textAreaValue}
                            onChange={(e) => setTextAreaValue(e.target.value)}
                        /> : null}
                    <div className='button-container' style={{marginTop: 10, marginLeft: -150}} >
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