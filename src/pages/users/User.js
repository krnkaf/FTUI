import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CTabList, CTabs, CTab, CTabContent } from '@coreui/react';
import List from './components/List';
import Manage from './components/Manage';

function User() {
    const [activeTab, setActiveTab] = useState('list');
    const navigate = useNavigate();
    const location = useLocation();

    const switchTab = (tab) => {
        setActiveTab(tab);
        navigate("/page/user?page=" + tab);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const page = urlParams.get('page');
        if (page && (page === 'list' || page === 'manage')) {
            setActiveTab(page);
        } else {
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

    return (
        <>
            <CTabs activeItemKey={activeTab}>
                <CTabList style={{ float: "right", marginRight: '10px' }} variant="pills">
                    <CTab
                        itemKey="list"
                        onClick={() => switchTab("list")}
                        style={tabStyle(activeTab === 'list')}
                    >
                        List
                    </CTab>
                    <CTab
                        itemKey="manage"
                        onClick={() => switchTab("manage")}
                        style={tabStyle(activeTab === 'manage')}
                    >
                        Manage
                    </CTab>
                </CTabList>
            </CTabs> <br/><br/>
            <CTabContent>
                {activeTab === "list" ? <List /> : <Manage />}
            </CTabContent>
        </>
    );
}

export default User;
