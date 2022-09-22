
    import AsyncStorage from '@react-native-community/async-storage';
 
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
  Login_User2,
  SignUP_User,
  SignUP_User2,
  ChangedPasswordMessage,
  OTP_Verify,
  Reset_Password,
  Restraunt_Distance,
  StoreToken,
  RESTRAUNTBASIC,
  PICKUPState,
  OTP_Verify2,
  couponsCart,
  VerifyCoupon,
  VerifyCouponClear,
  GetUserProfiles,
  Logoutuser,
  AsynClear,
  UpdateProfile,
  clearStatusProfile,
  UpdateProfilePicture,
  GetUserProfile,
  CURRENTADDRESS,
  SAVEADDRESS,
  ClearAddress,
  GetALLUSERADDRESSES,
  CreateOrder,
  ClearORDERPLACEMENTSTATUS,
  RefreshToken,
  StoreNEWRefreshTokenDATA,
  Updated_Profile_Picture,
  Updated_Profile_PictureClear,
  DetailsCart,
  MarkFAVOURITE,
  ClearFavourite,
  PriceAFTERDISCOUNT,
  STORELATLONG,
  MYFAVOURITES,
  NewpasswordChanged,
  NewpasswordChanged2,
  OrderList,
  Contactusdetails,
  contactusemail,
  internetCHECK
} from '../Actions/actions';

