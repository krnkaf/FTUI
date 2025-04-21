import { CToast, CToastHeader, CToastBody } from "@coreui/react";
import { FaCheck, FaExclamationCircle, FaExclamationTriangle, FaInfo } from "react-icons/fa";


const getToast = (title, message, type) => {

    const getColorTheme = (type) => {
        switch (type) {
            case 1:
                return '#00ff00';
            case 2:
                return '#ff0000';
            case 3:
                return '#00ffff';
            default:
                return '#1F385C';
        }
    }

    // const toaster = useRef(null)

    const bodyTextColor = 'white';
    const bodyBackgroundColor = 'gray';
    const headerTextColor = '';
    const headerBackgroundColor = 'white';

    const getToastIcon = (type) => {
        switch (type) {
          case 1:
            return <FaCheck style={{ color: getColorTheme(type) }} />;
          case 2:
            return <FaExclamationCircle style={{ color: getColorTheme(type) }} />;
          case 3:
            return <FaExclamationTriangle  style={{ color: getColorTheme(type) }}/>;
          default:
            return <FaInfo style={{ color: getColorTheme(type) }} />;
        }
    };

    return (
        <CToast autohide={true}>
            <CToastHeader closeButton style={{ backgroundColor: headerBackgroundColor }}>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                    style={{ alignSelf: 'flex-end' }}
                >
                    {getToastIcon(type)}
                </svg>
                <div className="fw-bold me-auto" style={{ color: getColorTheme(type) }}>{title}</div>
            </CToastHeader>
            <CToastBody style={{ backgroundColor: bodyBackgroundColor, color: bodyTextColor }}>
                {message}
            </CToastBody>
        </CToast>
    )
}

export default getToast;