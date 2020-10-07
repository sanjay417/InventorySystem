import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import * as actions from '../../redux/actions/sellerActions';
import { useSelector, useDispatch } from 'react-redux'
import {Input, TextArea} from 'semantic-ui-react'
import {setEditItems, setUpdateItems, } from '../../redux/actions/sellerActions';

const ShowItemsDashboard = (props) => {

    const dispatch = useDispatch()
    const [_data, set_data] = React.useState([]);
    useEffect(() => {
        const body = {username: props.username};
        const url = '/api/item/getInfo';

        axios.post(url,body)
            .then(res => {
            console.log(res.data);
            dispatch(actions.setGetItems(res.data.result));
            set_data(res.data.result)
            })
            .catch((e) => console.log(e));
        
        console.log(_data)
    },[])

const updateData = () => {
    const body = {username: props.username};
    const url = '/api/item/getInfo';

    axios.post(url,body)
        .then(res => {
        console.log(res.data);
        dispatch(actions.setGetItems(res.data.result));
        set_data(res.data.result)
        })
        .catch((e) => console.log(e));
    
    console.log(_data)
}

const updateItem = (item_id, item_name) => {
    console.log("IN UPDATE ITEMS")
    const todaysdate = new Date()
    const data= {
        username: props.username,
        itemId: item_id,
        name: item_name,
        price: props.itemPrice,
        quantity: props.itemQuantity,
        description: props.itemDescription,
        date: todaysdate.toLocaleString()
    }
    console.log(data)
    axios.post("/api/item/edit", data)
    .then(res => {
        if(res.data.valid){
            console.log(res.data.valid)
            dispatch(setUpdateItems(''))
            dispatch(setEditItems())
            
        }
        
    })
    .catch(err => console.log(err))
}



    return(
            <div>
              <br/> <br/>
              { props.getItems && props.getItems.map((items) => (
                <div className="row mx-md-n5"  key={items.itemId}>
                            <div className = "col px-md-3">
                                { items.forSale && 
                                    <div className="p-3 border rounded text-center" >
                                        <p>Item Name: {items.itemDetails.itemName}</p> 
                                        {props.updateItems===items.itemId ? <div> <br/> <Input type= 'number' label="Item Price"  onChange= {e => dispatch(actions.setItemPrice(e.target.value))}/> </div> : <p>Price: {items.itemDetails.itemPrice}</p>}
                                        {props.updateItems===items.itemId ? <div> <br/> <Input type= 'text' label="Items Description" onChange= {e => dispatch(actions.setItemDescription(e.target.value))} /> </div> : <p>Description: {items.itemDetails.itemDesc}</p>}
                                        {props.updateItems===items.itemId ? <div> <br/> <Input type= 'number' label="Items Quantity" onChange= {e => dispatch(actions.setItemQuantity(e.target.value))}/> </div> :<p>Quantity: {items.quantity}</p>}
                                    
                                        { props.editItems && <div> <Button onClick = {() => {dispatch(actions.setUpdateItems(items.itemId))}}> Edit </Button><br/><br/> </div>} 
                                
                                        { (props.updateItems===items.itemId && props.editItems === false) && <div> <br/> <Button onClick = {() => {/*dispatch(actions.updateItem());*/ updateItem(items.itemId, items.itemDetails.itemName); updateData();} }> Update </Button><br/><br/> </div>} 
                                                                            
                                        <Button variant="danger" onClick = {() => { dispatch(actions.setDeleteItem(items.itemId)); dispatch(actions.deleteItem()); updateData() }}> Delete </Button>
                                    </div>
                                }
                            </div>
                        
                        }
                </div>
                ))}

            </div>
        )
}

const mapStateToProps = (state) => ({
    
    itemName: state.sellerReducer.itemName,
    itemPrice: state.sellerReducer.itemPrice,
    itemQuantity: state.sellerReducer.itemQuantity,
    itemDescription: state.sellerReducer.itemDescription,
    editItems: state.sellerReducer.editItems,
    updateItems:state.sellerReducer.changeItem,
    getItems: state.sellerReducer.getItems
})

export default connect (mapStateToProps)(ShowItemsDashboard); 

