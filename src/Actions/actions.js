import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import Coupons from '../Screens/Coupons';
import {useSelector, useDispatch} from 'react-redux';

// export const GetBlogsHome = 'GetBlogsHome';
export const set_IconFocus = 'set_IconFocus';
export const GET_allRestraunts = 'GET_allRestraunts';
export const GET_allRestrauntsByID = 'GET_allRestrauntsByID';
export const GET_allRestrauntsUpdates = 'GET_allRestrauntsUpdates';
export const GET_PopularCategoriesBYID = 'GET_PopularCategoriesBYID';
export const GET_MenuBYID = 'GET_MenuBYID';
export const Menu_Selection_Updated = 'Menu_Selection_Updated';
export const Menu_OptionDetails = 'Menu_OptionDetails';
export const STORE_Cart_DATA = 'STORE_Cart_DATA';
export const Cart_CURRENTPRICE = 'Cart_CURRENTPRICE';
export const Store_RestrauntId = 'Store_RestrauntId';
export const CleanCartData = 'CleanCartData';
export const CARTDataDelete = 'CARTDataDelete';
export const Login_User = 'Login_User';
export const SignUP_User = ' SignUP_User';
export const Login_User2 = 'Login_User2';
export const SignUP_User2 = ' SignUP_User2';
export const ChangedPasswordMessage = 'ChangedPasswordMessage';
export const OTP_Verify = 'OTP_Verify';
export const OTP_Verify2 = 'OTP_Verify2';
export const Reset_Password = 'Reset_Password';
export const couponsCart = 'couponsCart';
export const Restraunt_Distance = 'Restraunt_Distance';
export const StoreToken = 'StoreToken';
export const RESTRAUNTBASIC = 'RESTRAUNTBASIC';
export const PICKUPState = 'PICKUPState';
export const CreateOrder = 'CreateOrder';
export const VerifyCoupon = 'VerifyCoupon';
export const VerifyCouponClear = 'VerifyCouponClear';
export const GetUserProfiles = 'GetUserProfiles';
export const Logoutuser = 'Logoutuser';
export const AsynClear = 'AsynClear';
export const UpdateProfile = 'UpdateProfile';
export const clearStatusProfile = 'clearStatusProfile';
export const UpdateProfilePicture = 'UpdateProfilePicture';
export const GetUserProfile = 'GetUserProfile';
export const CURRENTADDRESS = 'CURRENTADDRESS';
export const SAVEADDRESS = 'SAVEADDRESS';
export const ClearAddress = 'ClearAddress';
export const GetALLUSERADDRESSES = 'GetALLUSERADDRESSES';
export const ClearORDERPLACEMENTSTATUS = 'ClearORDERPLACEMENTSTATUS';
export const RefreshToken = 'RefreshToken';
export const StoreNEWRefreshTokenDATA = 'StoreNEWRefreshTokenDATA';
export const Updated_Profile_Picture = 'Updated_Profile_Picture';
export const Updated_Profile_PictureClear = 'Updated_Profile_PictureClear';
export const DetailsCart = 'DetailsCart';
export const MarkFAVOURITE = 'MarkFAVOURITE';
export const ClearFavourite = 'ClearFavourite';
export const PriceAFTERDISCOUNT = 'PriceAFTERDISCOUNT';
export const MYFAVOURITES = 'MYFAVOURITES';
export const STORELATLONG = 'STORELATLONG';
export const NewpasswordChanged = 'NewpasswordChanged';
export const NewpasswordChanged2 = 'NewpasswordChanged2';
export const OrderList = 'OrderList';
export const Contactusdetails = 'Contactusdetails';
export const contactusemail = 'contactusemail';
export const DeliveryStatus = 'DeliveryStatus';
export const internetCHECK = 'internetCHECK';
export const OrderID = 'OrderID';

const API_URl = 'https://api.fougitodemo.com/api/';
// const API_URl = 'http://192.168.18.119:45460/api/';

