// Creating a reducer

// Step 1 initialize state
const INITIAL_STATE = {
  username: "",
  userType: "buyer",
  password: "",
  isLoggedIn: false,
  isNewUser: true,
  isError: false,
  address: "",
  email_address: "",
};

// Step 2 create listener function
const userReducer = (state = INITIAL_STATE, action) => {
  // Step 3 create switch for action types
  switch (action.type) {
    case "SET_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: action.activeUsers,
      };
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case "SET_USERNAME":
      return {
        ...state, // spread operator
        // email: state.email,
        // isLoggedIn: state.isLoggedIn,
        username: action.username,
      };
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.userType,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.password,
      };
    case "CHECK_NEW_USER":
      return {
        ...state,
        isNewUser: action.isNewUser
      }
    case "SET_ERROR":
      return {
        ...state,
        isError: action.isError
      }
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address
      }
    case "SET_EMAIL_ADDRESS":
      return {
        ...state,
        email_address: action.email_address
      }
    default:
      return state;
  }
};

// don't forget to export
export default userReducer;
