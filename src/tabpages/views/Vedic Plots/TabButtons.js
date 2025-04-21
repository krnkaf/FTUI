import { CButton } from "@coreui/react";

const TabButtons = ({ getPlanet, item }) => {



    return <div className='col-1' style={{ alignContent: 'center' }}>
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
}

export default TabButtons;