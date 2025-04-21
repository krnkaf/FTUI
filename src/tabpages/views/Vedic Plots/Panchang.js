import { CTable, CTableBody, CTableRow, CTableHead, CTableHeaderCell, CTableDataCell, CButton } from "@coreui/react";

const Panchang = ({ data }) => {
    return <div className='container text-center' style={{ marginBottom: '5px' }}>
        <div className='row'>
            <div className='col-11'>
                <div className='row'>
                    <div className='col'>
                        <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Day</CTableHeaderCell>
                                    <CTableDataCell>{data.day.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Rasi</CTableHeaderCell>
                                    <CTableDataCell>{data.rasi.name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Ayanamsa</CTableHeaderCell>
                                    <CTableDataCell>{data.ayanamsa.name}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Moon Position</CTableHeaderCell>
                                    <CTableHeaderCell>Moon Degree</CTableHeaderCell>
                                    <CTableDataCell>{data.moon_position.moon_degree}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell rowSpan={5}>Sun Position</CTableHeaderCell>
                                    <CTableHeaderCell>Zodiac</CTableHeaderCell>
                                    <CTableDataCell>{data.sun_position.zodiac}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                    <CTableDataCell>{data.sun_position.nakshatra}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Rasi No.</CTableHeaderCell>
                                    <CTableDataCell>{data.sun_position.rasi_no}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Nakshatra No.</CTableHeaderCell>
                                    <CTableDataCell>{data.sun_position.nakshatra_no}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Sun Degree At Rise</CTableHeaderCell>
                                    <CTableDataCell>{data.sun_position.sun_degree_at_rise}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell>Rahukaal</CTableHeaderCell>
                                    <CTableDataCell>{data.rahukaal}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Gulika</CTableHeaderCell>
                                    <CTableDataCell>{data.gulika}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Yamakanta</CTableHeaderCell>
                                    <CTableDataCell>{data.yamakanta}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableDataCell>{data.date}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                            <CTableHead>
                                <CTableRow>
                                    {["", "Tithi", "Nakshatra", "Karana", "Yoga"].map((v, k) => (
                                        <CTableHeaderCell key={k}>{v}</CTableHeaderCell>
                                    ))}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {["Name", "Number", "Lord", "Diety", "Start", "Next Nakshatra", "End", "Meaning", "Special", "Summary"].map((v, k) => (
                                    <CTableRow key={k}>
                                        <CTableHeaderCell>{v}</CTableHeaderCell>
                                        {["tithi", "nakshatra", "karana", "yoga"].map((k2, v2) => (
                                            <CTableDataCell key={v2}>{data[k2]?.[v.replace(/\s+/g, "_").toLowerCase()
                                            ]}</CTableDataCell>
                                        ))}
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={10}>Advanced Details</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    {["Sun Rise", "Sun Set", "Moon Rise", "Moon Set", "Next Full Moon", "Next New Moon", "Moon Yogini Nivas", "Ahargana", "Vaara", "Disha Shool"].map(m => (
                                        <CTableHeaderCell key={m}>{m}</CTableHeaderCell>
                                    ))}
                                </CTableRow>
                                <CTableRow>
                                    {["sun_rise", "sun_set", "moon_rise", "moon_set", "next_full_moon", "next_new_moon", "moon_yogini_nivas", "ahargana", "vaara", "disha_shool"].map(m => (
                                        <CTableDataCell key={m}>{data.advanced_details[m]}</CTableDataCell>
                                    ))}
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' style={{ fontSize: 'xx-small' }} bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={4}>Masa</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Amanta Number</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.amanta_number}</CTableDataCell>
                                    <CTableHeaderCell>Amanta Date</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.amanta_date}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Amanta Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.amanta_name}</CTableDataCell>
                                    <CTableHeaderCell>Alternate Amanta Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.alternate_amanta_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Amanta Start</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.amanta_start}</CTableDataCell>
                                    <CTableHeaderCell>Amanta End</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.amanta_end}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Amanta Maasa</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.amanta_maasa}</CTableDataCell>
                                    <CTableHeaderCell>Ayana</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.ayana}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Real Ayana</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.real_ayana}</CTableDataCell>
                                    <CTableHeaderCell>Tamil Month Num</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.tamil_month_num}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Tamil Month</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.tamil_month}</CTableDataCell>
                                    <CTableHeaderCell>Tamil Day</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.tamil_day}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Purnimanta Date</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.purnimanta_date}</CTableDataCell>
                                    <CTableHeaderCell>Purnimanta Number</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.purnimanta_number}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Purnimanta Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.purnimanta_name}</CTableDataCell>
                                    <CTableHeaderCell>Alternate Purnimanta Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.alternate_purnimanta_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Purnimanta Start</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.purnimanta_start}</CTableDataCell>
                                    <CTableHeaderCell>Purnimanta End</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.purnimanta_end}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Moon Phase</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.moon_phase}</CTableDataCell>
                                    <CTableHeaderCell>Paksha</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.paksha}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Ritu</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.ritu}</CTableDataCell>
                                    <CTableHeaderCell>Ritu Tamil</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.masa.ritu_tamil}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' style={{ fontSize: 'xx-small' }} bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Years</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Kali</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.kali}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Saka</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.saka}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Vikram Samvaat</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.vikram_samvaat}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Kali Samvaat Number</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.kali_samvaat_number}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Kali Samvaat Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.kali_samvaat_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Vikram Samvaat Number</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.vikram_samvaat_number}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Vikram Samvaat Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.vikram_samvaat_name}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Saka Samvaat Number</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.saka_samvaat_number}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Saka Samvaat Name</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.years.saka_samvaat_name}</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className='col'>
                        <CTable className='table-sm p-0 m-0' style={{ fontSize: 'xx-small' }} bordered>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={2}>Abhijit Muhurta</CTableHeaderCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>Start</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.abhijit_muhurta.start}</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell>End</CTableHeaderCell>
                                    <CTableDataCell>{data.advanced_details.abhijit_muhurta.end}</CTableDataCell>
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

export default Panchang;