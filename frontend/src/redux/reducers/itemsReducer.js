const DEFAULT_STATE = {
    items: [
        // {
        //     itemName: "Mac and Cheese",
        //     id: "01",
        //     itemCost: "100$",
        //     itemCount: 10,
        //     itemViewCount:0,
        //     itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        // },
        // {
        //     itemName: "Mac and Cheese",
        //     id: "02",
        //     itemCost: "200$",
        //     itemCount: 10,
        //     itemViewCount:0,
        //     itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        // },
        // {
        //     itemName: "Mac and Cheese",
        //     id: "03",
        //     itemCost: "300$",
        //     itemCount: 10,
        //     itemViewCount:0,
        //     itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        // },
        // {
        //     itemName: "Mac and Cheese",
        //     id: "04",
        //     itemCost: "400$",
        //     itemCount: 10,
        //     itemViewCount:0,
        //     itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        // },
        // {
        //     itemName: "Mac and Cheese",
        //     id: "05",
        //     itemCost: "500$",
        //     itemCount: 10,
        //     itemViewCount:0,
        //     itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        // },
    ],
};

const itemsReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'USER_SET_ITEMS':
            return {
                ...state,
                items: action.items,
            };
        default:
            return state;
    }
};

export default itemsReducer;
