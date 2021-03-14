import { useState } from 'react';

const useForm = (initialFormValues) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  return [
    formValues,
    e => setFormValues({ ...formValues, [e.target.name]: e.target.value})
  ];
};

export default useForm;