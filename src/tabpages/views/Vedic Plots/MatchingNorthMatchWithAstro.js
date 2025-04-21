import { CTable, CTableBody, CTableRow, CTableHead, CTableHeaderCell, CTableDataCell, CButton } from "@coreui/react";

const MatchingNorthMatchWithAstro = ({ data }) => {
    return <div className='container text-center' style={{ marginBottom: '5px' }}>
        <div className='row'>
            <div className='col-11'>
                <div className='row'>
                    Score: {data.score} | Bot Response: {data.bot_response}
                </div>
                <div className='row'>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Tara</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tara</CTableHeaderCell>
                                    <CTableDataCell>{data.tara.tara}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Tara</CTableHeaderCell>
                                    <CTableDataCell>{data.tara.boy_tara}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Tara</CTableHeaderCell>
                                    <CTableDataCell>{data.tara.girl_tara}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.tara.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.tara.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.tara.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Gana</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Gana</CTableHeaderCell>
                                    <CTableDataCell>{data.gana.gana}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Gana</CTableHeaderCell>
                                    <CTableDataCell>{data.gana.boy_gana}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Gana</CTableHeaderCell>
                                    <CTableDataCell>{data.gana.girl_gana}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.gana.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.gana.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.gana.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Yoni</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Yoni</CTableHeaderCell>
                                    <CTableDataCell>{data.yoni.yoni}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Yoni</CTableHeaderCell>
                                    <CTableDataCell>{data.yoni.boy_yoni}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Yoni</CTableHeaderCell>
                                    <CTableDataCell>{data.yoni.girl_yoni}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.yoni.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.yoni.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.yoni.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Bhakoot</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Bhakoot</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.bhakoot}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.boy_rasi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.girl_rasi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Rasi Name</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.boy_rasi_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Rasi Name</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.girl_rasi_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.bhakoot.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Grahamaitri</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Grahamaitri</CTableHeaderCell>
                                    <CTableDataCell>{data.grahamaitri.grahamaitri}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Lord</CTableHeaderCell>
                                    <CTableDataCell>{data.grahamaitri.boy_lord}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Lord</CTableHeaderCell>
                                    <CTableDataCell>{data.grahamaitri.girl_lord}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.grahamaitri.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.grahamaitri.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.grahamaitri.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Vasya</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Vasya</CTableHeaderCell>
                                    <CTableDataCell>{data.vasya.vasya}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Vasya</CTableHeaderCell>
                                    <CTableDataCell>{data.vasya.boy_vasya}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Vasya</CTableHeaderCell>
                                    <CTableDataCell>{data.vasya.girl_vasya}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.vasya.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.vasya.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.vasya.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Nadi</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nadi</CTableHeaderCell>
                                    <CTableDataCell>{data.nadi.nadi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Nadi</CTableHeaderCell>
                                    <CTableDataCell>{data.nadi.boy_nadi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Nadi</CTableHeaderCell>
                                    <CTableDataCell>{data.nadi.girl_nadi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.nadi.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.nadi.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.nadi.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col compact-1'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Varna</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Varna</CTableHeaderCell>
                                    <CTableDataCell>{data.varna.varna}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Varna</CTableHeaderCell>
                                    <CTableDataCell>{data.varna.boy_varna}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Varna</CTableHeaderCell>
                                    <CTableDataCell>{data.varna.girl_varna}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableDataCell>{data.varna.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Description</CTableHeaderCell>
                                    <CTableDataCell>{data.varna.description}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Full Score</CTableHeaderCell>
                                    <CTableDataCell>{data.varna.full_score}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className='row' style={{ margin: 'none', marginTop: '5px', flexWrap: 'nowrap' }}>
                    <div className='col'>
                        <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-table-main">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Boy Planetary Details</CTableHeaderCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableHeaderCell className='text-center' key={e}>
                                                {data.boy_planetary_details[`${e}`].name}
                                            </CTableHeaderCell>
                                        );
                                    })}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>Full Name</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].full_name}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Local Degree</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        const localDegree = data.boy_planetary_details[`${e}`].local_degree;
                                        return (
                                            <CTableDataCell key={e} className='text-warp'>
                                                {localDegree.toFixed(2)}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Global Degree</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        const globalDegree = data.boy_planetary_details[`${e}`].global_degree;
                                        return (
                                            <CTableDataCell key={e}>
                                                {globalDegree.toFixed(2)}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Process%</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        const progressPercentage = data.boy_planetary_details[`${e}`].progress_in_percentage;
                                        return (
                                            <CTableDataCell key={e}>
                                                {progressPercentage.toFixed(2)}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Rasi Number</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].rasi_no}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Zodiac</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].zodiac}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>House</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].house}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Speed Radians/Day</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].speed_radians_per_day}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Retro</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].retro ? 'True' : 'False'}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshtra</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].nakshatra}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshatra Lord</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].nakshatra_lord}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshatra Pada</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].nakshatra_pada}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshatra Number</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].nakshatra_no}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Zodiac Lord</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].zodiac_lord}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Lord Status</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].lord_status}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Basic Avastha</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].basic_avastha}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Is Planet Set?</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].is_planet_set ? 'True' : 'False'}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Is Combust</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.boy_planetary_details[`${e}`].is_combust ? 'True' : 'False'}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-table-main">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Girl Planetary Details</CTableHeaderCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableHeaderCell className='text-center' key={e}>
                                                {data.girl_planetary_details[`${e}`].name}
                                            </CTableHeaderCell>
                                        );
                                    })}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>Full Name</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].full_name}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Local Degree</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        const localDegree = data.girl_planetary_details[`${e}`].local_degree;
                                        return (
                                            <CTableDataCell key={e} className='text-warp'>
                                                {localDegree.toFixed(2)}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Global Degree</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        const globalDegree = data.girl_planetary_details[`${e}`].global_degree;
                                        return (
                                            <CTableDataCell key={e}>
                                                {globalDegree.toFixed(2)}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Process%</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        const progressPercentage = data.girl_planetary_details[`${e}`].progress_in_percentage;
                                        return (
                                            <CTableDataCell key={e}>
                                                {progressPercentage.toFixed(2)}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Rasi Number</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].rasi_no}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Zodiac</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].zodiac}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>House</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].house}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Speed Radians/Day</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].speed_radians_per_day}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Retro</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].retro ? 'True' : 'False'}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshtra</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].nakshatra}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshatra Lord</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].nakshatra_lord}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshatra Pada</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].nakshatra_pada}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Nakshatra Number</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].nakshatra_no}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Zodiac Lord</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].zodiac_lord}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Lord Status</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].lord_status}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Basic Avastha</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].basic_avastha}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Is Planet Set?</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].is_planet_set ? 'True' : 'False'}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Is Combust</CTableDataCell>
                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                        return (
                                            <CTableDataCell key={e}>
                                                {data.girl_planetary_details[`${e}`].is_combust ? 'True' : 'False'}
                                            </CTableDataCell>
                                        );
                                    })}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className='row' >
                    <div className='col'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={4}>Boy Astro Details</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Gana</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.gana}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Gem</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.lucky_gem.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Yoni</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.yoni}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Num</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.lucky_num.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Vasya</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.vasya}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Colors</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.lucky_colors.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nadi</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.nadi}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Letters</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.lucky_letters.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Varna</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.varna}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Name Start</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.lucky_name_start.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Paya</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.paya}</CTableDataCell>
                                    <CTableHeaderCell>Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.rasi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tatva</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.tatva}</CTableDataCell>
                                    <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.nakshatra}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Birth Dasa</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.birth_dasa}</CTableDataCell>
                                    <CTableHeaderCell>Nakshatra Pada</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.nakshatra_pada}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Current Dasa</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.current_dasa}</CTableDataCell>
                                    <CTableHeaderCell>Ascendant Sign</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.ascendant_sign}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Birth Dasa Time</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.birth_dasa_time}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Current Dasa Time</CTableHeaderCell>
                                    <CTableDataCell>{data.boy_astro_details.current_dasa_time}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={4}>Girl Astro Details</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Gana</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.gana}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Gem</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.lucky_gem.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Yoni</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.yoni}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Num</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.lucky_num.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Vasya</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.vasya}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Colors</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.lucky_colors.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nadi</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.nadi}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Letters</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.lucky_letters.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Varna</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.varna}</CTableDataCell>
                                    <CTableHeaderCell>Lucky Name Start</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.lucky_name_start.join(', ')}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Paya</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.paya}</CTableDataCell>
                                    <CTableHeaderCell>Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.rasi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tatva</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.tatva}</CTableDataCell>
                                    <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.nakshatra}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Birth Dasa</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.birth_dasa}</CTableDataCell>
                                    <CTableHeaderCell>Nakshatra Pada</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.nakshatra_pada}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Current Dasa</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.current_dasa}</CTableDataCell>
                                    <CTableHeaderCell>Ascendant Sign</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.ascendant_sign}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Birth Dasa Time</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.birth_dasa_time}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Current Dasa Time</CTableHeaderCell>
                                    <CTableDataCell>{data.girl_astro_details.current_dasa_time}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </div>
            <div className='col-1' style={{ alignContent: 'center' }}>
                <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 1)}>
                    Horoscope Planet Detail (Current)
                </CButton>
                <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                    Horoscope Planet Detail (Birth)
                </CButton>
                <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                    Matching North Match With Astro
                </CButton>
                <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                    Panchang
                </CButton>
                <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                    Dasha Current Maha Dasha Full
                </CButton>
            </div>
        </div>
    </div>
}

export default MatchingNorthMatchWithAstro;