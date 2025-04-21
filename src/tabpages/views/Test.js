import { CCol, CContainer, CHeaderDivider, CModal, CModalBody, CModalHeader, CRow, CCard, CCardHeader, CCardBody, CButton } from "@coreui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { DetailedContext } from "./TableView";
import { UserContext } from "../Inquiry";
import Submit from "./Submit";
import SupportVisible from "./SupportVisible";

const ProfileCard = ({ name, dob, tob, city_id, visible, from }) => {
    return (
        <CCard
            className="mb-3"
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                width: '100%',
                visibility: visible ? 'visible' : 'hidden',
            }}
        >
            <CCardHeader style={{ backgroundColor: '#f5f5f5', padding: '12px 20px' }}>
                <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{from}</h5>
            </CCardHeader>
            <CCardBody style={{ padding: '10x 20px', fontSize: '13px', color: '#555' }}>
                <strong>Name:</strong> {name || 'N/A'} <br />
                <strong>DOB:</strong> {dob || 'N/A'} <br />
                <strong>TOB:</strong> {Intl.DateTimeFormat('en-us', { hour: '2-digit', minute: '2-digit', hour12: true }).format((new Date(`1970-01-01T${tob}:00Z`))) || 'N/A'} <br />
                <strong>POB:</strong> {city_id || 'N/A'}
            </CCardBody>
        </CCard>
    );
};

const Test = ({ item }) => {

    const { setShowDetailedView } = useContext(DetailedContext);
    const { fromPage, status, state, fetchInquiries, category_type } = useContext(UserContext);
    

    const handleBackButtonClick = () => setShowDetailedView(false);

    return (
        <CModal visible={true} backdrop="static" size="xl">
            <CModalHeader closeButton={false}>
                <CContainer>
                    <CRow>
                        <CButton
                            style={{
                                flex: '0 0 6%',
                                marginRight: '15px',
                                padding: '8px 15px',
                                backgroundColor: '#fff',
                                color: '#FF9933',
                                border: '1px solid #FF9933',
                                borderRadius: '5px',
                                fontWeight: 600,
                            }}
                            onClick={handleBackButtonClick}
                        >
                            <span className="material-icons"><FaSignOutAlt /></span>
                        </CButton> | Purchased | Payment Badge
                    </CRow>
                    <CRow>
                        Category - Question - Purchased
                    </CRow>
                </CContainer>
            </CModalHeader>

            <CHeaderDivider />

            <CModalBody>
                <CContainer>
                    <CRow>
                        <CCol>
                            <CRow>
                                <CCol>
                                    <ProfileCard
                                        name={item.profile1.name}
                                        dob={item.profile1.dob}
                                        tob={item.profile1.tob}
                                        city_id={item.profile1.city_id}
                                        visible={true}
                                        from={"Profile 1"}
                                    />
                                </CCol>
                                <CCol>
                                    {item.profile2 &&
                                        <ProfileCard
                                            name={item.profile2.name}
                                            dob={item.profile2.dob}
                                            tob={item.profile2.tob}
                                            city_id={item.profile2.city_id}
                                            visible={item.profile2}
                                            from={"Profile 2"}
                                        />
                                    }
                                </CCol>
                            </CRow>
                            <CRow>
                                {
                                    (() => {
                                        var x = useContext(UserContext).id;
                                        if (x == 1 || x == 2) {
                                            return <SupportVisible currentTask={item} inquiry_id={item.inquiry_id} />;
                                        }
                                        else if ((x == 3 && fromPage === 'expert') || (x == 4 && fromPage === 'translator')) {
                                            if (status === 'pending') {
                                                return <Submit inquiry_id={item.inquiry_id} />;
                                            }
                                        }
                                        else if ((x == 5 && fromPage === 'reviewer')) {
                                            if (status === 'pending') {
                                                return <CButton onClick={handleReviewerPush} style={{ marginTop: '20px', backgroundColor: '#ff9933', color: 'white' }}>Approve</CButton>
                                            }
                                        }
                                        return <>-/-</>;
                                    })()
                                }
                            </CRow>
                        </CCol>
                        <CCol>
                            Comment Timeline
                        </CCol>
                    </CRow>
                </CContainer>
            </CModalBody>
        </CModal>
    )
};

export default Test;