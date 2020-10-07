import React from 'react'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AddItemsDashboard from './addItemsDashboard'
import ShowItemsDashboard from './showItemsDashboard'
import { Button } from 'react-bootstrap'

import Cookies from 'universal-cookie';

import {
    LogOutUser,
    setUsername,
    setUserType,
    setIsLoggedIn,
} from "../../redux/actions/userActions";

const cookies = new Cookies();

const SellersDashboard = ({ username, userType, isLoggedIn, messages, dispatch}) => {

    React.useEffect(() => {
        let cookie_uname = cookies.get('username', { path: '/' });
        let cookie_utype = cookies.get('userType', { path: '/' });
        let cookie_isLoggedIn = cookies.get('loggedin', { path: '/' });
        console.log("cookie_uname " + cookie_uname)
        console.log("cookie_loggedin " + cookie_isLoggedIn)
        if (cookie_isLoggedIn != null && cookie_isLoggedIn === 'true') {
            console.log("User-Logged-In")
            dispatch(setUsername(cookie_uname))
            dispatch(setUserType(cookie_utype))
            dispatch(setIsLoggedIn(cookie_isLoggedIn))
        }
    }, [dispatch]);
    
    //True = sell page, False = list page
    const [addItem_page_state, set_addPage_state] = React.useState(false);  
    const [showItem_page_state, set_showPage_state] = React.useState(true);

        const add_pg_state = () => {
            set_addPage_state(true);
            set_showPage_state(false);
        }

        const items_pg_state = () => {
            set_showPage_state(true);
            set_addPage_state(false)
        }

        const logout = () => {
            dispatch(LogOutUser())
        }

        if(!isLoggedIn || userType != "seller")
            return (<Redirect to="/" />);
        else

        return(
            <div>
                <div>
                    <marquee behavior="scroll" direction="left">{messages.slice(messages.length- 10)}</marquee>
                </div>
                <div> <br/>
                    <Button onClick={add_pg_state}>Add Items</Button> &emsp;
                    <Button onClick={items_pg_state}>List Items</Button> &emsp;
                    <Button onClick={logout}>Logout</Button> &emsp;
                </div> 

                <div>
                    {addItem_page_state && <AddItemsDashboard username={username}/>}
                    {showItem_page_state && <ShowItemsDashboard username={username}/>}
                </div>
            </div>
        )
    
  }
    
  const mapStateToProps = (state) => {

    return {
        username: state.userReducer.username,
        userType: state.userReducer.userType,
        password: state.userReducer.password,
        isLoggedIn: state.userReducer.isLoggedIn,
        isError: state.userReducer.isError,
        messages: state.homePageReducer.messages,
    };
};

export default connect(mapStateToProps)(SellersDashboard);

// export default SellersDashboard;