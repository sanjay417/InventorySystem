import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Purchases from './pages/Purchases';
import ItemDesc from './pages/ItemDesc';
import Seller from './components/sellers/sellersDashboard';

import {
  setUsername,
  setIsLoggedIn,
} from "./redux/actions/userActions";
import Cookies from 'universal-cookie';
import Signup from "./pages/SignUp";
import HomePage from "./pages/HomePage";
const cookies = new Cookies();

const App = ({ ws, dispatch }) => {
  React.useEffect(() => {
    let cookie_uname = cookies.get('username', { path: '/' });
    let cookie_isLoggedIn = cookies.get('loggedin', { path: '/' });
    console.log("cookie_uname " + cookie_uname)
    console.log("cookie_loggedin " + cookie_isLoggedIn)
    if (cookie_isLoggedIn != null && cookie_isLoggedIn === 'true') {
      console.log("User-Logged-In")
      dispatch(setUsername(cookie_uname))
      dispatch(setIsLoggedIn(cookie_isLoggedIn))
    }
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        <Switch>
        <Route path="/seller" >
            <Seller />
          </Route>
          <Route path="/signup" >
            <Signup ws={ws} />
          </Route>
          <Route path="/purchase-history" >
            <Purchases ws={ws} />
          </Route>
          
          <Route path="/item-description/" render={(props) => <ItemDesc ws = {ws} {...props}/>}>
          </Route>
          <Route path="/">
            <HomePage ws={ws} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {

  return {
    username: state.userReducer.username,
    password: state.userReducer.password,
  };
};

export default connect(mapStateToProps)(App);
// export default App;
