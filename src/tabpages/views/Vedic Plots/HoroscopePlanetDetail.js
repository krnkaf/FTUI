import { CTable, CTableBody, CTableRow, CTableHead, CTableHeaderCell, CTableDataCell, CButton } from "@coreui/react";

const HoroscopePlanetDetail = ({data}) => {
    return <div className="container text-center">
        <div className="row">
            <div className="col-6">
                <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-table-main" style={{ marginBottom: '5px' }}>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell></CTableHeaderCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableHeaderCell className='text-center' key={e}>
                                        {data[`${e}`].name}
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
                                        {data[`${e}`].full_name}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Local Degree</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                const localDegree = data[`${e}`].local_degree;
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
                                const globalDegree = data[`${e}`].global_degree;
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
                                const progressPercentage = data[`${e}`].progress_in_percentage;
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
                                        {data[`${e}`].rasi_no}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Zodiac</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].zodiac}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>House</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].house}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Speed Radians/Day</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].speed_radians_per_day}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Retro</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].retro ? 'True' : 'False'}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Nakshtra</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].nakshatra}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Nakshatra Lord</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].nakshatra_lord}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Nakshatra Pada</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].nakshatra_pada}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Nakshatra Number</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].nakshatra_no}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Zodiac Lord</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].zodiac_lord}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Lord Status</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].lord_status}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Basic Avastha</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].basic_avastha}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Is Planet Set?</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].is_planet_set ? 'True' : 'False'}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Is Combust</CTableDataCell>
                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                return (
                                    <CTableDataCell key={e}>
                                        {data[`${e}`].is_combust ? 'True' : 'False'}
                                    </CTableDataCell>
                                );
                            })}
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>
            <div className="col-3">
                <div className="row">
                    <div className="col">
                        <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-small-1" style={{ width: '100%' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Birth Dasa</CTableHeaderCell>
                                    <CTableDataCell>{data.birth_dasa}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Current Dasa</CTableHeaderCell>
                                    <CTableDataCell>{data.current_dasa}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Birth Dasa Time</CTableHeaderCell>
                                    <CTableDataCell>{data.birth_dasa_time}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Current Dasa Time</CTableHeaderCell>
                                    <CTableDataCell>{data.current_dasa_time}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-small-2" style={{ width: '100%' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.rasi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                    <CTableDataCell>{data.nakshatra}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nakshatra Pada</CTableHeaderCell>
                                    <CTableDataCell>{data.nakshatra_pada}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-small-3" style={{ width: '100%' }}>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Lucky Gem</CTableHeaderCell>
                                    <CTableDataCell>{data.lucky_gem.join(", ")}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Lucky Number</CTableHeaderCell>
                                    <CTableDataCell>{data.lucky_num.join(", ")}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Lucky Colors</CTableHeaderCell>
                                    <CTableDataCell>{data.lucky_colors.join(", ")}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Lucky Letters</CTableHeaderCell>
                                    <CTableDataCell>{data.lucky_letters.join(", ")}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Lucky Name Start</CTableHeaderCell>
                                    <CTableDataCell>{data.lucky_name_start.join(", ")}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </div>
            <div className='col-2'>
                <div className='row'>
                    <div className='col'>
                        <CTable className="w-30 table-striped table-bordered table-hover table-sm table-responsive" id='vedic-med-1'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2} className='text-center'>
                                        Panchang
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Ayanamsa</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.ayanamsa}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Ayanamsa Name</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.ayanamsa_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Date Of Birth</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.day_of_birth}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Day Lord</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.day_lord}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Hora Lord</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.hora_lord}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Sunrise At Birth</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.sunrise_at_birth}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Sunset At Birth</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.sunset_at_birth}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Karana</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.karana}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Toga</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.yoga}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tithi</CTableHeaderCell>
                                    <CTableDataCell>{data.panchang.tithi}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <CTable className="w-30 table-striped table-bordered table-hover table-sm table-responsive" id='vedic-med-2'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2} className='text-center'>
                                        Ghatka Chakra
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.rasi}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tithi</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.tithi.join(", ")}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Day</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.day}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.nakshatra}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tatva</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.tatva}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Lord</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.lord}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Same Sex Lagna</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.same_sex_lagna}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Opposite Sex Lagna</CTableHeaderCell>
                                    <CTableDataCell>{data.ghatka_chakra.opposite_sex_lagna}</CTableDataCell>
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

export default HoroscopePlanetDetail; 