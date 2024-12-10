import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CTabList, CTabs, CTab, CTabContent } from '@coreui/react';
import List from './components/List';
import Manage from './components/Manage';

function guest_profiles() {
    const [activeTab, setActiveTab] = useState('list');
    const navigate = useNavigate();
    const location = useLocation();

    const switchTab = (tab) => {
        setActiveTab(tab);
        navigate("/page/guestprofiles?page=" + tab);
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
            <Suspense fallback={<>Hello</>}>
                <CTabs activeItemKey={activeTab}>
                    <CTabList style={{ float: "right", marginRight: '1vw' }} variant="pills">
                        <CTab itemKey="list" onClick={() => switchTab("list")} style={{ backgroundColor: '#ff9933', border: 'none' }}>List</CTab>
                    </CTabList>
                </CTabs> <br/><br/>
                <CTabContent>
                    {activeTab === "list" ? <List /> : <Manage />}
                </CTabContent>
            </Suspense>
        </>
    );
}

export default guest_profiles;
