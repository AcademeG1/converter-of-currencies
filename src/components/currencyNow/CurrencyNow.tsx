import React, { useEffect, useState } from 'react';
import './CurrencyNow.css';
import { requestCurrenciesRate } from '../../types/types';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const calculationСourseChange = (nowRate: number, oldRate: number): boolean => {
  return nowRate >= oldRate;
};

const CurrencyNow = ({
  availableCurrency,
  yesterdayCurrencyRate,
}: {
  availableCurrency: requestCurrenciesRate[];
  yesterdayCurrencyRate: requestCurrenciesRate[];
}) => {
  return (
    <div className="currency-rates-container">
      {availableCurrency.map((item, index) => (
        <div
          key={item.Cur_ID}
          id={item.Cur_Abbreviation}
          className={
            'currency-rate' +
            (calculationСourseChange(yesterdayCurrencyRate[index].Cur_OfficialRate, item.Cur_OfficialRate)
              ? ' profitably'
              : ' unprofitable')
          }
        >
          <h4 className="currency-rate__title">{'Курс ' + item.Cur_Scale + ' ' + item.Cur_Abbreviation}</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {calculationСourseChange(yesterdayCurrencyRate[index].Cur_OfficialRate, item.Cur_OfficialRate) ? (
              <AiOutlineArrowDown style={{ color: 'green' }} />
            ) : (
              <AiOutlineArrowUp style={{ color: 'rgb(161, 0, 0)' }} />
            )}
            {item.Cur_OfficialRate.toFixed(2) + ' BYN'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrencyNow;
