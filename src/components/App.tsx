import React, { ReactElement } from 'react';

import StoreProvider from '../Store';
import Routes from './Routes';
import Layout from './Layout';

export default function App(): ReactElement {
  return (
    <StoreProvider>
      <Layout>
        <Routes />
      </Layout>
    </StoreProvider>
  );
}
