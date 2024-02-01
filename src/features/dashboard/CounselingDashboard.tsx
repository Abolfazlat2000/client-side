import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import AgreementPage from "../additional/AgreementPage";
import UserInfoForm from "../additional/UserInfoForm";
import GadDetails from "../details/GadDetails";
import MbtiDetails from "../details/MbtiDetails";
import PhqDetails from "../details/PhqDetails";
import GadQuestionPage from "../questionPages/GadQuestionPage";
import MbtiQuestionPage from "../questionPages/MbtiQuestionPage";
import PhqQuestionPage from "../questionPages/PhqQuestionPage";
import GadResultPage from "../results/GadResultPage";
import MbtiResultPage from "../results/MbtiResultPage";
import PhqResultPage from "../results/PhqResultPage";
import AdditionalQuestions from "../questionPages/AdditionalQuestions";
import CategoryList from "../questionPages/CategoryList";
import HomePage from "../../app/home/HomePage";
import { observer } from "mobx-react-lite";
import ContactUs from "../details/ContactUs";


export default observer(function CounselingDashboard(){
    
    const {counselingStore} = useStore();
    const {activeItem} = counselingStore;

    const pages = {
        gadDetails: <GadDetails />,
        phqDetails: < PhqDetails />,
        mbtiDetails: <MbtiDetails />,
        gadQuestionPage: <GadQuestionPage />,
        phqQuestionPage: <PhqQuestionPage />,
        mbtiQuestionPage: <MbtiQuestionPage />,
        gadResultPage: <GadResultPage />,
        phqResultPage: <PhqResultPage />,
        mbtiResultPage: <MbtiResultPage />,
        agreementPage: <AgreementPage />,
        userInfoForm: <UserInfoForm />,
        additionalQuestions: <AdditionalQuestions />,
        categoryList: <CategoryList />,
        homePage: <HomePage />,
        contactUs: <ContactUs />
    }

    return(
        <Grid>
            <Grid.Column>
                {pages[activeItem as keyof typeof pages]}
            </Grid.Column>
        </Grid>
    )
})