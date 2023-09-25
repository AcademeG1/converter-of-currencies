import React, { useState, useEffect } from 'react';
import { getAllCurrenciesRate, getCurrencyForDate } from './services/serviceAPI';
import './App.css';
import MainForm from './components/mainForm/MainForm';
import { requestCurrenciesRate } from './types/types';
import CurrencyNow from './components/currencyNow/CurrencyNow';
import { ColorRing } from 'react-loader-spinner';
import SelectBar from './components/select/Select';

function App() {
  const currencies = [431, 451, 456, 452];
  const [availableCurrency, setAvailableCurrency] = useState<requestCurrenciesRate[]>([]);
  const [yesterdayCurrencyRate, setYesterdayCurrencyRate] = useState<requestCurrenciesRate[]>([]);
  const [currencyOne, setCurrencyOne] = useState('');
  const [currencyTwo, setCurrencyTwo] = useState('');
  const [selectCurrencyOne, setSelectCurrencyOne] = useState('');
  const [selectCurrencyTwo, setSelectCurrencyTwo] = useState('');

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayString = yesterday.toISOString().slice(0, 10);

    getAllCurrenciesRate().then((count: requestCurrenciesRate[]): void => {
      const filterCurrency = count.filter((currency) => currencies.includes(currency.Cur_ID));
      setAvailableCurrency([...filterCurrency]);
    });
    getCurrencyForDate(yesterdayString).then((count: requestCurrenciesRate[]) => {
      const filterCurrency = count.filter((currency) => currencies.includes(currency.Cur_ID));
      setYesterdayCurrencyRate([...filterCurrency]);
      setLoader(false);
      console.log('aaa');
    });
  }, []);
  return (
    <div className="App">
      <h1 className="title">Конвертер валют</h1>
      <MainForm>
        {loader ? (
          <div
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ColorRing
              visible={true}
              height="200"
              width="200"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        ) : (
          <>
            <CurrencyNow availableCurrency={availableCurrency} yesterdayCurrencyRate={yesterdayCurrencyRate} />
            <form>
              <div>
                <label htmlFor="amount1">Отдано:</label>
                <SelectBar
                  availableCurrency={[
                    {
                      Cur_ID: 143,
                      Date: '0',
                      Cur_Abbreviation: 'BYN',
                      Cur_Scale: 1,
                      Cur_Name: 'Бел. рубли',
                      Cur_OfficialRate: 1,
                    },
                  ]}
                  disabled={true}
                />
                <input
                  type="number"
                  id="amount1"
                  name="amount1"
                  defaultValue={0}
                  min="0"
                  step="0.01"
                  onChange={(event) => setCurrencyOne(event?.target.value)}
                />
              </div>
              <div>
                <label htmlFor="toCurrency">Получено:</label>
                <SelectBar availableCurrency={availableCurrency} disabled={false} />
                <input
                  type="number"
                  id="toCurrency"
                  name="amount2"
                  defaultValue={0}
                  min="0"
                  step="0.01"
                  onChange={(event) => setCurrencyTwo(event?.target.value)}
                />
              </div>
              {/* <label htmlFor="amount">Сумма2:</label> */}

              {/* <button type="submit">Конвертировать</button> */}
            </form>
          </>
        )}
      </MainForm>
    </div>
  );
}

export default App;
