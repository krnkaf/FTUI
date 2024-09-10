import React from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import SupportVisible from './SupportVisible'; // Import the SupportVisible component
import Submit from './Submit'; // Import the Submit component

const dummyProfiles = {
    profiles: [
        {
            name: "John Doe",
            dob: "1990-01-01",
            tob: "12:00 PM",
            pob: "Cityville",
        },
        {
            name: "Jane Smith",
            dob: "1985-05-15",
            tob: "08:30 AM",
            pob: "Townsville",
        }
    ],
    additional_information: "This is the additional information",
    support_text: "This is the additional text for Expert Reading",
    expert_text: "This is the additional text for Moderator Reading",
    moderator_text: "This is the additional text for Translator Reading",
    translator_text: "This is the additional text for Publishing",
};

const ProfileCard = ({ name, dob, tob, pob, visible }) => {
    if (!visible) return null;

    return (
        <CCard style={{ margin: '10px', flex: 1 }}>
            <CCardHeader>
                <h5>Profile Details</h5>
            </CCardHeader>
            <CCardBody>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Date of Birth:</strong> {dob}</p>
                <p><strong>Time of Birth:</strong> {tob}</p>
                <p><strong>Place of Birth:</strong> {pob}</p>
            </CCardBody>
        </CCard>
    );
};

const DetailedView = ({ item, onClose, fromPage }) => {
    const showTwoProfiles = item.category.toLowerCase() === 'compatibility';
    
    // Determine which text sections to show
    let textsToShow = [];
    switch (fromPage) {
        case 'NewInquiry':
            textsToShow = [dummyProfiles.additional_information];
            break;
        case 'ExpertReading':
            textsToShow = [
                dummyProfiles.additional_information,
                dummyProfiles.support_text
            ];
            break;
        case 'Moderator':
            textsToShow = [
                dummyProfiles.additional_information,
                dummyProfiles.support_text,
                dummyProfiles.expert_text
            ];
            break;
        case 'Translator':
            textsToShow = [
                dummyProfiles.additional_information,
                dummyProfiles.support_text,
                dummyProfiles.expert_text,
                dummyProfiles.moderator_text
            ];
            break;
        case 'Publish':
            textsToShow = [
                dummyProfiles.additional_information,
                dummyProfiles.support_text,
                dummyProfiles.expert_text,
                dummyProfiles.moderator_text,
                dummyProfiles.translator_text
            ];
            break;
        case 'Cancelled':
            textsToShow = [
                dummyProfiles.additional_information,
                dummyProfiles.support_text,
                dummyProfiles.expert_text,
                dummyProfiles.moderator_text,
                dummyProfiles.translator_text
            ];
            break;
        default:
            textsToShow = [];
            break;
    }

    const isSubmitVisible = fromPage !== 'Cancelled' && fromPage !== 'NewInquiry';

    return (
        <div style={{
            position: 'fixed',
            top: 40,
            left: 100,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            overflow: 'hidden',
        }}>
            <div style={{
                background: 'white',
                borderRadius: '8px',
                overflow: 'auto',
                width: '80%',
                maxWidth: '1000px',
                height: '80%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <CCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CCardHeader>
                        <h4>{item.question}</h4>
                        <CButton
                            color="secondary"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 1001
                            }}
                            onClick={onClose}
                        >
                            Close
                        </CButton>
                    </CCardHeader>
                    <CCardBody style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                                <CCol md={6}>
                                    <ProfileCard
                                        name={dummyProfiles.profiles[0].name}
                                        dob={dummyProfiles.profiles[0].dob}
                                        tob={dummyProfiles.profiles[0].tob}
                                        pob={dummyProfiles.profiles[0].pob}
                                        visible={true}
                                    />
                                </CCol>
                                {showTwoProfiles && (
                                    <CCol md={6}>
                                        <ProfileCard
                                            name={dummyProfiles.profiles[1].name}
                                            dob={dummyProfiles.profiles[1].dob}
                                            tob={dummyProfiles.profiles[1].tob}
                                            pob={dummyProfiles.profiles[1].pob}
                                            visible={true}
                                        />
                                    </CCol>
                                )}
                            </div>
                            <div style={{ textAlign: 'center', margin: '20px' }}>
                                {textsToShow.map((text, index) => (
                                    <div key={index}>
                                        <p>{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                            <CRow style={{ width: '100%', justifyContent: 'center' }}>
                                <CCol md={8}>
                                    {isSubmitVisible ? (
                                        <Submit />
                                    ) : (
                                        <SupportVisible currentTask={item} />
                                    )}
                                </CCol>
                            </CRow>
                        </div>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    );
};

export default DetailedView;
