import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Form } from "semantic-ui-react";
import NavBar from "../../app/layout/NavBar";
import { useStore } from "../../app/stores/store";

const genderOptions = [
    {key: 'female', text: 'Female', value: 'female'},
    {key: 'male', text: 'Male', value: 'male'},
    {key: 'other', text: 'Other', value: 'other'},
]; 

export default function UserInfoForm(){
    const {counselingStore} = useStore();
    const {setActiveItem, categoryId} = counselingStore;
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(gender && age && name) {
            if(categoryId == 1)
                navigate("MbtiQuestionPage");
            else if(categoryId == 2)
                navigate("PhqQuestionPage");
            else if(categoryId == 3)
                navigate("GadQuestionPage");
        }
    }

    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 50
    };
    return(
        <>
            <NavBar />
            <div className="page-container">
                <Form className="form">
                    <Form.Field>
                        <label style={{color: '#33737d', fontSize: 'medium', marginBottom: 12}}>Name</label>
                        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label style={{color: '#33737d', fontSize: 'medium', marginBottom: 12}}>Gender</label>
                        <Dropdown placeholder="Select Gender" fluid selection options={genderOptions} value={gender} onChange={(_, {value}) => setGender(value as string)} />
                    </Form.Field>
                    <Form.Field>
                        <label style={{color: '#33737d', fontSize: 'medium', marginBottom: 12}}>Age</label>
                        <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Form.Field>
                    
                    <Button style={customButtonStyle} type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </>
    )
}