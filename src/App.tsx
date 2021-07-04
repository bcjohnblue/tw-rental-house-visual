import React, { useState } from 'react';
import './App.css';
import json from './assets/tw-rental-data/202105-deduplicated_台北市.json';
const jsonData = json as Data[];

import PriceAndArea from './components/PriceAndArea';
import { cleanData, fixPrice } from './helpers';
import { mapSubRegionToName } from './helpers/mappings';
import { round } from './utils';
import { Data, KeyOfData } from './interface';

type Result = Pick<Data, 'monthly_price' | 'floor_ping'> &
  Partial<Data> & { count: number };

const getData = (data: Data[]) => {
  const GROUP_KEY = 'sub_region';

  let result: Result[] = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const groupValue = element[GROUP_KEY];

    const targetIndex = result.findIndex((r) => r[GROUP_KEY] === groupValue);
    if (targetIndex === -1) {
      result.push({
        [GROUP_KEY]: groupValue,
        count: 1,
        monthly_price: element.monthly_price,
        floor_ping: element.floor_ping
      });
    } else {
      const target = result.find((r) => r[GROUP_KEY] === groupValue) as Result;
      target.monthly_price += element.monthly_price;
      target.floor_ping += element.floor_ping;

      result.splice(targetIndex, 1, {
        ...target,
        count: target.count + 1
      });
    }
  }

  result = result.map((r) => ({
    ...r,
    // @ts-ignore
    sub_region: mapSubRegionToName[r.sub_region],
    monthly_price: round(r.monthly_price / r.count),
    floor_ping: round(r.floor_ping / r.count, 2)
  }));
  console.log(result);

  return result;
};

function App() {
  let data: any[] = [];

  const filterData = jsonData.filter((d) => d.property_type === 0);
  data = cleanData(filterData);
  console.log('d', data);

  data = getData(data);

  return (
    <div className="App">
      <header className="App-header">
        <PriceAndArea data={data}></PriceAndArea>
      </header>
    </div>
  );
}

export default App;
