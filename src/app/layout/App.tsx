import react, { useEffect, useState } from 'react';
import axios from 'axios';
// import HomePage from '../home/HomePage';
// // import CategoryDetail from '../../features/details/CategoryDetail';
// import CategoryList from '../../features/dashboard/CategoryList';
// // import agent from '../api/agent';
// // import MbtiDetails from '../../features/details/MbtiDetails';
// // import PhqDetails from '../../features/details/PhqDetails';
// import GadDetails from '../../features/details/GadDetails';
// import MbtiDetails from '../../features/details/MbtiDetails';
// import PhqDetails from '../../features/details/PhqDetails';
// import GadQuestionPage from '../../features/dashboard/GadQuestionPage';
// import { Route, Routes } from 'react-router-dom';
// import MbtiQuestionPage from '../../features/dashboard/MbtiQuestionPage';
// import PhqQuestionPage from '../../features/dashboard/PhqQuestionPage';
// import UserInfoForm from '../../features/additional/UserInfoForm';
// import AgreementPage from '../../features/additional/AgreementPage';
// import GadResultPage from '../../features/results/GadResultPage';
// import { err75or } from 'console';
// import { CategoryReadDTO } from '../shared/CategoryReadDto';
// import NavBar from './NavBar';
import { TestReadDTO } from '../shared/TestReadDTO';
import agent from '../api/agent';
// import { useStore } from '../stores/store';
// import HomePage from '../home/HomePage';
// import CategoryList from '../../features/questionPages/CategoryList';
import { CategoryReadDTO } from '../shared/CategoryReadDto';
import HomePage from '../home/HomePage';
import CategoryList from '../../features/questionPages/CategoryList';
import CounselingDashboard from '../../features/dashboard/CounselingDashboard';
import GadResultPage from '../../features/results/GadResultPage';
import { Route, Routes } from 'react-router-dom';
import MbtiDetails from '../../features/details/MbtiDetails';
import GadDetails from '../../features/details/GadDetails';
import PhqDetails from '../../features/details/PhqDetails';
import AgreementPage from '../../features/additional/AgreementPage';
import UserInfoForm from '../../features/additional/UserInfoForm';
import PhqQuestionPage from '../../features/questionPages/PhqQuestionPage';
import MbtiQuestionPage from '../../features/questionPages/MbtiQuestionPage';
import GadQuestionPage from '../../features/questionPages/GadQuestionPage';
import PhqResultPage from '../../features/results/PhqResultPage';
import MbtiResultPage from '../../features/results/MbtiResultPage';
import AdditionalQuestions from '../../features/questionPages/AdditionalQuestions';
import { useStore } from '../stores/store';
import ContactUs from '../../features/details/ContactUs';
// import GadDetails from '../../features/details/GadDetails';

// window.addEventListener('unhandlerrejection', event => {
//   console.error('unhandeled promise rejecttion', event.reason)
// })
// `interface Props{
//   categories: CategoryReadDTO[];
// }`
export default function App(){

  const {counselingStore} = useStore();
  const {setActiveItem} = counselingStore;
  
  useEffect(() => {
    setActiveItem('homePage');
  
  }, [setActiveItem, counselingStore]);


  return(
    <>
      <CounselingDashboard />

    </>

    

  )
}