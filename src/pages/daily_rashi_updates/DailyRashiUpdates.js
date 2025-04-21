import React, { useEffect, useState } from 'react'
import 'core-js'
import { CTabList, CTabs, CTab, CTabContent } from '@coreui/react';
import List from './components/List';
import Manage from './components/Manage';
import { useNavigate, useLocation } from 'react-router-dom';

function DailyRashiUpdates() {

    const [activeTab, setActiveTab] = useState('list');

    const navigate = useNavigate();
    const location = useLocation();

    const swithTab = (tab) => {
        setActiveTab(tab);
        navigate("/page/daily_rashi_updates?page=" + tab)
    }

    //To Activate Right Tab
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const page = urlParams.get('page');
        if (page && (page === 'list' || page === 'manage')) {
            setActiveTab(page);
        } else {
            // Default to the 'list' tab if no query string is present
            setActiveTab('list');
        }
    }, [location.search]);

    const tabStyle = (isActive) => ({
        backgroundColor: isActive ? '#ff9933' : '#ffffff',
        color: isActive ? '#ffffff' : '#000000',
        border: '1px solid #ff9933',
        cursor: 'pointer',
        marginRight: '5px'
    });

    return <>
        <CTabs activeItemKey={activeTab}>
            <CTabList style={{ "float": "right" }} variant="pills">
                <CTab itemKey="list" onClick={e => swithTab("list")} style={tabStyle(activeTab === 'list')}>List</CTab>
                <CTab itemKey="manage" onClick={e => swithTab("manage")} style={tabStyle(activeTab === 'manage')}>Manage</CTab>
            </CTabList>
        </CTabs> <br /><br />
        <CTabContent>
            {activeTab == "list" ? <List /> : <Manage />}
        </CTabContent>
    </>
}

export default DailyRashiUpdates;