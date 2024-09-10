import React, { Suspense, useState, useEffect } from 'react';
import { CTabs, CTab, CTabList, CTabContent, CTabPanel } from '@coreui/react';
import testJson from './test.json';

const T1 = React.lazy(() => import('./NewInquiry'));
const T2 = React.lazy(() => import('./ExpertReading'));
const T3 = React.lazy(() => import('./Moderator'));
const T4 = React.lazy(() => import('./Translator'));
const T5 = React.lazy(() => import('./Publish'));
const T6 = React.lazy(() => import('./Cancelled'));

const Inquiry = () => {
    const [testData, setTestData] = useState([]);

    useEffect(() => {
        setTestData(testJson);
    }, []);

    return (
        <CTabs activeItemKey="new_inquiry">
            <CTabList variant='underline'>
                <CTab itemKey="new_inquiry">New Inquiry</CTab>
                <CTab itemKey="expert_reading">Expert Reading</CTab>
                <CTab itemKey="moderator">Moderator</CTab>
                <CTab itemKey="translator">Translator</CTab>
                <CTab itemKey="publish">Publish</CTab>
                <CTab itemKey="cancelled">Cancelled</CTab>
            </CTabList>
            <CTabContent>
                <CTabPanel className="p-3" itemKey="new_inquiry">
                    <Suspense fallback={<div>Loading inquiry data...</div>}>
                        <T1 data={testData} />
                    </Suspense>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="expert_reading">
                    <Suspense fallback={<div>Loading Expert Reading...</div>}>
                        <T2 data={testData}/>
                    </Suspense>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="moderator">
                    <Suspense fallback={<div>Loading Moderator...</div>}>
                        <T3 data={testData}/>
                    </Suspense>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="translator">
                    <Suspense fallback={<div>Loading Translator...</div>}>
                        <T4 data={testData}/>
                    </Suspense>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="publish">
                    <Suspense fallback={<div>Loading Publish...</div>}>
                        <T5 data={testData}/>
                    </Suspense>
                </CTabPanel>
                <CTabPanel className="p-3" itemKey="cancelled">
                    <Suspense fallback={<div>Loading Cancelled...</div>}>
                        <T6 data={testData}/>
                    </Suspense>
                </CTabPanel>
            </CTabContent>
        </CTabs>
    );
};

export default Inquiry;
