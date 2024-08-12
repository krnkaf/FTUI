import React, { useEffect,useState } from 'react'
import { Provider } from 'react-redux'
import 'core-js'
import { CTabList, CTabs,CTab,CTabPanel,CTabContent } from '@coreui/react';
import List from './components/List';
import Manage from './components/Manage';
import { useNavigate,useLocation  } from 'react-router-dom';

function DailyAusTimeUpdate(){

    const [activeTab, setActiveTab] = useState('list');

    const navitate = useNavigate();
    const location = useLocation();

    const swithTab = (tab) =>{
        setActiveTab(tab);
        navitate("/page/daily_aus_time_update?page="+tab)
    }
  
    //To Activate Right Tab
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const page = urlParams.get('page');
        if (page && (page === 'list' || page === 'manage')) {
            setActiveTab(page);
        } else {
            // Default to the 'list' tab if no query string is present
            setActiveTab('list');
        }
    },[location.search]);

    return <>
            <CTabs activeItemKey={activeTab}>
                <CTabList style={{"float":"right"}}  variant="pills">
                    <CTab itemKey="list" onClick={e=>swithTab("list")}>List2</CTab>
                    <CTab itemKey="manage" onClick={e=>swithTab("manage")}>Manage</CTab>
                </CTabList>
            </CTabs>
            <CTabContent>
                {activeTab=="list"?<List/>:<Manage/>}
            </CTabContent>
            
            </>
}

export default DailyAusTimeUpdate;