import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import 'core-js'
import { CTabList, CTabs,CTab,CTabPanel,CTabContent } from '@coreui/react';
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
            List
        </>
}

export default List;