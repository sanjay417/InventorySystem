import axios from "axios";
// import { store } from '../../index';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const setItemName = itemName => {
    return {
        type: 'SET_ITEM_NAME',
        payload: {
            name: itemName
        }
    }
}

export const setItemPrice = itemPrice => {
    return {
        type: 'SET_ITEM_PRICE',
        payload: {
            price: itemPrice
        }
    }
}

export const setItemQuantity = itemQuantity => {
    return {
        type: 'SET_ITEM_QUANTITY',
        payload: {
            quantity: itemQuantity
        }
    }
}

export const setItemDescription = itemDescription => {
    return {
        type: 'SET_ITEM_DESCRIPTION',
        payload: {
            description: itemDescription
        }
    }
}

export const setItemsAdded = (status) => {
    return{
        type: 'SET_ITEMS_ADDED',
        payload: {
            Status: status
        }
    }
}

export const setGetItems = (data) => {
    return{
        type:'GET_ITEMS',
        payload: {
            items: data
        }
    }
}

export const setUpdateItems = (id) => {
    return{
        type: 'UPDATE_ITEMS',
        payload: {
            id: id
        }
    }
}

export const setEditItems = () => {
    return{
        type: 'EDIT_ITEMS',
    }
}

export const setForSale = () => {
    return{
        type: 'SET_FORSALE',
    }
}

export const setDeleteItem = (id) => {
    return{
        type: 'DELETE_ITEMS',
        payload: {
            id: id
        }
    }
}
export const addItem = () => (dispatch, getState) => {
    console.log(store.getState())
    console.log("IN ADD ITEMS")
    const todaysdate = new Date()
    const data= {
        username: 'sanjay',
        name: store.getState().sellerReducer.itemName,
        price: store.getState().sellerReducer.itemPrice,
        quantity: store.getState().sellerReducer.itemQuantity,
        description: store.getState().sellerReducer.itemDescription,
        date: todaysdate.toLocaleString()
    }
    axios.post("/api/item/create", data)
    .then(res =>{
        if(res.data.valid){
            dispatch(setItemsAdded('true'))
            console.log(store.getState())
        }
        else{
            dispatch(setItemsAdded('false'))
        }
    })
    .catch(err => console.log(err))
}


export const updateItem = () => (dispatch, getState) => {
    console.log("IN UPDATE ITEMS")
    const todaysdate = new Date()
    const data= {
        username: 'sanjay',
        itemId: store.getState().sellerReducer.changeItem,
        price: store.getState().sellerReducer.itemPrice,
        quantity: store.getState().sellerReducer.itemQuantity,
        description: store.getState().sellerReducer.itemDescription,
        date: todaysdate.toLocaleString()
    }
    console.log(data)
    axios.post("/api/item/edit", data)
    .then(res => {
        if(res.data.valid){
            console.log(res.data.valid)
            dispatch(setUpdateItems(''))
            dispatch(setEditItems())
            console.log(getState())
        }
        
    })
    .catch(err => console.log(err))
}

export const deleteItem = () => (dispatch, getState) => {
    console.log("IN DELETE ITEMS")
    const data = {
        itemId: getState().sellerReducer.changeItem,
        username: getState().userReducer.username
    }
    console.log(data)
    axios.post("/api/item/delete", data)
    .then(res =>{
        if(res.data.valid){
            console.log(res.data.valid)
            dispatch(setUpdateItems(''))
            dispatch(setEditItems())
            console.log(getState())
        }
        
    })
    .catch(err => console.log(err))
}
