import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Layout from '../layout';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes />
    </Layout>
  </BrowserRouter>
);

export default Router;
