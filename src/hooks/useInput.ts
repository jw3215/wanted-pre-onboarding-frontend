import React from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
  const resetValue = () => setValue('');

  return { value, onChange, resetValue };
};

export default useInput;
