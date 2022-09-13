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
  CleanCartData,
  CARTDataDelete,
  Login_User,
  SignUP_User,
  ChangedPasswordMessage,
  OTP_Verify,
  Reset_Password,
  Restraunt_Distance,
  StoreToken,
  RESTRAUNTBASIC,
  PICKUPState

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
  currentRestrauntid: 0,
  AuthToken: '',
  LoginResult: '',
  PayLoadLoginStatus: '',
  LoginCustomer: [],
  SignupRandomid: '',
  SuccessMessageForgetpassword: '',
  PasswordMessage: '',
  ErrorResultMessage: '',
  OtpVerificationStatus: '',
  restrauntdistance: 0,
  restrauntbasicdata: [],
  pickuporder: false

};

function userReducer(state = initialState, action) {
  
  switch (action.type) {
    
    
    case PICKUPState:
      return {
        ...state,
        pickuporder: action.payload,
  
      };

    case RESTRAUNTBASIC:
      return {
        ...state,
        restrauntbasicdata: action.payload,
  
      };

    case StoreToken:
      return {
        ...state,
        AuthToken: action.payload,
  
      };

    case Restraunt_Distance:
      return {
        ...state,
        restrauntdistance: action.payload,
  
      };


    case Login_User:
      return {
        ...state,
        LoginResult: action.payload,
        AuthToken: action.payloadtoken,
        LoginCustomer: action.payloadCustomer,
        PayLoadLoginStatus: action.LoadLoginStatus,
      };

    case SignUP_User:
      return {
        ...state,
        SignupRandomid: action.SignUpPayLoad,
        SuccessMessageForgetpassword: action.successstautus,
      };

    case ChangedPasswordMessage:
      return {
        ...state,
        PasswordMessage: action.ChangedPasswordMessagePayLoad,
      };

    case OTP_Verify:
      return {
        ...state,
        OtpVerificationStatus: action.payloadVerify,
      };

    case Reset_Password:
      return {
        ...state,
        Reset_PasswordStatus: action.newPassword,
        MessagePasswordStatus:action.Message
      };
    
    case CARTDataDelete:
     
      return {
        ...state,
        cartdata: action.payload,
      };

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
