import React from "react";
import Modal from 'react-modal';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import md5 from "md5";
import axios from "axios";
import {
    setUsername,
    setUserType,
    setPassword,
    setIsError,
    setIsLoggedIn,
    LogOutUser,
} from "../redux/actions/userActions";
import {setItems, } from "../redux/actions/itemsActions";

import Cookies from 'universal-cookie';
import { buyItem } from "../redux/actions/itemsActions";
import {Button, Nav, Table} from 'react-bootstrap';
import '../stylesheets/HomePage.css'

const cookies = new Cookies();


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const HomePage = ({ username, password, isLoggedIn, isError, items, messages, ws, dispatch }) => {

    Modal.setAppElement('#root');
    const [isSeller, setisSeller] = React.useState(false);
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
            if(cookie_utype == "seller")
                setisSeller(true);
        }
    }, [dispatch]);


    const [showPurchaseHistory, setShowPurchaseHistory] = React.useState(false);

    const [allItems, setAllItems] = React.useState([]);
    const [showItemDesc, setShowItemDesc] = React.useState(false);
    const [itemId, setItemId] = React.useState('');
    const [itemName, setItemName] = React.useState('');
    const [itemDesc, setItemDesc] = React.useState('');

    const [createNewUser, setCreateNewUser] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [prevMessages, setPrevMessages] = React.useState([]);
    
    function getItems(){

    axios.get('/api/item/getAllItems')
        .then(res => {
            // dispatch(setItems(res.data.result));
            if(res.data.result.length != allItems.length)
            {
                setAllItems(res.data.result);}
            console.log(res.data);
        })
        .catch(console.log);
    }
    
    getItems();

    if(messages.length != prevMessages.length){
        setPrevMessages(messages);
        setAllItems([]);
        getItems();
    }
    console.log(prevMessages);

    function openModal() {
        setShowPurchaseHistory(false);
        if (isLoggedIn) {
            dispatch(LogOutUser())
        }
        else {
            setIsOpen(true)
        }
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }

    const transaction = (itemId, itemName, price) => {
        console.log(itemId);
        if(isLoggedIn){
        const body = {
            username: username,
            itemId: itemId,
            itemName : itemName,
            price: price
        };

        const url = "/api/transaction";

        axios.post(url, body)
        .then(res => {
            console.log(res.data);
            })
            .catch((e) => console.log(e));
        }
        else{
            alert("Please login to make a purchase!");
        }
    }

    const LoginUser = () => {

        console.log(password)
        console.log(username)
        const body = {

            "userId": username,
            "password": md5(password)
        };
        console.log("Making a Call to Server")
        dispatch(setIsError(false))
        axios
            .post("/api/auth/login", body)
            .then((res) => {
                if (res.data.valid) {
                    console.log(res.data);
                    cookies.set('username', username, { path: '/' });
                    cookies.set('userType', res.data.userType, { path: '/' });
                    // let cookie_utype = cookies.get('userType', { path: '/' });
                    cookies.set('loggedin', 'true', { path: '/' });
                    dispatch(setIsError(false));
                    dispatch(setIsLoggedIn(true));
                    if(res.data.userType && res.data.userType == "seller")
                        {   dispatch(setUserType("seller"));
                            setisSeller(true);
                        }
                    closeModal();
                } else {

                    dispatch(setIsLoggedIn(false));
                    dispatch(setIsError(true))
                    console.log("Invalid user credentials");
                }
                console.log(res);
            })
            .catch(console.log());
    };

    function openPurchaseHistory(){
        return (<Redirect to="/purchase-history/" />);
    }

    if (createNewUser) return <Redirect to="/signup/" />;
    else if (showPurchaseHistory) {
        if(isLoggedIn)
            return (<Redirect to="/purchase-history/" />);
        else
            openModal();
        }
    else if (showItemDesc){
        return (<Redirect to={{ pathname : "/item-description/", state: { id: itemId, description: itemDesc, name: itemName } }}/>);
    }
    else if (isSeller){
        return (<Redirect to="/seller/" />);
    }

    else
        return (
            <div className="homepage">
                <div>
                    <h1 class="title">Welcome to Shoppers Paradise </h1>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="login-modal-form">
                        <Button variant="outline-dark" onClick={closeModal}>close</Button>
                        <div>
                            {isError && <h4> Check Credentials Again </h4>}
                            <form>
                                <div>
                                    <h1>Mocha Coders Login </h1>
                                    <p>Username</p>
                                    <input
                                        name="username"
                                        type="text"
                                        onChange={(e) => dispatch(setUsername(e.target.value))}
                                    ></input>
                                </div>
                                <div>
                                    <p>Password</p>
                                    <input
                                        name="password"
                                        type="password"
                                        onChange={(e) => dispatch(setPassword(e.target.value))}>
                                    </input>
                                </div>
                                <div>
                                <Button variant="outline-success" onClick={() => LoginUser()}> Login </Button>
                                <Button variant="outline-primary" onClick={() => setCreateNewUser(true)}> Create Profile </Button>  
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>

                <div class="nav">
                    <Nav variant="tabs" defaultActiveKey="/">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setShowPurchaseHistory(true)}> Purchase History </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={openModal}> {isLoggedIn ? "Logout" : "Login"} </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <div>
                    <marquee behavior="scroll" direction="left">{messages.slice(messages.length- 10)}</marquee>
                </div>
                <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price ($)</th>
                            <th>Date Added</th>
                            <th>Quantity left</th>
                            <th>Total Sold</th>
                            <th>Click to View</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allItems.map((item, i) => (
                            item.forSale &&
                            <tr variant="light" key={i} id={item._id}>
                                    <td>{item.itemDetails.itemName}</td>
                                    <td>{item.itemDetails.itemPrice}</td>
                                    <td>{item.itemDetails.itemDate}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.salesCount}</td>
                                    
                                    <td><Button variant="primary" id={item._id} onClick={() => {setItemId(item._id); setItemDesc(item.itemDetails.itemDesc); setItemName(item.itemDetails.itemName); setShowItemDesc(true)}}> View Item</Button></td>
                                    <td><Button variant="primary" id={item._id} onClick={() => {transaction(item.itemId, item.itemDetails.itemName, item.itemDetails.itemPrice)}}> Buy Item Now</Button></td>
                                    {/* <td><Button variant="primary" id={item._id} onClick={() => dispatch(buyItem(item._id, allItems, ws))}> Buy Item Now</Button></td> */}
                            </tr>))}
                    </tbody>
                </Table>
                </div>
            </div>
        );
}

const mapStateToProps = (state) => {

    return {
        username: state.userReducer.username,
        password: state.userReducer.password,
        isLoggedIn: state.userReducer.isLoggedIn,
        isError: state.userReducer.isError,
        items: state.itemsReducer.items,
        messages: state.homePageReducer.messages,
    };
};

export default connect(mapStateToProps)(HomePage);

