import { Button, Container, Form, FormCheckbox, FormGroup, FormInput, Grid, GridRow, Header, Icon, Input, Message, TextArea } from "semantic-ui-react";
import NavBar from "../../app/layout/NavBar";

export default function ContactUs(){
    const customButtonStyle = {
        backgroundColor: '#33737d',
        color: 'white',
        fontSize: 'medium',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
    };
    return(
        <>
            <NavBar />
            <div className="page-container">
                <h1 className="contact-header">Contact us</h1>
                <div className="contact-content">
                    <Message
                        attached
                        header='Welcome to our site!'
                        content='Fill out the form below to contact us'
                    />
                    <Form className='attached fluid segment'>
                        <FormGroup widths='equal'>
                            <FormInput
                                fluid
                                label='First Name'
                                placeholder='First Name'
                                type='text'
                            />
                            <FormInput
                                fluid
                                label='Last Name'
                                placeholder='Last Name'
                                type='text'
                            />
                            <FormInput
                                fluid
                                label='Email Address'
                                placeholder='Email Address'
                                type='text'
                                />
                        </FormGroup>
                        <TextArea placeholder='Message' style={{ minHeight: 160 }} />
                        <FormCheckbox style={{marginTop: '8px'}} inline label='I agree to the terms and conditions' />                            <Button style={customButtonStyle}>Submit</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}