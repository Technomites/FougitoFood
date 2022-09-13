import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

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
export const Restraunt_Distance = 'Restraunt_Distance';
export const StoreToken = 'StoreToken';
export const RESTRAUNTBASIC = 'RESTRAUNTBASIC';
export const PICKUPState = 'PICKUPState';
export const CreateOrder = 'CreateOrder';

const API_URl = 'https://api.fougitodemo.com/api/';
// const API_URl = 'http://192.168.18.119:45460/api/';

const header1 = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
};




export const createorder = (data) => {
  try {
    console.log('placeorder');
    return async dispatch => {
    
      const result = await fetch(API_URl + 'Customer/Restaurant/PlaceOrder', {
        method: 'POST',
        headers: {
          // Authorization: 'Bearer ' + JSON.parse(token),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          data

        ),
      });

      const json = await result.json();
      console.log('postserviceratings' + JSON.stringify(json));

      if (json.status === "success"){
        dispatch({
          type: CreateOrder,
          payload: "success",
        });
      }
     
      
    };
  } catch (error) {
    console.log(error);
  }
};


export const pickupstate = (bool) => {
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

export const storerestrauntbasicdata = (data) => {
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

export const storetoken = (token) => {
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
export const storedistance = (distance) => {
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
          type: OTP_Verify2,
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
      console.log(number, 'numbernumbernumbernumbernumber number');
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
      payloadVerify: json?.Status,
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

export const getallrestrauntsbyid = id => {
  try {
    return async dispatch => {
      const result = await fetch(
        API_URl + 'Customer/Restaurant/Branch/' + id + '/Details',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await result.json();
      console.log('getallrestrauntsbyid' + JSON.stringify(json.Result));

      if (json.Status == 'Success') {
        dispatch({
          type: GET_allRestrauntsByID,
          payload: json.Result[0],
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
          // "Latitude": lat,
          // "Longitude": long
          Latitude: 24.8581087,
          Longitude: 67.0605057,
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
