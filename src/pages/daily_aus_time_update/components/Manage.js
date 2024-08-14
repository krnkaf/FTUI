import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { GetURL } from '../../../library/API';
import { useNavigate } from 'react-router-dom';

const Manage = () => {
  const [items, setItems] = useState([]);
  const [horoscopes, setHoroscopes] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [initialValues, setInitialValues] = useState({
    date: new Date().toISOString().substring(0, 10),
    id: '',
    name: '',
    description: ''
  });
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const GetList = async () => {
      try {
        const response = await fetch(GetURL("/backend/DailyAuspiciousTimeUpdate/LoadBaseData"), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': GetToken()
          }
        });

        if (response.ok) {
          const res = await response.json();
          setHoroscopes(res.data.rashi);
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (err) {
        alert('An error occurred. Please try again later.');
      }
    };

    GetList();
  }, []);

  useEffect(() => {
    const setForm = async () => {
      try {
        const urlPath = location.pathname + location.search;
  
        if (urlPath.includes('/page/daily_aus_time_update') && location.search.split("&").length === 2) {
          localStorage.setItem('id', location.search.split("&")[1].split("=")[1]);
        } else if (urlPath.includes('/page/daily_aus_time_update') && location.search.split("&").length === 1) {
          localStorage.setItem('id', 0);
          return;
        }
  
        const response = await fetch(GetURL("/backend/DailyAuspiciousTimeUpdate/get?id=" + localStorage.id), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': GetToken()
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          const fetchedData = data.data.item;

          const updatedItems = fetchedData.items.map(item => {
            const horoscope = horoscopes.find(h => h.id == item.rashi_id);
            return {
              id: horoscope ? horoscope.id : '',
              name: horoscope ? horoscope.name : '',
              description: item.description
            };
          });
  
          setItems(updatedItems);
          setInitialValues({
            date: fetchedData.transaction_date,
            id: fetchedData._id,
            name: '',
            description: ''
          });
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (err) {
        alert('An error occurred. Please try again later.');
      }
    };
  
    setForm();
  }, [horoscopes]); 
  

  const validationSchema = Yup.object({
    date: Yup.date().required('Date is required'),
    name: Yup.string().oneOf(horoscopes.map(h => h.name), 'Invalid horoscope').required('Horoscope is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const selectedHoroscope = horoscopes.find(h => h.name === values.name);

    if (!selectedHoroscope) {
      alert("Invalid horoscope selected");
      return;
    }

    const newItem = {
      id: selectedHoroscope.id,
      name: values.name,
      description: values.description
    };

    if (updateIndex === -1) {
      if (items.findIndex(a => a.name === values.name) >= 0) {
        alert("Duplicate");
        return;
      }
      setItems(prevItems => [...prevItems, newItem]);
    } else {
      const updatedItems = [...items];
      updatedItems[updateIndex] = newItem;
      setItems(updatedItems);
    }

    setUpdateIndex(-1);
    resetForm();
  };

  const handleEdit = (index) => {
    const item = items[index];
    setInitialValues({
      date: initialValues.date,
      id: item.id,
      name: item.name,
      description: item.description
    });
    setUpdateIndex(index);
  };

  const DeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const updateList = () => {
    const payload = {
        _id: localStorage.id,
        transaction_date: initialValues.date,
        items: items.map(item => ({
            rashi_id: item.id,
            description: item.description
        }))
    };

    const payload1 = {
        transaction_date: initialValues.date,
        items: items.map(item => ({
            rashi_id: item.id,
            description: item.description
        }))
    };

    const urlPath = location.pathname + location.search;

    if (urlPath.includes('/page/daily_aus_time_update') && location.search.split("&").length === 1) {
        fetch(GetURL('/backend/DailyAuspiciousTimeUpdate/create'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': GetToken()
            },
            body: JSON.stringify(payload1)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Successfully posted to the API:', data);
                navigate('/page/daily_aus_time_update?page=list');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    } if (urlPath.includes('/page/daily_aus_time_update') && location.search.split("&").length === 2) {
        fetch(GetURL('/backend/DailyAuspiciousTimeUpdate/update'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': GetToken()
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                navigate('/page/daily_aus_time_update?page=list');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>  
            <hr/>
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <Field as={CFormInput} type='date' id='date' name='date' />
              {errors.date && touched.date && <div className="text-danger">{errors.date}</div>}
            </div>
            <hr/>
            <div className="mb-3">
              <label htmlFor="name">Horoscope</label>
              <Field as={CFormSelect} name="name" id="name" disabled={updateIndex !== -1}>
                <option value="">Select Horoscope</option>
                {horoscopes.slice().sort((a, b) => a.name.localeCompare(b.name)).map(h => (
                  <option key={h.id} value={h.name}>{h.name}</option>
                ))}
              </Field>
              {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <hr/>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <Field as={CFormTextarea} id="description" name="description" />
              {errors.description && touched.description && <div className="text-danger">{errors.description}</div>}
            </div>
            <hr/>
            <CButton type="submit" color="primary">
              {updateIndex === -1 ? "Add" : "Update"}
            </CButton>
          </Form>
        )}
      </Formik>

      <div className='tablediv'> 
        <CTable hover className="ctable">
          <thead>
            <CTableRow>
              <CTableHeaderCell>Horoscope</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </thead>
          <CTableBody>
            {items.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.description}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="warning" className='EditButton' onClick={() => handleEdit(index)}>Edit</CButton>
                  <CButton color="danger" onClick={() => DeleteItem(index)}>Delete</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CButton color="success" onClick={updateList}>Submit</CButton>
      </div>
    </>
  );
};

export default Manage;