import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, ListGroup} from "react-bootstrap";
import '../stylesheets/Purchases.css'

const ItemDesc = (props) => {

    // const ws2 = new WebSocket('ws://localhost:3002');
    
    console.log(props);
    let item_id = props.location.state.id;
    let item_description = props.location.state.description;
    let item_name = props.location.state.name;

    const [loading, setLoading] = React.useState(false);
    const [views, setViews] = React.useState(0);
    const [showHomePage, setToHomePage] = React.useState(false);
    const [ws2, setWs2] = React.useState(new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket'));

    ws2.onclose = () => {
        console.log("Connection closed");
  }
  
  ws2.onmessage = (message) => {
    
      const messageObject = JSON.parse(message.data); 
      console.log(messageObject);
      if( messageObject.type == 'UPDATE_VIEW_COUNT' && messageObject.id == item_id) 
      {
            setViews(messageObject.count);
      }
  }

  ws2.onopen = () => {
    
    console.log("ws opened!");

    ws2.send(JSON.stringify({id : item_id, type: "CONNECT"}));
    
  }

    if (showHomePage) {
        ws2.close();    
        return <Redirect to="/" />;
    }
    else
        //Component Returned
        return (
            <div class="purchaseComponent">
                <Button variant="outline-primary" onClick={() => { setToHomePage(true) }}>Back</Button>
                    <h2 class="title">Item Information for {item_name} </h2>
                    <div class="contents">
                        {loading === true && <h4>Loading Item Description...</h4>}
                    </div>
                    {/* <h3> Item ID: {item_id} </h3> */}
                    <h4> Item description: {item_description} </h4>
                    <h6> Number of people viewing this item: {views} </h6>
            </div>
        );
};

export default ItemDesc;