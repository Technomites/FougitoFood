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
  Reset_Password2,
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
  ClearCARDORDERPLACEMENTSTATUS,
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
  DeliveryStatus,
  internetCHECK,
  OrderID,
  CardOrder,
  ClearProfile,
  DELETEDADDRESS,
  GETALLBRANCHLIST,
  CLEARMENU,
  review_restaurant,
  review_restaurant2,
  CancelationOrder,
  CancelationOrdernullstate,
  CLEARAddressDELETION,
  GETREPAY,
  CLEARREPAY,
  DISTANCEVAlidation,
  CLEARDISTANCEVAlidation,
  DELETEACCOUNT,
  GetNotifications,
  ClearNotifications,
  NotificationCount,
  DINEINTOGGLE



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
  addresscreationresponse: '',
  alladdresses: [],
  orderplacementstatus: '',
  cardorderplacementstatus: '',
  refreshtokendata: null,
  imageupdationstatus: '',
  completeorderdetails: [],
  addedtofavourite: '',
  origin: '',
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
  orderstatus: '',
  orderResult: [],
  orderdetails: 0,
  internetconnectionstate: true,
  orderdetailslink: '',
  addressdeletionstatus: '',
  branchlist: [],
  review_restaurant: '',
  Profileinfo: [],
  CancelationStatus: '',
  CancelationMessage: '',
  repayorderdetailslink: "",
  validdistance: null,
  deletionstatus: "",
  userid: "",
   Notificationsdata: [],
   NotificationCount: 0,
   refreshcomplete: false,
   dinein: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    
  

  

    case NotificationCount:
      return {
        ...state,
        NotificationCount: action.payload,

      };

    case ClearNotifications:
      return {
        ...state,
        Notificationsdata: action.payload,

      };

    case GetNotifications:
      return {
        ...state,
        Notificationsdata: [...state.Notificationsdata, ...action.notificationList],

      };


      case DELETEACCOUNT:
        return {
          ...state,
          deletionstatus: action.payload,
        };

    case CLEARDISTANCEVAlidation:
      return {
        ...state,
        validdistance: action.payload,
      };
    case DISTANCEVAlidation:
      return {
        ...state,
        validdistance: action.payload,
      };


    case CLEARREPAY:
      return {
        ...state,
        repayorderdetailslink: action.payload,
      };

    case GETREPAY:
      return {
        ...state,
        repayorderdetailslink: action.payload,
      };
    
    case CLEARAddressDELETION:
      return {
        ...state,
        addressdeletionstatus: action.payload,
      };

    case CLEARMENU:
      return {
        ...state,
        restrauntmenu: action.payload,
      };

    case GETALLBRANCHLIST:
      return {
        ...state,
        branchlist: action.payload,
      };

    case DELETEDADDRESS:
      return {
        ...state,
        addressdeletionstatus: action.payload,
      };

    case ClearProfile:
      return {
        ...state,
        UserUpdateProfileStatus: '',
      };

    case OrderID:
      return {
        ...state,
        orderdetails: action.payload,
      };
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
    case DeliveryStatus:
      return {
        ...state,
        orderstatus: action.DeliveryStatusCondition,
        orderResult: action.DeliveryStatusSuccess,
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
       refreshcomplete: action.payloadrefreshexecuted
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
    case ClearCARDORDERPLACEMENTSTATUS:
      return {
        ...state,
        cardorderplacementstatus: action.payload,
      };

    case CreateOrder:
      return {
        ...state,
        orderplacementstatus: action.payload,
        orderdetails: action.payloadorderresult,
      };

    case CancelationOrder:
      return {
        ...state,
        CancelationStatus: action.CancelationOrderStatus,
        CancelationMessage: action.CancelationOrderStatusMessage,
      };

    case CancelationOrdernullstate:
      return {
        ...state,
        CancelationStatus: action.status,
        CancelationMessage: action.Message,
      };

    case CardOrder:
      return {
        ...state,
        cardorderplacementstatus: action.payload,
        orderdetailslink: action.payloadCard,
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
      AsyncStorage.setItem('currentaddress', JSON.stringify(action.payload));
      return {
        ...state,
        Selectedcurrentaddress: action.payload,
      };


      case DINEINTOGGLE:
   
        return {
          ...state,
          dinein: action.payload,
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
        couponresponseresult: undefined,
      };

    case VerifyCoupon:
      return {
        ...state,
        couponresponsestatus: action.payloadstatus,
        couponresponsemessage: action.payloadmessage,
        couponresponseresult: action.payloadResult,
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
    case review_restaurant:
      return {
        ...state,
        ReviewStatus: action.payload,
      };
    case review_restaurant2:
      return {
        ...state,
        ReviewStatus: action.payload,
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

    case Reset_Password2:
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
      AsyncStorage.setItem('price', JSON.stringify(0));
      AsyncStorage.setItem('currentRestrauntid', JSON.stringify(0));
  
      return {
        ...state,
        cartdata: action.payload,
        price: 0,
        currentRestrauntid: 0,
        dinein: false
      };

    case Store_RestrauntId:
      AsyncStorage.setItem(
        'currentRestrauntid',
        JSON.stringify(action.payload),
      );
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
      AsyncStorage.setItem(
        'cartdata',
        JSON.stringify([...state.cartdata, ...action.payload]),
      );
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
        Profileinfo: action.data,
userid: action.UserID,

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
