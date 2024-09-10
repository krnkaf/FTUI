import React, { useState } from 'react';
import { CButton, CFormTextarea } from '@coreui/react';

const Submit = () => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="comment">Comment:</label>
                <CFormTextarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Enter your comment"
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CButton type="submit" color="primary">Submit</CButton>
            </div>
        </form>
    );
};

export default Submit;
