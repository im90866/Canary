import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
   
  })
  const [errors, setErrors] = useState({});
 

  const handleChange = e => {
  setValues({
      ...values,
      [e.target.name]:e.target.value
  });
   
  }
}