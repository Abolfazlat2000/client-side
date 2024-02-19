import react, { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import CounselingDashboard from '../../features/dashboard/CounselingDashboard';

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