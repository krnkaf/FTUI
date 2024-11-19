import React, { useContext } from 'react';
import { CButton } from '@coreui/react';
import { commentContext } from './DetailedView';


const CommentHistory = ({ onClose }) => {
    const comments = useContext(commentContext)

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(0,0,0,0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
            overflow: 'hidden',
        }}>
            <div style={{
                background: 'white',
                backgroundColor: 'rgb(0,0,40)',
                overflow: 'auto',
                width: '80%',
                maxWidth: '1000px',
                height: '80%',
                maxHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
            }}>

                <CButton
                    color="secondary"
                    onClick={onClose}
                    style={{ float: 'right', marginBottom: '10px' }}
                >
                    Close
                </CButton>
                <div className="text-center mb-4">
                    <ul style={{ listStyle: 'none' }}>
                        {comments.map((m, index) => (
                            <li key={index} style={{ paddingBottom: '10px' }}>
                                Date: {m.updated_on.split('T')[0]} | Time: {m.updated_on.split('T')[1].substr(0, 8)} <br />
                                Assignee: {m.assignee} | Comment: {m.description}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default CommentHistory;
