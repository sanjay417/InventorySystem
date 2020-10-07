
const INITIAL_STATE = {
    itemName: '',
    itemPrice: '',
    itemQuantity: '',
    itemDescription: '',
    itemsAdded: '',
    getItems: [],
    editItems: true,
    changeItem: '',
    forSale: true
}

const sellerReducer = (state= INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_ITEM_NAME':
            return {
                ...state,
                itemName: action.payload.name
            }

        case 'SET_ITEM_PRICE':
            return {
                ...state,
                itemPrice: action.payload.price
            }

        case 'SET_ITEM_QUANTITY':
            return {
                ...state,
                itemQuantity: action.payload.quantity
            }

        case 'SET_ITEM_DESCRIPTION':
            return {
                ...state,
                itemDescription: action.payload.description
            }

        case 'SET_ITEMS_ADDED':
            return{
                ...state,
                itemsAdded: action.payload.Status
            }

        case 'GET_ITEMS':
            return{
                ...state,
                getItems: action.payload.items
            }

        case 'EDIT_ITEMS':
            return{
                ...state,
                editItems: true
            }

        case 'UPDATE_ITEMS':
            return{
                ...state,
                changeItem: action.payload.id,
                editItems: false
            }

        case 'SET_FORSALE':
            return{
                ...state,
                forSale: false
            }

        case 'DELETE_ITEMS':
            return{
                ...state,
                changeItem: action.payload.id
            }
        default:
            return state
    }
}

export default sellerReducer;