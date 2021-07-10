import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PriceAndArea from '../pages/PriceAndArea';

export default () => (
  <Switch>
    <Route path="/analysis">
      <Switch>
        <Route path="/analysis/price-area" exact>
          <PriceAndArea></PriceAndArea>
        </Route>
      </Switch>
    </Route>
  </Switch>
);
