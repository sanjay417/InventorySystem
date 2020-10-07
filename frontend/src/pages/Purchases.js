import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, ListGroup} from "react-bootstrap";
import Cookies from 'universal-cookie';
import '../stylesheets/Purchases.css'

const cookies = new Cookies();

const Purchases = ({ username, isLoggedIn, isError, dispatch }) => {
    const [loading, setLoading] = React.useState(false);

    const [showHomePage, setToHomePage] = React.useState(false);

    const [purchases, setPurchases] = React.useState(
        // { date1: ["item1", "item2"], date2: ["itemA", "itemB", "itemC"], date3: ["item99"], date4: ["someitem"] }
        {}
    ); //dumby object for now, change to null when properly plugged into database

    //Get the User's Items from Database
    axios.post('/api/item/purchaseHistory',{"username" : username}) //This need to be connected to real url for getting the items
        .then(res => {
            setLoading(false);
            setPurchases({});  
            setPurchases(res.data.result);  
            // console.log(res.data);
        })
        .catch(console.log);


    //Create list of purchases by date
    const dateList = Object.keys(purchases).map(dates => {
        return (
            <div class="dates">
            <ListGroup value={dates}>
                <h4>{dates}</h4>
                <div class="items">
                {Object.keys(purchases[dates]).map(item => {
                    return (
                        <ListGroup.Item>{purchases[dates][item]}</ListGroup.Item>
                    );
                })}
                </div>
            </ListGroup>
            </div>
        );
    });


    if (showHomePage) {
        return <Redirect to="/" />;
    }
    else
        //Component Returned
        return (
            <div class="purchaseComponent">
                <Button variant="outline-primary" onClick={() => { setToHomePage(true) }}>Back</Button>
                    <h2 class="title">Your Purchase History</h2>
                    <div class="contents">
                        {loading === true && <h4>Loading Purchase History...</h4>}
                        {dateList}
                    </div>
            </div>
        );
};

const mapStateToProps = (state) => {

    return {
        username: state.userReducer.username,
        isLoggedIn: state.userReducer.isLoggedIn,
        isError: state.userReducer.isError,
    };
};

export default connect(mapStateToProps)(Purchases);
// export default Purchases;