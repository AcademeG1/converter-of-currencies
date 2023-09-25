import React, { useState } from 'react';
import './Select.css';

import Select from 'react-select';
import { requestCurrenciesRate } from '../../types/types';

const SelectBar = ({
  availableCurrency,
  disabled,
}: {
  availableCurrency: requestCurrenciesRate[];
  disabled: boolean;
}) => {
  const colourOptions = availableCurrency.map((item) => ({ value: item.Cur_Abbreviation, label: item.Cur_Name }));

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={colourOptions[0]}
        isDisabled={disabled}
        name="currency"
        options={colourOptions}
      />
    </>
  );
};

export default SelectBar;
