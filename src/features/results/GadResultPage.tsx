import { useEffect, useState } from "react";
import NavBar from "../../app/layout/NavBar";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Accordion, AccordionTitle, Button, Image, Message, MessageHeader, MessageItem, MessageList } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default observer( function GadResultPage(){
    const {counselingStore} = useStore();
    const [defaultActiveIndex] = useState();
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

    const {calculateFinalResult} = counselingStore;
    useEffect(() => {
        counselingStore.calculateFinalResult([
            {min: 0, max:4, resultType:'Minimal anxiety'},
            {min: 5, max:9, resultType:'Mild anxiety'},
            {min: 10, max:14, resultType:'Moderate anxiety'},
            {min: 15, max:21, resultType:'severe anxiety'}
            
        ]);
    }, [counselingStore.calculateFinalResult, counselingStore]);

    const handleButtonClick = () => {
        setActiveItem('homePage');
    }
    return(
        <>
        <NavBar />
        <div className="page-container">
            <div className="show-score">
                <p style={{color: '#242424'}}>You have:
                    {calculateFinalResult([
            {min: 0, max:4, resultType:'Minimal anxiety'},
            {min: 5, max:9, resultType:'Mild anxiety'},
            {min: 10, max:14, resultType:'Moderate anxiety'},
            {min: 15, max:21, resultType:'severe anxiety'}
            
        ])}
                </p>
            </div>
            <div className="recommendation">
                <Image />
                <Message style={{backgroundColor: 'rgb(209, 228, 237)', marginTop: '49px'}}>
                    <MessageHeader>"Effective Strategies to Reduce Anxiety"</MessageHeader>
                    <p style={{fontSize: 'meduim', fontWeight: 'bold'}}>In today's fast-paced world, anxiety has become a common challenge for many. Here are some practical recommendations to help you manage and alleviate anxiety:</p>
                    <MessageList>
                        <MessageItem>
                            <MessageHeader>1. Practice Mindfulness:</MessageHeader>
                            Cultivate mindfulness through activities like deep breathing, meditation, or simply focusing on the present moment. Mindfulness can bring a sense of calm and reduce racing thoughts.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>2. Deep-Breathing Exercises:</MessageHeader>
                            Engage in deep-breathing exercises to regulate your breath. Inhale slowly for a count of four, hold for four, and exhale for four. This can activate the body's relaxation response.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>3. Progressive Muscle Relaxation(PMR):</MessageHeader>
                            Ease tension by systematically tensing and then relaxing different muscle groups. This technique helps release physical stress and promotes a sense of relaxation.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>4. Establish a Routine:</MessageHeader>
                            Create a daily routine to provide structure and predictability.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>5. Limit Exposure to Stressors:</MessageHeader>
                            Identify and minimize exposure to triggers causing anxiety.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>6. Connect with Others:</MessageHeader>
                            Share your feelings with friends, family, or a mental health professional. Connection and support can be invaluable in managing anxiety.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>7. Physical Activity:</MessageHeader>
                            Incorporate regular exercise into your routine. Physical activity releases endorphins, which are natural mood lifters, and can contribute to overall well-being.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>8. Quality Sleep:</MessageHeader>
                            Prioritize good sleep hygiene. Establish a calming bedtime routine and create a comfortable sleep environment to enhance the quality of your sleep.
                        </MessageItem>
                        <p style={{fontSize: 'meduim', fontWeight: 'bold'}}>Remember, everyone's journey is unique. Experiment with these strategies and find what works best for you. If anxiety persists, consider seeking guidance from a mental health professional for personalized support.</p>
                    </MessageList>
                </Message>
                <Button onClick={handleButtonClick} style={customButtonStyle}  type='button'>Take me to The Home</Button>

            </div>
        </div>
        </>
    )
})