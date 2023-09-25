import { requestAllCurrencies, requestCurrencyId, requestCurrenciesRate } from '../types/types';
const _apiBase = 'https://api.nbrb.by/exrates/rates/';
const _allApiBase = 'https://api.nbrb.by/exrates/currencies';
const __allApiRates = 'https://api.nbrb.by/exrates/rates?periodicity=0';
const api = 'https://api.nbrb.by/exrates/rates';
//api.nbrb.by/exrates/rates?ondate=2023-01-10&periodicity=0
// 456?ondate=2023-01-10

//bel, rus rub   Cur_ID": 456,"Cur_ParentID": 190,, usd Cur_ID": 431, "Cur_ParentID": 145,   , eur Cur_ID": 19" "Cur_ParentID": 19,
const getResources = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not featch ${url}, status ${res.status}`);
  }

  return await res.json();
};

const getAllCurrencies = async (): Promise<requestAllCurrencies> => {
  const res = await getResources(`${_allApiBase}`);
  return res;
};

const getAllCurrenciesRate = async (): Promise<requestCurrenciesRate[]> => {
  const res = await getResources(`${__allApiRates}`);
  return res;
};

const getCurrencie = async (id: number): Promise<requestCurrencyId> => {
  const res = await getResources(`${_apiBase}${id}`);
  return res;
};

const getCurrencyForDate = async (date: string): Promise<requestCurrenciesRate[]> => {
  const res = await getResources(api + '?ondate=' + date + '&periodicity=0');
  return res;
};

export { getCurrencie, getAllCurrenciesRate, getAllCurrencies, getCurrencyForDate };
