import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const rateRef = useRef({});

  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then(res => res.json())
    .then(json => {
      rateRef.current = json.rates;
      onChangeToPrice(1);
    }).catch(err => {
      console.warn(err);
      alert('Не удалось получить информацию')
    });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rateRef.current[fromCurrency];
    const result = price * rateRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(3))
  }

  const onChangeToPrice = (value) => {
    const result = (rateRef.current[fromCurrency] / rateRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [toCurrency])

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])


  return (
    <div className="App">
      <Block value={fromPrice} onChangeValue={onChangeFromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} />
      <Block value={toPrice}  onChangeValue={onChangeToPrice} currency={toCurrency} onChangeCurrency={setToCurrency} />
    </div>
  );
}

export default App;