const initialState = {
  HomeIcon: 'false',
  BookingIcon: 'false',
  SettingIcon: 'false',
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
  GetUserProfile: [],
  restrauntdistance: 0,
  restrauntbasicdata: [],
  pickuporder: false,
  couponresponsestatus: '',
  couponresponsemessage: '',
  ProfileName: '',
  ProfileContact: '',
  ProfileEmail: '',
  ProfileImage: '',
  UserLogout: '',
  userLogoutStatus: '',
  UserUpdateProfileStatus: '',
  UserUpdateProfileMessage: '',
  UpdatePicStatus: '',
  UpdatePicStatusMessage: '',
  Selectedcurrentaddress: [],
  UserLogout: '',
  userLogoutStatus: '',
  addresscreationresponse: '',
  alladdresses: [],
  orderplacementstatus: '',
  refreshtokendata: null,
  imageupdationstatus: '',
  completeorderdetails: [],
  addedtofavourite: "",
  origin: "",
  discount: 0,
  couponresponseresult: undefined,
   UserCoupons: [],
   storedlat: 0,
   storedlong: 0,
   favouriterestuarants: [],
  NewchangedpasswordStatus: '',
  NewchangedpasswordMessage: '',
  MyorderList: [],
  MyorderListpast: [],
  detailsContact: [],
  detailsContactstatus: '',
  detailsContactmessage: '',
  internetconnectionstate: true,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  

    case internetCHECK:
      return {
        ...state,
        internetconnectionstate: action.payload,
    
     
      };

    case MYFAVOURITES:
      return {
        ...state,
        favouriterestuarants: action.payload,
    
     
      };
    case STORELATLONG:
      return {
        ...state,
        storedlat: action.payloadlat,
        storedlong: action.payloadlong,
     
      };
    case PriceAFTERDISCOUNT:
      return {
        ...state,
        price: action.payloadprice,
        discount: action.payloaddiscount,
     
      };

    case ClearFavourite:
      return {
        ...state,
        addedtofavourite: action.payload,
      };

    case MarkFAVOURITE:
      return {
        ...state,
        addedtofavourite: action.payload,
      };
    case NewpasswordChanged:
      return {
        ...state,
        NewchangedpasswordStatus: action.changedPassword,
        NewchangedpasswordMessage: action.Message,
      };
    case Contactusdetails:
      return {
        ...state,
        detailsContact: action.PayloadContactus,
      };

    case contactusemail:
      return {
        ...state,
        detailsContactstatus: action.emailpayload,
        detailsContactmessage: action.messagepayload,
      };
    case OrderList:
      return {
        ...state,
        MyorderList: action.payloadorder,
        MyorderListpast: action.payloadPastorder,
      };

    case NewpasswordChanged2:
      return {
        ...state,
        NewchangedpasswordStatus: action.changedPassword,
        NewchangedpasswordMessage: action.Message,
      };
    case Updated_Profile_PictureClear:
      return {
        ...state,
        imageupdationstatus: action.payload,
      };

    case Updated_Profile_Picture:
      return {
        ...state,
        imageupdationstatus: action.payloadimagestatus,
      };

    case StoreNEWRefreshTokenDATA:
      return {
        ...state,
        AuthToken: action.payloadtoken,
        refreshtokendata: null,
      };

    case RefreshToken:
      return {
        ...state,
        refreshtokendata: action.payload,
      };

    case ClearORDERPLACEMENTSTATUS:
      return {
        ...state,
        orderplacementstatus: action.payload,
      };

    case CreateOrder:
      return {
        ...state,
        orderplacementstatus: action.payload,
      };

    case GetALLUSERADDRESSES:
      return {
        ...state,
        alladdresses: action.payload,
      };

    case ClearAddress:
      return {
        ...state,
        addresscreationresponse: '',
      };

    case SAVEADDRESS:
      return {
        ...state,
        addresscreationresponse: action.payloadstatus,
      };

    case CURRENTADDRESS:
      return {
        ...state,
        Selectedcurrentaddress: action.payload,
      };

    case AsynClear:
      return {
        ...state,
        AuthToken: '',
        LoginCustomer: [],
        UserLogout: '',
        userLogoutStatus: '',
      };

    case VerifyCouponClear:
      return {
        ...state,
        couponresponsestatus: action.payload,
        couponresponsemessage: action.payload,
        couponresponseresult: undefined
      };

    case VerifyCoupon:
      return {
        ...state,
        couponresponsestatus: action.payloadstatus,
        couponresponsemessage: action.payloadmessage,
        couponresponseresult: action.payloadResult
       
    
      };

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
    case Login_User2:
      return {
        ...state,
        PayLoadLoginStatus: action.LoadLoginStatus,
      };

    case SignUP_User:
      return {
        ...state,
        SignupRandomid: action.SignUpPayLoad,
        signupStatus: action.SignUpstatus,
        signupmessage: action.SignUpMessage,
        SuccessMessageForgetpassword: action.successstautus,
      };

    case SignUP_User2:
      return {
        ...state,
        signupStatus: action.SignUpstatus,
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

    case OTP_Verify2:
      return {
        ...state,
        OtpVerificationStatus: action.payloadVerify,
      };

    case Reset_Password:
      return {
        ...state,
        Reset_PasswordStatus: action.newPassword,
        MessagePasswordStatus: action.Message,
      };

    case CARTDataDelete:
       AsyncStorage.setItem('cartdata', JSON.stringify(action.payload));
      return {
        ...state,
        cartdata: action.payload,
      };

    case CleanCartData:
       AsyncStorage.setItem('cartdata', JSON.stringify(action.payload));
      return {
        ...state,
        cartdata: action.payload,
      };

    case Store_RestrauntId:
      AsyncStorage.setItem('currentRestrauntid', JSON.stringify(action.payload));
      return {
        ...state,
        currentRestrauntid: action.payload,
      };

    case Cart_CURRENTPRICE:
      AsyncStorage.setItem('price', JSON.stringify(action.payload));
      return {
        ...state,
        price: action.payload,
      };

    case STORE_Cart_DATA:
       AsyncStorage.setItem('cartdata', JSON.stringify([...state.cartdata, ...action.payload]));
      return {
        ...state,
        cartdata: [...state.cartdata, ...action.payload],
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
        origin: action.payloadorigin,
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
    case couponsCart:
      return {
        ...state,
        UserCoupons: action.payloadcoupon,
      };

    case GetUserProfiles:
      return {
        ...state,
        ProfileName: action.NamePayload,
        ProfileContact: action.ContactPayload,
        ProfileEmail: action.EmailPayload,
        ProfileImage: action.UserImagePayload,
      };
    case Logoutuser:
      return {
        ...state,
        userLogoutStatus: action.LogoutSatusPayload,
        UserLogout: action.LogoutPayload,
      };
    case UpdateProfile:
      return {
        ...state,
        UserUpdateProfileStatus: action.UpdateProfileStatus,
        UserUpdateProfileMessage: action.UpdateProfileStatusMessage,
      };

    case clearStatusProfile:
      return {
        ...state,
        UserUpdateProfileStatus: '',
        UserUpdateProfileMessage: '',
      };

    case UpdateProfilePicture:
      return {
        ...state,
        UpdatePicStatus: action.UpdateProfilePicStatus,
        UpdatePicStatusMessage: action.UpdateProfilePicStatusMessage,
      };

    case DetailsCart:
      return {
        ...state,
        completeorderdetails: action.orderDetails,
      };
    default:
      return state;
  }
}

export default userReducer;
