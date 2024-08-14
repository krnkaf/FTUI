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

    return (
        <>
            <CTabs activeItemKey={activeTab}>
                <CTabList style={{ float: "right" }} variant="pills">
                    <CTab itemKey="list" onClick={() => switchTab("list")}>List</CTab>
                    <CTab itemKey="manage" onClick={() => switchTab("manage")}>Manage</CTab>
                </CTabList>
            </CTabs>
            <CTabContent>
                {activeTab === "list" ? <List /> : <Manage />}
            </CTabContent>
        </>
    );
}

export default User;
