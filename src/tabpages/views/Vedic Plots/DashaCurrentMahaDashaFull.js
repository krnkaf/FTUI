import { CTable, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CButton } from "@coreui/react";
import TabButtons from "./TabButtons";

const DashaCurrentMahaDashaFull = ({ data, getPlanet, item }) => {
    return <div className='container text-center' style={{ marginBottom: '5px' }}>
        <div className='row'>
            <div className='col-11'>
                <div className='row'>
                    <CTable>
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell colSpan={5}>Order Names</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow>
                                {Array.from({ length: 6 }, (_, i) => i).map(m => (
                                    <CTableDataCell>{data.order_names[m]}</CTableDataCell>
                                ))}
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </div>
                <div className='row' style={{ /*flexWrap: '' */ }}>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={28}>Mahadasha</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.mahadasha[m].name}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Start</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.mahadasha[m].start}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>End</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.mahadasha[m].end}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Key</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.mahadasha[m].key}</CTableDataCell>
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={28}>Antardasha</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.antardasha[m].name}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Start</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.antardasha[m].start}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>End</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.antardasha[m].end}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Key</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.antardasha[m].key}</CTableDataCell>
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={28}>Paryantardasha</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.paryantardasha[m].name}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Start</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.paryantardasha[m].start}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>End</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.paryantardasha[m].end}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Key</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.paryantardasha[m].key}</CTableDataCell>
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={28}>Shookshamadasha</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].name}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Start</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].start}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>End</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].end}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Key</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].key}</CTableDataCell>
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={28}>Pranadasha</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Pranadasha[m].name}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Start</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Pranadasha[m].start}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>End</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Pranadasha[m].end}</CTableDataCell>
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Key</CTableHeaderCell>
                                    {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                        return <CTableDataCell colSpan={3}>{data.Pranadasha[m].key}</CTableDataCell>
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={5}>Order of Dashas</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    {["", "Major", "Minor", "Sub Minor", "Sub Sub Minor"].map(m => (
                                        <CTableHeaderCell>{m}</CTableHeaderCell>
                                    ))}
                                </CTableRow>
                                <CTableRow>
                                    {["Name", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                        v === 0
                                            ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                            : <CTableDataCell key={v}>{data.order_of_dashas[k]?.name}</CTableDataCell>
                                    ))}
                                </CTableRow>
                                <CTableRow>
                                    {["Start", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                        v === 0
                                            ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                            : <CTableDataCell key={v}>{data.order_of_dashas[k]?.start}</CTableDataCell>
                                    ))}
                                </CTableRow>
                                <CTableRow>
                                    {["End", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                        v === 0
                                            ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                            : <CTableDataCell key={v}>{data.order_of_dashas[k]?.end}</CTableDataCell>
                                    ))}
                                </CTableRow>
                                <CTableRow>
                                    {["Key", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                        v === 0
                                            ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                            : <CTableDataCell key={v}>{data.order_of_dashas[k]?.key}</CTableDataCell>
                                    ))}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </div>
            <TabButtons getPlanet={getPlanet} item={item} />
        </div>
    </div>
}

export default DashaCurrentMahaDashaFull;