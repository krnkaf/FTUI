import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [userTypeId] = useState(localStorage.getItem('user_type_id'));
    const [activeTab, setActiveTab] = useState('');
    const [visibleTabs, setVisibleTabs] = useState([]);

    const tabVisibility = {
        1: ['new', 'expert', 'translator', 'reviewer'],
        2: ['new', 'expert', 'translator', 'reviewer'],
        3: ['expert'],
        4: ['translator'],
        5: ['reviewer'],
    };

    useEffect(() => {
        if (userTypeId) {
            setVisibleTabs(tabVisibility[userTypeId] || []);
        }
    }, [userTypeId]);

    useEffect(() => {
        if (visibleTabs.length > 0) {
            setActiveTab(visibleTabs[0]);
        }
    }, [visibleTabs]);

    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab) {
            navigate(`/tabpages/inquiry/${activeTab}/pending`);
        }
    }, [activeTab, navigate]);
};

export default Index;