const header1 = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const storeorderid = id => {
  try {
    return async dispatch => {
      dispatch({
        type: OrderID,
        payload: id,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const isconnected = state => {
  try {
    return async dispatch => {
      dispatch({
        type: internetCHECK,
        payload: state,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const storelatlong = (lat, long) => {
  try {
    return async dispatch => {
      dispatch({
        type: STORELATLONG,
        payloadlat: lat,
        payloadlong: long,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getmyfavourites = (Latitude, Longitude, token) => {
  try {
    console.log('getmyfavourites');
    return async dispatch => {
      const result = await fetch(API_URl + 'Customer/Favourite/Branches', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Latitude: Latitude,
          Longitude: Longitude,
        }),
      });

      const json = await result.json();
      console.log('getmyfavourites' + JSON.stringify(json));

      if (json.Status == 'Success') {
        dispatch({
          type: MYFAVOURITES,
          payload: json.Result,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatepriceafterdiscount = (price, discount) => {
  try {
    return async dispatch => {
      dispatch({
        type: PriceAFTERDISCOUNT,
        payloadprice: price,
        payloaddiscount: discount,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearfavourite = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearFavourite,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const markfavourite = (id, type, token) => {
  try {
    console.log('markfavourite');
    return async dispatch => {
      const result = await fetch(API_URl + 'Customer/Favourite/Branch/' + id, {
        method: type,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await result.json();
      console.log('markfavourite' + JSON.stringify(json));

      if (json.Status == 'Success') {
        dispatch({
          type: MarkFAVOURITE,
          payload: json.Status,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearimageresponse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: Updated_Profile_PictureClear,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateprofilepicture = (picture, token) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append('Authorization', `Bearer ${token}`);

      var photo = {
        uri: picture.path,
        type: picture.mime,
        name: 'photo.jpg',
      };

      var formdata = new FormData();
      formdata.append('Image', photo);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + 'Customer/Account/ProfilePicture',
        requestOptions,
      );

      const json = await result.json();

      console.log('updated picture' + JSON.stringify(json));

      dispatch({
        type: Updated_Profile_Picture,
        payloadimagestatus: json.Status,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const refreshmytoken = (data, token) => {
  try {
    console.log('refreshmytoken');
    return async dispatch => {
      const result = await fetch(
        API_URl + 'ServiceAndDeliveryStaffAccount/RefreshToken',
        {
          method: 'POST',
          headers: {
            Accept: 'text/plain',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const json = await result.json();
      console.log('refreshmytoken' + JSON.stringify(json));

      if (json.Status == 'Success') {
        await AsyncStorage.setItem(
          'AccessToken',
          JSON.stringify(json.Result.Token),
        );
        await AsyncStorage.setItem('TokenInfo', JSON.stringify(json.Result));

        dispatch({
          type: StoreNEWRefreshTokenDATA,
          payloadtoken: json.Result.Token,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const storetokenrefresh = data => {
  try {
    return async dispatch => {
      dispatch({
        type: RefreshToken,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearorderplacementstatus = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearORDERPLACEMENTSTATUS,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getalladdresses = token => {
  try {
    return async dispatch => {
      const result = await fetch(API_URl + 'Customer/' + 0 + '/Address', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getalladdresses' + JSON.stringify(json));

      if (json.Status == 'Success') {
        dispatch({
          type: GetALLUSERADDRESSES,
          payload: json.Result,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearaddressresponse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearAddress,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const savemyaddress = (data, token) => {
  try {
    console.log('savemyaddress');
    return async dispatch => {
      const result = await fetch(API_URl + 'Customer/Address', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await result.json();
      console.log('savemyaddress' + JSON.stringify(json));

      dispatch({
        type: SAVEADDRESS,
        payloadstatus: json.Status,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const storecurrentaddress = data => {
  try {
    return async dispatch => {
      dispatch({
        type: CURRENTADDRESS,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearcouponresponse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: VerifyCouponClear,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const verifycoupon = (code, phonenumber, origin) => {
  try {
    console.log('verifycoupon');
    return async dispatch => {
      const result = await fetch(
        API_URl + 'Customer/Restaurant/ValidateCoupon',
        {
          method: 'POST',
          headers: {
            Origin: origin,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            couponCode: code,
            phoneNumber: phonenumber,
          }),
        },
      );

      const json = await result.json();
      console.log('verifycoupon' + JSON.stringify(json));

      dispatch({
        type: VerifyCoupon,
        payloadstatus: json.Status,
        payloadmessage: json.Message,
        payloadResult: json.Result,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const createorder = (AuthToken, data) => {
  try {
    console.log('placeorder');
    return async dispatch => {
      const result = await fetch(API_URl + 'Customer/Restaurant/PlaceOrder', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await result.json();
      console.log('postserviceratings' + JSON.stringify(json));

      if (json.Status === 'Success') {
       
        dispatch({
          type: CreateOrder,
          payload: 'success',
          payloadorderresult: json.Result.Id,
        });
      } else {
        dispatch({
          type: CreateOrder,
          payload:
            'We are unable to place your order at the moment. Please try again later.',
          payloadorderresult: 0,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const pickupstate = bool => {
  try {
    return async dispatch => {
      dispatch({
        type: PICKUPState,
        payload: bool,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const storerestrauntbasicdata = data => {
  try {
    return async dispatch => {
      dispatch({
        type: RESTRAUNTBASIC,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const storetoken = token => {
  try {
    return async dispatch => {
      dispatch({
        type: StoreToken,
        payload: token,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const storedistance = distance => {
  try {
    return async dispatch => {
      dispatch({
        type: Restraunt_Distance,
        payload: distance,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const Signup = (number, fullname, email, password) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Origin', 'https://fougito.com');
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        Email: email,
        FirstName: fullname,
        Password: password,
        PhoneNumber: number,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + 'customer/account/Register',
        requestOptions,
      );
      json = await result.json();
      console.log(json?.Result, 'Register Register Register');
      if (json.Status == 'Success') {
        dispatch({
          type: SignUP_User,
          SignUpPayLoad: json?.Result,
          SignUpstatus: json?.Status,
          SignUpMessage: json?.Message,
        });
      } else if (json.Status == 'Error') {
        dispatch({
          type: SignUP_User,
          SignUpPayLoad: '',
          SignUpstatus: json?.Status,
          SignUpMessage: json?.Message,
        });
      }
    };
  } catch (error) {}
};

export const signupnullstate = () => {
  return async dispatch => {
    dispatch({
      type: SignUP_User2,
      SignUpstatus: '',
    });
  };
};

export const Verification = (otp, userid) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };
      console.log(otp + 'userid' + userid);
      const result = await fetch(
        API_URl + `Customer/Account/VerifyOTP/${otp}/${userid}`,
        requestOptions,
      );
      json = await result.json();
      //  console.log(json, 'IF CONDITION OUTER');
      if (json.Status == 'Success') {
        // dispatch({
        //   type: Login_User,
        //   payload: json?.Result,
        //   payloadtoken: json?.Result.AuthData.TokenInfo.Token,
        //   payloadCustomer: json?.Result.Customer,
        //   LoadLoginStatus: json?.Status,
        // });
        dispatch({
          type: OTP_Verify,
          payloadVerify: json?.Status,
        });
        console.log('Success', 'OTP OTP OTP');
      } else if (json.Status == 'Error') {
        dispatch({
          type: OTP_Verify,
          payloadVerify: json?.Status,
        });
      }
    };
  } catch (error) {}
};

export const ReVerification = number => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Account/ResendOTP/${number}`,
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'IF CONDITION OUTER RE send Otp');
      if (json.Status == 'Success') {
        console.log('Success', 'RE send Otp');
      } else {
        console.log('AUTHENTICATION FAILED Re send otp');
      }
    };
  } catch (error) {}
};

export const Login = (number, password) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        phoneNumber: number,
        password: password,
        rememberMe: false,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + 'Customer/Account/Login',
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'LOGIN LOGIN LOGIN');

      if (json.Status == 'Success') {
        console.log(' type: Login_User,');
        dispatch({
          type: Login_User,
          payload: json?.Result,
          payloadtoken: json?.Result.AuthData.TokenInfo.Token,
          payloadCustomer: json?.Result.Customer,
          LoadLoginStatus: json?.Status,
        });
        await AsyncStorage.setItem(
          'AccessToken',
          JSON.stringify(json?.Result.AuthData.TokenInfo.Token),
        );
        await AsyncStorage.setItem(
          'TokenInfo',
          JSON.stringify(json?.Result.AuthData.TokenInfo),
        );
        await AsyncStorage.setItem('Password', password);
        console.log('Success');
      } else if (json?.Status == 'Error') {
        console.log(json?.Message, 'EROORRR');
        dispatch({
          type: Login_User,
          payload: '',
          payloadtoken: '',
          payloadCustomer: '',
          LoadLoginStatus: json?.Status,
        });
      }
    };
  } catch (error) {}
};
export const LoginStateNull = () => {
  return async dispatch => {
    dispatch({
      type: Login_User2,
      LoadLoginStatus: '',
    });
  };
};

export const ForgetPassword = number => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Account/ForgetPassword/${number}`,
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'ForgetPassword ForgetPassword ForgetPassword');

      if (json.Status == 'Success') {
        dispatch({
          type: SignUP_User,
          SignUpPayLoad: json?.Result,
          successstautus: 'Otp Generated',
        });
        dispatch({
          type: ChangedPasswordMessage,
          ChangedPasswordMessagePayLoad: json?.Status,
        });
        console.log('Success Forget Password');
      } else if (json?.Status == 'Error') {
        dispatch({
          type: ChangedPasswordMessage,
          ChangedPasswordMessagePayLoad: json?.Status,
          MessageError: json?.Message,
        });
      }
    };
  } catch (error) {}
};

export const OrderStatus = (AuthToken, id) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Order/${id}`,
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'ForgetPassword ForgetPassword ForgetPassword');

      if (json.Status == 'Success') {
        dispatch({
          type: DeliveryStatus,
          DeliveryStatusCondition: json?.Status,
          DeliveryStatusSuccess: json?.Result,
        });
      } else if (json?.Status == 'Error') {
        dispatch({
          type: DeliveryStatus,
          DeliveryStatusCondition: '',
          DeliveryStatusSuccess: '',
        });
      }
    };
  } catch (error) {}
};

export const ForgetPasswordNullstate = () => {
  return async dispatch => {
    dispatch({
      type: ChangedPasswordMessage,
      ChangedPasswordMessagePayLoad: '',
    });
  };
};

export const OTPNullstate = () => {
  return async dispatch => {
    dispatch({
      type: OTP_Verify2,
      payloadVerify: "",
    });
  };
};

export const ChangedPassword = (userid, newpassword, confirmpassword) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      console.log(userid, newpassword, confirmpassword);

      var raw = JSON.stringify({
        userId: userid,
        newPassword: newpassword,
        confirmPassword: confirmpassword,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Account/ResetPassword`,
        requestOptions,
      );
      json = await result.json();
      if (json.Status == 'Success') {
        console.log(json.Status, 'Customer/Account/ResetPassword');
        dispatch({
          type: Reset_Password,
          newPassword: json?.Status,
          Message: json?.Message,
        });
      } else if (json.Status == 'Error') {
        dispatch({
          type: Reset_Password,
          newPassword: json?.Status,
          Message: json?.Message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const Contactemail = (AuthToken, message) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${AuthToken}`);

      var raw = JSON.stringify({
        message: message,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const result = await fetch(API_URl + `ContactUs`, requestOptions);
      json = await result.json();
      if (json.Status == 'Success') {
        dispatch({
          type: contactusemail,
          emailpayload: json?.Status,
          messagepayload: json?.Message,
        });
      } else if (json.Status == 'Error') {
        console.log();
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const emailNullstate = () => {
  return async dispatch => {
    dispatch({
      type: contactusemail,
      emailpayload: '',
      messagepayload: '',
    });
  };
};

export const ChangedNewPassword = (
  AuthToken,
  oldpassword,
  newpassword,
  confirmpassword,
) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken}`);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        oldPassword: oldpassword,
        newPassword: newpassword,
        confirmPassword: confirmpassword,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Account/ChangePassword`,
        requestOptions,
      );
      json = await result.json();
      if (json.Status == 'Success') {
        console.log(json.Status, 'Customer/Account/ChangePassword');
        dispatch({
          type: NewpasswordChanged,
          changedPassword: json?.Status,
          Message: json?.Message,
        });
      } else if (json.Status == 'Error') {
        dispatch({
          type: NewpasswordChanged,
          changedPassword: json?.Status,
          Message: json?.Message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const NewpasswordChangednull = () => {
  return async dispatch => {
    dispatch({
      type: NewpasswordChanged2,
      changedPassword: '',
      Message: '',
    });
  };
};

export const filteredcatdata = data => {
  try {
    return async dispatch => {
      dispatch({
        type: CARTDataDelete,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const cleancart = () => {
  try {
    return async dispatch => {
      dispatch({
        type: CleanCartData,
        payload: [],
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const storerestrauntid = id => {
  try {
    return async dispatch => {
      dispatch({
        type: Store_RestrauntId,
        payload: id,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const storecartprice = price => {
  try {
    return async dispatch => {
      dispatch({
        type: Cart_CURRENTPRICE,
        payload: price,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const storecartdata = data => {
  try {
    return async dispatch => {
      dispatch({
        type: STORE_Cart_DATA,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const savemenucategoryoptiondetailsdata = data => {
  try {
    return async dispatch => {
      dispatch({
        type: Menu_OptionDetails,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatedmenuselection = data => {
  try {
    return async dispatch => {
      dispatch({
        type: Menu_Selection_Updated,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const getrestrauntmenubyid = id => {
  try {
    return async dispatch => {
      const result = await fetch(
        API_URl + 'Customer/Restaurant/Branch/' + id + '/Menu',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await result.json();

      let data = json.Result;
      let arr = [];
      for (const key in data) {
        if (key == 0) {
          data[key]['visible'] = true;
        } else {
          data[key]['visible'] = false;
        }
        for (const index in data[key].Items) {
          if (data[key].Items[index]?.MenuItemOptions.length > 0) {
            for (const i in data[key].Items[index]?.MenuItemOptions) {
              if (
                data[key].Items[index]?.MenuItemOptions[i].MenuItemOptionValues
                  .length > 0
              ) {
                //console.log("menuitemlength" + data[key].Items[index]?.MenuItemOptions[i].MenuItemOptionValues.length)
                for (const j in data[key].Items[index]?.MenuItemOptions[i]
                  ?.MenuItemOptionValues) {
                  // console.log("-------------------------------------------")
                  // console.log(data[key]?.Items[index]?.MenuItemOptions[i]?.MenuItemOptionValues[j].Price)
                  data[key].Items[index].MenuItemOptions[
                    i
                  ].MenuItemOptionValues[j]['selected'] = false;
                }
              }
            }
          }
        }
      }
      console.log('getrestrauntmenubyiddata' + JSON.stringify(data));
      // console.log('getrestrauntmenubyid' + JSON.stringify(arr));

      if (json.Status == 'Success') {
        dispatch({
          type: GET_MenuBYID,
          payload: data,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getpopularcategoriesbyid = id => {
  try {
    return async dispatch => {
      const result = await fetch(
        API_URl + 'Customer/Restaurant/Branch/' + id + '/PopularCategories',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await result.json();
      console.log('getpopularcategoriesbyid' + JSON.stringify(json.Result));

      if (json.Status == 'Success') {
        dispatch({
          type: GET_PopularCategoriesBYID,
          payload: json.Result,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getallrestrauntsbyid = (id, token) => {
  try {
    return async dispatch => {
      const result = await fetch(
        API_URl + 'Customer/Restaurant/Branch/' + id + '/Details',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await result.json();
      console.log(' this was the token' + token);
      console.log('getallrestrauntsbyid -- new' + JSON.stringify(json.Result));

      if (json.Status == 'Success') {
        dispatch({
          type: GET_allRestrauntsByID,
          payload: json.Result[0],
          payloadorigin: json.Result[0].Origin,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const updaterestraunts = data => {
  try {
    return async dispatch => {
      dispatch({
        type: GET_allRestrauntsUpdates,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getallrestraunts = (lat, long) => {
  try {
    return async dispatch => {
      const result = await fetch(API_URl + 'Customer/Restaurant/GetAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Paging: {
            Search: '',
            PageNumber: 1,
            PageSize: 10,
          },
          "Latitude": lat,
          "Longitude": long
          // Latitude: 24.8581087,
          // Longitude: 67.0605057,
        }),
      });

      const json = await result.json();
      console.log(lat + 'lat');
      console.log(long + 'long');
      console.log('getallrestraunts' + JSON.stringify(json.Result));

      let data = [...json.Result];
      for (const index in data) {
        data[index]['expanded'] = false;
      }
      if (json.Status == 'Success') {
        dispatch({
          type: GET_allRestraunts,
          payload: data,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const seticonfocus = icon => {
  try {
    return async dispatch => {
      if (icon == 'home') {
        dispatch({
          type: set_IconFocus,
          home: 'true',
          booking: 'false',
          setting: 'false',
        });
      } else if (icon == 'booking') {
        dispatch({
          type: set_IconFocus,
          home: 'false',
          booking: 'true',
          setting: 'false',
        });
      }
      if (icon == 'setting') {
        dispatch({
          type: set_IconFocus,
          home: 'false',
          booking: 'false',
          setting: 'true',
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const MyCoupons = AuthToken => {
  console.log(AuthToken, 'MyCouponsMyCouponsMyCouponsMyCoupons');
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken} `);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Restaurant/${0}/Coupon`,
        requestOptions,
      );
      json = await result.json();

      if (json.Status == 'Success') {
        console.log(json?.Result);
        dispatch({
          type: couponsCart,
          payloadcoupon: json?.Result,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const Myorders = AuthToken => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken} `);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `Customer/Order/ByRestaurant/0`,
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'LOGIN LOGIN LOGIN');

      if (json.Status == 'Success') {
        console.log(json?.Result);
        dispatch({
          type: OrderList,
          payloadorder: json?.Result.Ongoing,
          payloadPastorder: json?.Result.Past,
        });

        console.log('Success');
      } else if (json?.Status == 'Error') {
        console.log(json?.Message, 'EROORRR');
        // dispatch({
        //   type: Login_User,
        //   payload: '',
        //   payloadtoken: '',
        //   payloadCustomer: '',
        //   LoadLoginStatus: json?.Status,
        // });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const Contactus = () => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + 'BusinessSetting/Master',
        requestOptions,
      );
      json = await result.json();
      if (json.Status == 'Success') {
        console.log(json?.Result);

        dispatch({
          type: Contactusdetails,
          PayloadContactus: json?.Result,
        });

        console.log('Success');
      } else if (json?.Status == 'Error') {
        console.log(json?.Message, 'EROORRR');
        // dispatch({
        //   type: Login_User,
        //   payload: '',
        //   payloadtoken: '',
        //   payloadCustomer: '',
        //   LoadLoginStatus: json?.Status,
        // });
      }
    };
  } catch (error) {}
};

export const GetProfile = AuthToken => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const result = await fetch(
        API_URl + `customer/account/profile`,
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'Hello ,HELLO');
      if (json.Status == 'Success') {
        dispatch({
          type: GetUserProfiles,
          NamePayload: json?.Result.Name,
          ContactPayload: json?.Result.Contact,
          EmailPayload: json?.Result.Email,
          UserImagePayload: json?.Result.Logo,
        });

        console.log('Success');
      } else if (json?.Status == 'Error') {
        console.log(json?.Message, 'EROORRR');
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const logout = AuthToken => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken}`);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };
      const result = await fetch(
        API_URl + `Customer/Account/Logout`,
        requestOptions,
      );

      json = await result.json();

      if (json?.Status == 'Success') {
        dispatch({
          type: Logoutuser,
          LogoutSatusPayload: json?.Status,
          LogoutPayload: json?.Message,
        });
      } else if (json?.Status == 'Error') {
        dispatch({
          type: Logoutuser,
          LogoutSatusPayload: json?.Status,
          LogoutPayload: json?.Message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const ClearAsycn = () => {
  return async dispatch => {
    dispatch({
      type: AsynClear,
      //  PayloadAuth: '',
    });
  };
};

export const ProfileUpdate = (Name, EmailAddress, PhoneNumber, AuthToken) => {
  try {
    return async dispatch => {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${AuthToken}`);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        email: EmailAddress,
        firstName: Name,
        phoneNumber: PhoneNumber,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const result = await fetch(
        API_URl + `Customer/Account/Update`,
        requestOptions,
      );
      json = await result.json();
      console.log(json, 'Hello ,HELLO');

      if (json.Status == 'Success') {
        dispatch({
          type: UpdateProfile,
          UpdateProfileStatus: json?.Status,
          UpdateProfileStatusMessage: json?.Message,
        });
        console.log('Success');
      } else if (json?.Status == 'Error') {
        dispatch({
          type: UpdateProfile,
          UpdateProfileStatus: json?.Status,
          UpdateProfileStatusMessage: json?.Message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearstatusProfileupdate = () => {
  return async dispatch => {
    dispatch({
      type: clearStatusProfile,
      //  PayloadAuth: '',
    });
  };
};
export const CartDetails = cartdata => {
  return async dispatch => {
    console.log(cartdata, 'cart data cleaned');
    dispatch({
      type: DetailsCart,
      orderDetails: cartdata,
    });
  };
};
// export const ProfilePictureUpdate = response => {
//   try {
//     return async dispatch => {
//       var myHeaders = new Headers();
//       myHeaders.append('Authorization', `Bearer ${AuthToken}`);

//       var formdata = new FormData();
//       formdata.append('Image', fileInput.files[0], '/path/to/file');

//       var requestOptions = {
//         method: 'PUT',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow',
//       };
//       const result = await fetch(
//         API_URl + `Customer/Account/ProfilePicture`,
//         requestOptions,
//       );
//       json = await result.json();
//       console.log(json, 'Hello ,HELLO');

//       if (json.Status == 'Success') {
//         dispatch({
//           type: UpdateProfilePicture,
//           UpdateProfilePicStatus: json?.Status,
//           UpdateProfilePicStatusMessage: json?.Message,
//         });
//         console.log('Success');
//       } else if (json?.Status == 'Error') {
//         dispatch({
//           type: UpdateProfilePicture,
//           UpdateProfilePicStatus: json?.Status,
//           UpdateProfilePicStatusMessage: json?.Message,
//         });
//       }
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getblogshome = (lang) => {
//   try {
//     return async dispatch => {
//       const value = await AsyncStorage.getItem('AccessToken');
//       const result = await fetch(API_URl + 'v1/newsfeed', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer ' + JSON.parse(value),
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             "search": "",
//             "pageSize": 300000,
//             "pgno": 1,
//             "sortBy": 2,
//             "lang": lang,
//             "startDate": null,
//             "endDate": null
//         }),
//       });

//       const json = await result.json();
//       console.log('getblogshome' + JSON.stringify(json));

//       if (json.status == 'success') {
//         dispatch({
//           type: GetBlogsHome,
//           payload: json.newsfeeds,
//         });
//       }
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };
