import React, { Fragment } from 'react';
import Header from './Header';
import Customers from './Customers';

const Home = () => {
  return (
    <Fragment>
      <Header />
      <Customers />
    </Fragment>
  );
}
 
export default Home;