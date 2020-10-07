import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import md5 from "md5";
import {
  setAddress,
  setEmailAddress,
  setUsername,
  setUserType,
  setPassword,
  setIsError,
  setIsLoggedIn,
} from "../redux/actions/userActions";
import {Button} from "react-bootstrap";
import "../stylesheets/SignUp.css"

const cookies = new Cookies();

const Signup = ({ username, userType, password, address, email_address, isNewUser, isError, dispatch }) => {

  const [showHomePage, setToHomePage] = React.useState(false);
  const [name,setName] = React.useState('');
  // const [userType,setuserType] = React.useState('buyer');

  const SignupUser = () => {

    // console.log(getState().userReducer.password);
    // console.log(getState().userReducer.username);   

    dispatch(setIsError(false))
    cookies.remove('username');
    cookies.remove('userType');
    cookies.remove('loggedin');
    console.log("Name: " + name + " type: " + userType);
    let body = {
      "name" : name,
      "userId": username,
      "password": md5(password),
      "userType": userType,
      "email": email_address,

    };
    console.log("Creating user-profile")
    console.log(body);
    axios
      .post("/api/auth/signup", body)
      .then((res) => {
        if (res.data.valid) {
          cookies.set('username', username, { path: '/' });
          cookies.set('userType', userType, { path: '/' });
          cookies.set('loggedin', 'true', { path: '/' });
          console.log("User-Credentials Authenticated");

          dispatch(setIsLoggedIn(true))
          dispatch(setIsError(false));
          setToHomePage(true)
        } else {
          dispatch(setIsLoggedIn(false))
          dispatch(setIsError(true));
          console.log("Invalid user credentials");
        }
        console.log(res);
      })
      .catch(console.log());
  };

  if(userType == "")
    dispatch(setUserType("buyer"));

  if (showHomePage) {
    if(userType == "seller")
        return <Redirect to="/seller/" />;
    return <Redirect to="/" />;
  }
  else

    return (
      <div>
        {isError && <h4> Use a different Username </h4>}
        <div class="signupComponent">
          <Button variant="outline-primary" onClick={() => { setToHomePage(true) }}>Back</Button>
          <form>
            <h1>Sign Up</h1>
            <div class="field">
            <p>Name</p>
              <input
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <p>Username</p>
              <input
                name="username"
                type="text"
                onChange={(e) => dispatch(setUsername(e.target.value))}
              ></input>
            </div>
            <div class="field">
              <p>Password</p>
              <input
                name="password"
                type="password"
                onChange={(e) => dispatch(setPassword(e.target.value))}
              ></input>
            </div>
            <div class="field">
              <p>Contact Address</p>
              <input
                name="address"
                type="text"
                onChange={(e) => dispatch(setAddress(e.target.value))}
              ></input>
            </div>
            <div class="field">
              <p>Contact Email</p>
              <input
                name="email"
                type="email"
                onChange={(e) => dispatch(setEmailAddress(e.target.value))}
              ></input>
            </div>
            <div class="field">
            <p>Please select your user account type:</p>
              <input type="radio" id="buyer" name="gender" value="buyer" checked={true} onClick={(e) => dispatch(setUserType(e.target.value))}></input>
              <label for="buyer">Buyer</label><br></br>
              <input type="radio" id="seller" name="gender" value="seller" onClick={(e) => dispatch(setUserType(e.target.value))}></input>
              <label for="seller">Seller</label><br></br>
            </div>

            <Button class="signupbtn" variant="outline-success" onClick={() => SignupUser()}>
              {" "}
          Signup{" "}
            </Button>
          </form>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  username: state.userReducer.username,
  userType: state.userReducer.userType,
  password: state.userReducer.password,
  address: state.userReducer.address,
  email_address: state.userReducer.email_address,
  isNewUser: state.userReducer.isNewUser,
  isError: state.userReducer.isError,
});
export default connect(mapStateToProps)(Signup);