import React from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';
import Translate from './pages/Translate';
import Accounts from './pages/Accounts';

const App = () => {
  return (
    <>
      <Route exact path="/" component={Main} />
      <Route path="/Translate" component={Translate} />
      <Route path="/Accounts" component={Accounts} />
    </>
  );
};

export default App;
