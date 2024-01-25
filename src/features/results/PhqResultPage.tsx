import { useEffect, useState } from "react";
import NavBar from "../../app/layout/NavBar";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Accordion, AccordionTitle, Button, Image, Message, MessageHeader, MessageItem, MessageList } from "semantic-ui-react";

export default observer( function PhqResultPage(){
    const {counselingStore} = useStore();
    const {setActiveItem} = counselingStore;
    const [defaultActiveIndex] = useState();

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10
    }; 

    const handleButtonClick = () => {
        setActiveItem('homePage');
    }

    // const {calculateFinalResult} = counselingStore;
    // useEffect(() => {
    //     calculateFinalResult([
    //         {min: 0, max:4, resultType:'Minimal anxiety'},
    //         {min: 5, max:9, resultType:'Mild anxiety'},
    //         {min: 10, max:14, resultType:'Moderate anxiety'},
    //         {min: 15, max:21, resultType:'severe anxiety'}
            
    //     ]);
    // }, []);
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
                <Image />
                <Message style={{backgroundColor: 'rgb(209, 228, 237)', marginTop: '49px'}}>
                    <MessageHeader>"Effective Strategies to Manage Depression"</MessageHeader>
                    <p style={{fontSize: 'meduim', fontWeight: 'bold'}}>In the midst of navigating life's challenges, dealing with depression can be overwhelming. Here are some actionable recommendations to help you manage and alleviate symptoms of depression:</p>
                    <MessageList>
                        <MessageItem>
                            <MessageHeader>1. Establish a Daily Routine:</MessageHeader>
                            Create a structured daily schedule to provide a sense of stability and purpose. Consistency in activities can contribute to a more positive mindset.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>2. Engage in Regular Exercise:</MessageHeader>
                            Incorporate physical activity into your routine, as it can have a profound impact on mood. Even a short daily walk or gentle exercises can make a significant difference.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>3. Set Achievable Goals:</MessageHeader>
                            Break down tasks into smaller, achievable goals. Celebrate small victories, as they contribute to a sense of accomplishment and self-worth.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>4. Connect Socially:</MessageHeader>
                            Foster connections with friends, family, or support groups. Social interaction can provide emotional support and alleviate feelings of isolation.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>5. Practice Mindfulness and Meditation:</MessageHeader>
                            Cultivate mindfulness to bring awareness to the present moment. Meditation techniques can help manage intrusive thoughts and promote a sense of calm.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>6. Ensure Quality Sleep:</MessageHeader>
                            Prioritize a healthy sleep routine. Create a calming bedtime ritual and maintain a consistent sleep schedule to improve overall well-being.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>7. Limit Negative Influences:</MessageHeader>
                            Identify and reduce exposure to negative influences, including negative self-talk and environments that exacerbate depressive feelings.
                        </MessageItem>
                        <MessageItem>
                            <MessageHeader>8. Seek Professional Support:</MessageHeader>
                            Don't hesitate to reach out to mental health professionals. Therapists and counselors can provide valuable guidance and support tailored to your specific needs.
                        </MessageItem>
                        <p style={{fontSize: 'meduim', fontWeight: 'bold'}}>Remember, managing depression is a process, and it's okay to seek help. If you or someone you know is struggling, consider reaching out to a mental health professional for personalized assistance.</p>
                    </MessageList>
                </Message>
                <Button onClick={handleButtonClick} style={customButtonStyle}  type='button'>Take me to The Home</Button>

            </div>
        </div>
        </>
    )
})