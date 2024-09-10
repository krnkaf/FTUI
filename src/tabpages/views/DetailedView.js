import React from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import SupportVisible from './SupportVisible';
import Submit from './Submit';

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
        <CCard className="mb-3" style={{ flex: 1 }}>
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
                <CCard className="h-100 d-flex flex-column">
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
                    <CCardBody className="d-flex flex-column h-100 overflow-auto">
                        <CRow className="mb-4">
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
                        </CRow>
                        <div className="text-center mb-4">
                            {textsToShow.map((text, index) => (
                                <div key={index}>
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                        <CRow className="justify-content-center">
                            <CCol md={8}>
                                {isSubmitVisible ? (
                                    <Submit />
                                ) : (
                                    <SupportVisible currentTask={item} />
                                )}
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </div>
        </div>
    );
};

export default DetailedView;
