import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect } from '@coreui/react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const PriceCalculator = () => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const pbd = Number(values.price_before_discount);
    const da = Number(values.discount_amount);
    if (!isNaN(pbd) && !isNaN(da)) {
      const computedPrice = pbd - da;
      if (computedPrice !== values.price) {
        setFieldValue('price', computedPrice, false);
      }
    }
  }, [values.price_before_discount, values.discount_amount, setFieldValue, values.price]);

  return null;
};

const Manage = () => {
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    _id: "",
    question: "",
    order_id: null,
    question_category_id: "",
    active: true,
    price: 0,
    question_category_name: "",
    price_before_discount: 0,
    is_initial_offerings: false,
    is_bundle: "false",
    image_blob: "",
    effective_from: null,
    effective_to: null,
    discount_amount: 0
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(GetURL("/backend/Question/LoadBaseData"), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': GetToken()
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data.data.question_category_items);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const fetchQuestion = async (id) => {
      try {
        const response = await fetch(GetURL(`/backend/Question/Get?id=${id}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": GetToken()
          }
        });

        if (response.ok) {
          const data = await response.json();
          setInitialValues({
            _id: data.data.item._id,
            question: data.data.item.question,
            order_id: data.data.item.order_id,
            question_category_id: data.data.item.question_category_id,
            active: data.data.item.active,
            price: data.data.item.price,
            price_before_discount: data.data.item.price_before_discount,
            discount_amount: data.data.item.discount_amount,
            is_bundle: data.data.item.is_bundle ? "true" : "false",
            image_blob: data.data.item.image_blob || "",
            effective_from: data.data.item.effective_from,
            effective_to: data.data.item.effective_to
          });
        } else {
          console.error('Failed to fetch question');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchCategories();

    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    if (id) {
      fetchQuestion(id);
    }
  }, [location.search]);

  const validationSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    order_id: Yup.number().required('Order ID is required'),
    question_category_id: Yup.string().required('Category is required'),
    price_before_discount: Yup.number().required('Price before discount is required'),
    discount_amount: Yup.number()
      .required('Discount amount is required')
      .test(
        'is-less-than-pbd',
        'Discount amount must be lower than Price before discount',
        function (value) {
          const { price_before_discount } = this.parent;
          return value <= price_before_discount;
        }
      )
  });

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      active: values.active,
      is_bundle: values.is_bundle === "true"
    };

    const url = formattedValues._id
      ? '/backend/Question/Update'
      : '/backend/Question/Create';

    fetch(GetURL(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': GetToken()
      },
      body: JSON.stringify(formattedValues)
    })
      .then(response => response.json())
      .then(() => navigate('/page/questions?page=list'))
      .catch(error => console.error('An error occurred:', error));
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '1000px',
      margin: '0 auto',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#fff',
      height: 'auto'
    }}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (

          <Form onSubmit={handleSubmit} autoComplete='false'>
            <PriceCalculator />
            <div className="mb-4">
              <label htmlFor="question" className="form-label">Question</label>
              <Field
                autoComplete="true"
                as={CFormInput}
                id="question"
                name="question"
                placeholder="Enter the question"
                className={`form-control ${errors.question && touched.question ? 'is-invalid' : ''}`}
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              />
              {errors.question && touched.question && (
                <div className="invalid-feedback">{errors.question}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="question_category_id" className="form-label">Category</label>
              <Field
                as={CFormSelect}
                id="question_category_id"
                name="question_category_id"
                className={`form-select ${errors.question_category_id && touched.question_category_id ? 'is-invalid' : ''}`}
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.question_category_id} value={category.question_category_id}>
                    {category.question_category}
                  </option>
                ))}
              </Field>
              {errors.question_category_id && touched.question_category_id && (
                <div className="invalid-feedback">{errors.question_category_id}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="order_id" className="form-label">Order ID</label>
              <Field
                as={CFormInput}
                type="number"
                id="order_id"
                name="order_id"
                placeholder="Enter order ID"
                className={`form-control ${errors.order_id && touched.order_id ? 'is-invalid' : ''}`}
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              />
              {errors.order_id && touched.order_id && (
                <div className="invalid-feedback">{errors.order_id}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="price_before_discount" className="form-label">Price Before Discount</label>
              <Field
                as={CFormInput}
                type="number"
                id="price_before_discount"
                name="price_before_discount"
                placeholder="Enter price before discount"
                className={`form-control ${errors.price_before_discount && touched.price_before_discount ? 'is-invalid' : ''}`}
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              />
              {errors.price_before_discount && touched.price_before_discount && (
                <div className="invalid-feedback">{errors.price_before_discount}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="discount_amount" className="form-label">Discount Amount</label>
              <Field
                as={CFormInput}
                type="number"
                id="discount_amount"
                name="discount_amount"
                placeholder="Enter discount amount"
                className={`form-control ${errors.discount_amount && touched.discount_amount ? 'is-invalid' : ''}`}
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              />
              {errors.discount_amount && touched.discount_amount && (
                <div className="invalid-feedback">{errors.discount_amount}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="form-label">Final Price (Computed)</label>
              <Field
                as={CFormInput}
                type="number"
                id="price"
                name="price"
                placeholder="Final price"
                className="form-control"
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
                readOnly
              />
              {values.price_before_discount > 0 && values.discount_amount >= 0 && (
                <div className="form-text">
                  Discount: {((values.discount_amount / values.price_before_discount) * 100).toFixed(2)}%
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="active" className="form-label">Is Active?</label>
              <Field type="checkbox" id="active" name="active" className="form-check-input" />
            </div>

            <div className="mb-4">
              <label htmlFor="is_bundle" className="form-label">Is Bundle?</label>
              <Field
                as={CFormSelect}
                id="is_bundle"
                name="is_bundle"
                className="form-select"
                style={{ fontSize: '1.1rem', padding: '12px 16px' }}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Field>
            </div>

            {values.is_bundle === "true" && (
              <>
                <div className="mb-4">
                  <label htmlFor="image_blob" className="form-label">Image Upload</label>
                  <input
                    id="image_blob"
                    name="image_blob"
                    type="file"
                    className="form-control"
                    accept='image/*'
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const arrayBuffer = reader.result;
                          const uint8Array = new Uint8Array(arrayBuffer);
                          let binaryString = "";
                          uint8Array.forEach(byte => binaryString += String.fromCharCode(byte));
                          const base64String = btoa(binaryString);
                          setFieldValue("image_blob", base64String);
                        };
                        reader.readAsArrayBuffer(file);
                      }
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="effective_from" className="form-label">Effective From</label>
                  <Field
                    as={CFormInput}
                    type="date"
                    id="effective_from"
                    name="effective_from"
                    className="form-control"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="effective_to" className="form-label">Effective To</label>
                  <Field
                    as={CFormInput}
                    type="date"
                    id="effective_to"
                    name="effective_to"
                    className="form-control"
                  />
                </div>
              </>
            )}

            <CButton type="submit" color="primary" className="w-100" style={{ fontSize: '1.2rem', padding: '14px' }}>
              Save
            </CButton>

            {values.image_blob && (
              <div className="mb-4">
                <label className="form-label">Uploaded Image</label>
                <img
                  src={`data:image/png;base64,${values.image_blob}`}
                  alt="Uploaded Preview"
                  style={{ marginTop: '20px', width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', border: '1px solid black' }}
                />
              </div>
            )}
          </Form>
        )}

      </Formik>

    </div>
  );
};

export default Manage;
