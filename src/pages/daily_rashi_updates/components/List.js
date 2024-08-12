import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import 'core-js'
import { CTabList, CTabs,CTab,CTabPanel,CTabContent, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { GetToken, GetURL } from '../../../library/API';

function List(){

    const GetList=async ()=>{
        try {
            const response = await fetch(GetURL("/DailyRashiUpdates/GetAllList"), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': GetToken()
              }//,
              //body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const res = await response.json();
                console.log(res)
            } else {
              const errorData = await response.json();
              alert(errorData.message);
            }
          } catch (err) {
            alert('An error occurred. Please try again later.');
          }
    }
    
    useEffect(()=>{
        GetList();
    },[])

    return <>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell>@fat</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                  <CTableDataCell>@twitter</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
        </>
}

export default List;