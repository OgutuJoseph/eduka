import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './containers/signup';
import Signin from './containers/signin';
import Home from './containers/home';
import NewPage from './containers/newpage';
import Category from './containers/category'
import Product from './containers/product';
import Order from './containers/order';

import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';

import PrivateRoute from './components/HOC/PrivateRoute';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate)
    {
        dispatch(isUserLoggedIn());
        
    }

    
    dispatch(getInitialData());
});

  return (
    <div className="App">  
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/page' component={NewPage} />
        <PrivateRoute path='/category' component={Category} />
        <PrivateRoute path='/products' component={Product} />
        <PrivateRoute path='/orders' component={Order} />
        <PrivateRoute path='/orders' component={() => <p>orders</p>} /> 
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
      </Switch> 
    </div>
  );
}

export default App;
