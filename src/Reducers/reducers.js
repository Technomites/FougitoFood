import {
  
  set_IconFocus,
  GET_allRestraunts,
  GET_allRestrauntsUpdates,
  GET_allRestrauntsByID,
  GET_PopularCategoriesBYID,
  GET_MenuBYID,
  Menu_Selection_Updated,
  Menu_OptionDetails,
  STORE_Cart_DATA,
  Cart_CURRENTPRICE,
  Store_RestrauntId,
  CleanCartData
} from '../Actions/actions';

const initialState = {
  HomeIcon: "false",
  BookingIcon: "false",
  SettingIcon: "false",
  allrestraunts: [],
  restrauntdetails: [],
  popularcategories: [],
  restrauntmenu: [],
  retaurantmenucategorydataoption: [],
  cartdata: [],
  price: 0,
  currentRestrauntid: 0

};

function userReducer(state = initialState, action) {
  
  switch (action.type) {
    
    
    case CleanCartData:
     
      return {
        ...state,
        cartdata: action.payload,
      };

    case Store_RestrauntId:
     
      return {
        ...state,
        currentRestrauntid: action.payload,
      };

    case Cart_CURRENTPRICE:
     
      return {
        ...state,
        price: action.payload,
      };

    case STORE_Cart_DATA:
     
      return {
        ...state,
        cartdata:  [...state.cartdata, ...action.payload],
      };
    
    case Menu_OptionDetails:
     
      return {
        ...state,
        retaurantmenucategorydataoption: action.payload,
      };

    case Menu_Selection_Updated:
     
      return {
        ...state,
        restrauntmenu: action.payload,
      };

    case GET_MenuBYID:
     
      return {
        ...state,
        restrauntmenu: action.payload,
      };

    case GET_PopularCategoriesBYID:
     
      return {
        ...state,
        popularcategories: action.payload,
      };

    case GET_allRestrauntsByID:
     
      return {
        ...state,
        restrauntdetails: action.payload,
      };

    case GET_allRestrauntsUpdates:
     
      return {
        ...state,
        allrestraunts: action.payload,
      };

    case GET_allRestraunts:
     
      return {
        ...state,
        allrestraunts: action.payload,
      };
      
    case set_IconFocus:
      return {
        ...state,
        HomeIcon: action.home,
        BookingIcon: action.booking,
        SettingIcon: action.setting,
     
      };

  
    default:
      return state;
  }
}

export default userReducer;
