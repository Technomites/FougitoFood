import qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

export const createpersonaldocument = 'createpersonaldocument';
export const clearpersonaldocument = 'clearpersonaldocument';
export const cleardeleteddocument = 'cleardeleteddocument';
export const Updatepersonaldocument = 'Updatepersonaldocument';
export const LangUpcomingBookings = 'LangUpcomingBookings';
export const LangHistoryBookings = 'LangHistoryBookings';
export const UpdatepersonaldocumentNoImage = 'UpdatepersonaldocumentNoImage';
export const Deletecustomerdocument = 'Deletecustomerdocument';
export const Updated_Profile_Picture = 'Updated_Profile_Picture';
export const Update_CustomerProfileImageReset = 'Update_CustomerProfileImageReset';
export const Bookings = 'Bookings';
export const BookingsHistory = 'BookingsHistory';
export const UpcomingIcrement = 'UpcomingIcrement';
export const HistoryIcrement = 'HistoryIcrement';
export const ClearBookings = 'ClearBookings'
export const GetCoupons = 'GetCoupons'
export const BookingDetails = 'BookingDetails';
export const RelationTypes = 'RelationTypes';
export const DocumentTypes = 'DocumentTypes';
export const set_Lang = 'set_Lang';
export const set_IconFocus = 'set_IconFocus';
export const Login = 'Login';
export const Logout = 'Logout';
export const SignUp = 'SignUp';
export const ClearLogin = 'ClearLogin';
export const ClearSignUp = 'ClearSignUp';
export const GetProfileInformation = 'GetProfileInformation';
export const Createsession = 'Createsession';
export const ForgotPassword = 'ForgotPassword';
export const ForgotPassworderase = 'ForgotPassworderase';
export const VerifyOTP = 'VerifyOTP';
export const VerifyOTPReset = 'VerifyOTPReset';
export const ResentOTP = 'ResentOTP';
export const ClearOTPReset = 'ClearOTPReset';
export const NewPassword = 'NewPassword';
export const NewPasswordReset = 'NewPasswordReset';
export const GetCustomerDocuments = 'GetCustomerDocuments';
export const Update_CustomerProfile = 'Update_CustomerProfile';
export const Update_CustomerProfileReset = 'Update_CustomerProfileReset';
export const GetNewsFeeds = 'GetNewsFeeds';
export const GetNewsFeedDetail = 'GetNewsFeedDetail';
export const ClearNewsFeeds = 'ClearNewsFeeds';
export const NewsFeedCount = 'NewsFeedCount';
export const ClearNewsFeedCount = 'ClearNewsFeedCount';
export const GetBlogs = 'GetBlogs';
export const suggession = 'suggession';
export const GetBlogDetail = 'GetBlogDetail';
export const ClearBlogs = 'ClearBlogs';
export const BlogsCount = 'BlogsCount';
export const ClearBlogsCount = 'ClearBlogsCount';
export const GetNotifications = 'GetNotifications';
export const ClearNotifications = 'ClearNotifications';
export const ReadNotifications = 'ReadNotifications';
export const NotificationStatus = 'NotificationStatus';
export const ClearNotificationStatus = 'ClearNotificationStatus';
export const NotificationCount = 'NotificationCount';
export const ClearNotificationCount = 'ClearNotificationCount';
export const NewNotificationCount = 'NewNotificationCount';
export const GetBanner = 'GetBanner';
export const Getcategories = 'Getcategories';
export const GetcategoriesBYID = 'GetcategoriesBYID';
export const Getservicedetailsbyid = 'Getservicedetailsbyid';
export const CreateBooking = 'CreateBooking';
export const ClearCreateBooking = 'ClearCreateBooking';
export const GetPopularservicehome = 'GetPopularservicehome';
export const GetallPopularservicehome = 'GetallPopularservicehome';
export const GetallPopularservicehomeclean = 'GetallPopularservicehomeclean';
export const GetNewsFeedsHome = 'GetNewsFeedsHome';
export const GetBlogsHome = 'GetBlogsHome';
export const ContactForm = 'ContactForm';
export const ClearContact = 'ClearContact';
export const BussinessSettings = 'BussinessSettings';
export const AcceptReject = 'AcceptReject';
export const ClearAcceptReject = 'ClearAcceptReject';
export const SendClientMessage = 'SendClientMessage';
export const ClearSendClientMessage = 'ClearSendClientMessage';
export const UpdateMessage = 'UpdateMessage';
export const BookingCancelRequest = 'BookingCancelRequest';
export const BookingCancelRequestClear = 'BookingCancelRequestClear';
export const ServiceRatings = 'ServiceRatings';
export const ClearServiceRatings = 'ClearServiceRatings';
export const UpdateBookingHistory = 'UpdateBookingHistory';
export const UpdateUpcomingBooking = 'UpdateUpcomingBooking';
export const ReadAllNotifications = 'ReadAllNotifications';

const API_URl = 'https://staging.oro24facilities.com/api/';
// const API_URl = 'http://192.168.18.119:45460/api/';

const header1 = {
  'Content-Type': 'application/x-www-form-urlencoded',
};




export const readallnotifications = () => {
    try {
      console.log('readallnotifications');
      return async dispatch => {
        const value = await AsyncStorage.getItem('AccessToken');
        const result = await fetch(API_URl + 'v1/notifications/read', {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + JSON.parse(value),
            'Cookie': '_culture=en-ae',
          },
        });
  
        const json = await result.json();
        console.log('readallnotifications' + JSON.stringify(json));
  
        if (json.status == 'success') {
          dispatch({
            type: ReadAllNotifications,
            payload: 0,
          });
        } 
      };
    } catch (error) {
      console.log(error);
    }
  };

export const updateupcomingbookingdata = (data) => {
  try {
    return async dispatch => {
      dispatch({
        type: UpdateUpcomingBooking,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};


export const updatebookinghistorydata = (data) => {
  try {
    return async dispatch => {
      dispatch({
        type: UpdateBookingHistory,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearserviceratingrespnse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearServiceRatings,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const postserviceratings = (ServiceID, ServiceBookingID, Rating, Remarks ) => {
  try {
    console.log('postserviceratings');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/ratings', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        ServiceID: ServiceID,
        ServiceBookingID: ServiceBookingID,
        Rating: Rating,
        Remarks: Remarks

        }),
      });

      const json = await result.json();
      console.log('postserviceratings' + JSON.stringify(json));

      if (json.status === "success"){
        dispatch({
          type: ServiceRatings,
          payload: "success",
        });
      }else{
        dispatch({
          type: ServiceRatings,
          payload: "error",
        });
      }
     
      
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearbookingcancelrequest = () => {
  try {
    return async dispatch => {
      dispatch({
        type: BookingCancelRequestClear,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const cancelrequest = (
reason, id
) => {
  try {
    console.log('cancelrequest');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/cancelbooking', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  BookingID: id,
  Reason: reason,
  Status: "Canceled"
        }),
      });

      const json = await result.json();
      console.log('cancelrequest' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: BookingCancelRequest,
          payload: 'success',
        });
      } else {
        dispatch({
          type: BookingCancelRequest,
          payload: 'error',
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const updatemessagearray = (data) => {
  try {
    return async dispatch => {
      dispatch({
        type: UpdateMessage,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearclientmessage = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearSendClientMessage,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

  export const sendclientmesaage = (message, id) => {
    try {
      console.log('sendclientmesaage');
      return async dispatch => {
        const value = await AsyncStorage.getItem('AccessToken');
        const result = await fetch(API_URl + 'v1/quotationnote', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + JSON.parse(value),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           quotationID: id,
           type: "Customer",
           quotationMessage: message
  
          }),
        });
  
        const json = await result.json();
        console.log('sendclientmesaage' + JSON.stringify(json));
  
        if (json.status === "success"){
          dispatch({
            type: SendClientMessage,
            payload: "success",
          });
        }else{
          dispatch({
            type: SendClientMessage,
            payload: "error",
          });
        }
       
        
      };
    } catch (error) {
      console.log(error);
    }
  };



export const clearacceptrectresponse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearAcceptReject,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const acceptandrejectdiagnosis = (decision, id) => {
  try {
    console.log('acceptandrejectdiagnosis');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/quotationapproval', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          QuotationId: id,
          Status: decision

        }),
      });

      const json = await result.json();
      console.log('acceptandrejectdiagnosis' + JSON.stringify(json));

      if (json.status === "success"){
        dispatch({
          type: AcceptReject,
          payload: decision,
        });
      }else{
        dispatch({
          type: AcceptReject,
          payload: decision + "error",
        });
      }
     
      
    };
  } catch (error) {
    console.log(error);
  }
};
export const getbussinesssettings = (lang) => {
  try {
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/' + lang + '/businesssetting', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getbussinesssettings' + JSON.stringify(json.newsfeed.branches.branchName));

      if (json.status == 'success') {
        dispatch({
          type: BussinessSettings,
          payload: json.newsfeed.branches.branchName,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};  
export const clearcontactform = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearContact,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const submitcontactusform = (FirstName, number, Email, Message) => {
  try {
    console.log('submitcontactus');
    return async dispatch => {
 
      const result = await fetch(API_URl + 'v1/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: FirstName,
          Email: Email,
          Contact: number,
          Message: Message,
          Subject : "----"

        }),
      });

      const json = await result.json();
      console.log('submitsugession' + JSON.stringify(json));

   if(json.message == "Email sent successfully"){
    dispatch({
      type: ContactForm,
      payload: 200,
    });
   }else{
    dispatch({
      type: ContactForm,
      payload: 400,
    });
   }
     
      
    };
  } catch (error) {
    console.log(error);
  }
};

export const getblogshome = (lang) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/newsfeed', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "search": "",
            "pageSize": 300000,
            "pgno": 1,
            "sortBy": 2,
            "lang": lang,
            "startDate": null,
            "endDate": null
        }),
      });

      const json = await result.json();
      console.log('getblogshome' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetBlogsHome,
          payload: json.newsfeeds,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};  

export const getnewsfeedshome = (lang) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/events', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "search": "",
          "pageSize": 5,
          "pageNumber": 1,
          "sortBy": 1
        }),
      });

      const json = await result.json();
      console.log('getnewsfeedshome' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetNewsFeedsHome,
          payload: json.events,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};  

export const getallpopularservicesclean = () => {
  try {
    return async dispatch => {
      dispatch({
        type: GetallPopularservicehomeclean,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getallpopularservices = (lang, count, search) => {
  try {
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/' + lang + '/popularservices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "search": search,
          "pageSize": 10,
          "pageNumber": count,
          "sortBy": 1
        }),
      });

      const json = await result.json();
      console.log('getallpopularservices' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetallPopularservicehome,
          payload: json.popularServices,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};  
  export const getpopularserviceshome = (lang) => {
    try {
      return async dispatch => {
        const result = await fetch(API_URl + 'v1/' + lang + '/popularservices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "search": "",
            "pageSize": 5,
            "pageNumber": 1,
            "sortBy": 1
          }),
        });
  
        const json = await result.json();
        console.log('getpopularserviceshome' + JSON.stringify(json));
  
        if (json.status == 'success') {
          dispatch({
            type: GetPopularservicehome,
            payload: json.popularServices,
          });
        }
      };
    } catch (error) {
      console.log(error);
    }
  };  

export const clearbookingresponse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearCreateBooking,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const createbooking = (Image, data) => {
  try {
    return async dispatch => {
    console.log('createbooking started');
    console.log("hezssssllj" + JSON.stringify(Image))
let datavar =[]
    for (const key in Image){
      // console.log("hezllj" + Image[key].path)
      let item =[{
        // name: 'Image1',
       name: Image[key].name,
        filename: 'abc.jpg',
        type: Image[key].mime,
       data: RNFetchBlob.wrap(Image[key].path)
      }]
      datavar = [...datavar, ...item]
     
    }

    console.log("data" + JSON.stringify(datavar))
    const value = await AsyncStorage.getItem('AccessToken');
    const result = await RNFetchBlob.fetch(
      'POST',
      API_URl + 'v1/createbooking',

      {
        Authorization: 'Bearer ' + JSON.parse(value),
        'Content-Type': 'multipart/form-data',
      },

      [
     
          { name : 'bookingdetails', data : JSON.stringify(data[0])},

      ...datavar
      ],

    );


        
          const json = await result.json();
    
          console.log('createbooking' + JSON.stringify(json));
          if (json.status == 'success') {
            dispatch({
              type: CreateBooking,
              payload: json.status,
              bookingno: json.bookingno
            });
          }else{
            dispatch({
              type: CreateBooking,
              payload: "error",
              bookingno: ""
            });
          }
  }} catch (error) {
    console.log(error);
  }
};

export const getservicedetailsbyid = (Lang, id) => {
  try {
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/' +Lang + '/service/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getservicedetailsbyid' + JSON.stringify(json.serviceDetails));
 
      if (json.status == 'success') {
        dispatch({
          type: Getservicedetailsbyid,
          payload: json.serviceDetails,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getcategoriesbyid = (Lang, id) => {
  try {
    return async dispatch => {
      console.log("id" + id)
      const result = await fetch(API_URl + 'v1/' +Lang + '/services/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getcategoriesbyid' + JSON.stringify(json.services));
 
      if (json.status == 'success') {
        dispatch({
          type: GetcategoriesBYID,
          payload: json.services,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};


  export const getcategories = (Lang) => {
    try {
      return async dispatch => {
        const result = await fetch(API_URl + 'v1/' + Lang + '/getcategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const json = await result.json();
        console.log('getcategories' + JSON.stringify(json.categories));
   
        if (json.status == 'success') {
          dispatch({
            type: Getcategories,
            payload: json.categories,
          });
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

export const getbanner = () => {
  try {
    return async dispatch => {
      // const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/banners', {
        method: 'GET',
        headers: {
          // Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getbanner' + JSON.stringify(json.banners));
      let array = []
for (const key in json.banners){
  array = [...array, json.banners[key].image]
}
console.log("arrY" + JSON.stringify(array))
      if (json.status == 'success') {
        dispatch({
          type: GetBanner,
          payload: array,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};



export const cancelcouponrequest = (CouponCode, id) => {
  try {
    console.log('cancelcoupon');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/coupons/cancelredeemedcoupon', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CouponCode: CouponCode,
          ServiceBookingID: id

        }),
      });

      const json = await result.json();
      console.log('cancelcoupon' + JSON.stringify(json));

      if (json.status === "success"){
        dispatch({
          type: CancelSubmitcoupon,
          payload: "Coupon code removed successfully",
        });
      }else{
        dispatch({
          type: CancelSubmitcoupon,
          payload: json.message,
        });
      }
     
      
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearcouponresponse = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearSubmitcoupon,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const submitcoupon = (CouponCode, id) => {
  try {
    console.log('submitcoupon');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/coupons/redeem', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CouponCode: CouponCode,
          ServiceBookingID: id

        }),
      });

      const json = await result.json();
      console.log('submitcoupon' + JSON.stringify(json));

      if (json.status === "success"){
        dispatch({
          type: Submitcoupon,
          payload: "Coupon code added successfully",
        });
      }else{
        dispatch({
          type: Submitcoupon,
          payload: json.message,
        });
      }
     
      
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearpasswordupdated = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearChangePassword,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const changepassword = (oldpas, newpas) => {
  try {
    console.log('changepassword');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/changepassword', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CurrentPassword : oldpas,
    NewPassword : newpas

        }),
      });

      const json = await result.json();
      console.log('changepassword' + JSON.stringify(json));

   
        dispatch({
          type: ChangePassword,
          payload: json.message,
        });
      
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearsuggession = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearSuggession,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const submitsugession = (data) => {
  try {
    console.log('submitsugession');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/suggestions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Suggestion: data,

        }),
      });

      const json = await result.json();
      console.log('submitsugession' + JSON.stringify(json));

   
        dispatch({
          type: suggession,
          payload: json.message,
        });
      
    };
  } catch (error) {
    console.log(error);
  }
};

export const getcoupons = (lang) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/coupons/', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getcoupons' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetCoupons,
          payload: json.coupons,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const langbookingshistory = (lang, upcomingcount) => {
  try {
    console.log('bookingshistory');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/pastbookings?pg=' + upcomingcount, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('bookingshistory' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: LangHistoryBookings,
        payload: json.bookings
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const bookingshistory = (lang, upcomingcount) => {
  try {
    console.log('bookingshistory');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/pastbookings?pg=' + upcomingcount, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('bookingshistory' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: BookingsHistory,
        payload: json.bookings
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};


export const destroybookings = (count) => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearBookings,
        payload: [],
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const incrementupcomingbookingscount = (count) => {
  try {
    return async dispatch => {
      dispatch({
        type: UpcomingIcrement,
        payload: count,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const incrementhistorybookingscount = (count) => {
  try {
    return async dispatch => {
      dispatch({
        type: HistoryIcrement,
        payload: count,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearprofilemessage = () => {
  try {
    return async dispatch => {
      dispatch({
        type: Update_CustomerProfileImageReset,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const updateprofilepicture = picture => {

  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await RNFetchBlob.fetch(
        'PUT',
        API_URl + 'v1/customer/profile/photo',

        {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'multipart/form-data',
        },

        [
          {
            name: 'profile',
            filename: 'abc.jpg',
            type: picture.mime,

            data: RNFetchBlob.wrap(picture.path),
          },
        ],
      );

      const json = await result.json();
      console.log('updated picture' + JSON.stringify(json));

      if (json) {
        dispatch({
          type: Updated_Profile_Picture,
          payloadimage: json.image,
          payloadmessage: json.message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};


export const bookingdetailsinformation = (id) => {
  try {
    console.log('bookingdetailsinformation');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/bookingdetails/' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('bookingdetailsinformation' + JSON.stringify(json) + "json data");

      if (json.status == 'success') {
        dispatch({
          type: BookingDetails,
        payload: json?.booking,
        quotation: json?.quotation,
        messagesdata: json?.messages?.messages
        
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const bookingsinformation = (lang, upcomingcount) => {
  try {
    console.log('bookingsinformation');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/upcomingbookings?pg=' + upcomingcount, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('bookingsinformation' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: Bookings,
        payload: json.bookings
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const langbookingsinformation = (lang, upcomingcount) => {
  try {
    console.log('bookingsinformation');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/upcomingbookings?pg=' + upcomingcount, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('bookingsinformation' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: LangUpcomingBookings,
        payload: json.bookings
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const cleardocumentdeleted = () => {
  try {
    return async dispatch => {
      dispatch({
        type: cleardeleteddocument,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};


export const personaldocumentsupdatewithoutimage = ( documentdetails) => {
  try {
    return async dispatch => {
    
    const value = await AsyncStorage.getItem('AccessToken');
    const result = await RNFetchBlob.fetch(
      'PUT',
      API_URl + 'v1/updatedocuments',

      {
        Authorization: 'Bearer ' + JSON.parse(value),
        'Content-Type': 'multipart/form-data',
      },

      [
        { name : 'Image',
        filename: '',
        type: "",
        data: RNFetchBlob.wrap("")},
          { name : 'documentdetails', data : JSON.stringify(documentdetails[0])}

      ],
    );


        
          const json = await result.json();
    
          console.log('personaldocumentsupdate' + JSON.stringify(json));
          if (json.status == 'success') {
            dispatch({
              type: Updatepersonaldocument,
              payload: json.status,
            });
          }else{
            dispatch({
              type: Updatepersonaldocument,
              payload: "error",
            });
          }
  }} catch (error) {
    console.log(error);
  }
};

  export const deleteseleteddocument = (id) => {
    try {

      console.log('deletedocument');
      return async dispatch => {
        const value = await AsyncStorage.getItem('AccessToken');
        const result = await fetch(API_URl + 'v1/en/customerdocuments/' + id, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + JSON.parse(value),
            'Content-Type': 'application/json',
          },
        
        });
  
        const json = await result.json();
        console.log('deletedocument' + JSON.stringify(json));
  
        if (json.status == 'success') {
          dispatch({
            type: Deletecustomerdocument,
            payload: "200",
          });
        } else {
          dispatch({
            type: Deletecustomerdocument,
            payload: "error",
          });
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

export const personaldocumentscreate = (Image, documentdetails) => {
  try {
    return async dispatch => {
    console.log('personaldocumentsupdate started' + Image.mime);
    console.log('personaldocumentsupdate startedsssssssssss' + Image.path);
    const value = await AsyncStorage.getItem('AccessToken');
    const result = await RNFetchBlob.fetch(
      'POST',
      API_URl + 'v1/customerdocuments',

      {
        Authorization: 'Bearer ' + JSON.parse(value),
        'Content-Type': 'multipart/form-data',
      },

      [
          {
            name: 'Image',
            filename: 'abc.jpg',
            type: Image.mime,
            data: RNFetchBlob.wrap(Image.path),
          },
          { name : 'documentdetails', data : JSON.stringify(documentdetails[0])}

      ],
    );


        
          const json = await result.json();
    
          console.log('personaldocumentscreate' + JSON.stringify(json));
          if (json.status == 'success') {
            dispatch({
              type: createpersonaldocument,
              payload: json.status,
            });
          }else{
            dispatch({
              type: createpersonaldocument,
              payload: "error",
            });
          }
  }} catch (error) {
    console.log(error);
  }
};

export const cleardocumentupdated = () => {
  try {
    return async dispatch => {
      dispatch({
        type: clearpersonaldocument,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const personaldocumentsupdate = (Image, documentdetails) => {
  try {
    return async dispatch => {
    console.log('personaldocumentsupdate started' + Image.mime);
    console.log('personaldocumentsupdate ' + Image.path);
    const value = await AsyncStorage.getItem('AccessToken');
    const result = await RNFetchBlob.fetch(
      'PUT',
      API_URl + 'v1/updatedocuments',

      {
        Authorization: 'Bearer ' + JSON.parse(value),
        'Content-Type': 'multipart/form-data',
      },

      [
          {
            name: 'Image',
            filename: 'abc.jpg',
            type: Image.mime,
            data: RNFetchBlob.wrap(Image.path),
          },
          { name : 'documentdetails', data : JSON.stringify(documentdetails[0])}

      ],
    );


        
          const json = await result.json();
    
          console.log('personaldocumentsupdate' + JSON.stringify(json));
          if (json.status == 'success') {
            dispatch({
              type: Updatepersonaldocument,
              payload: json.status,
            });
          }else{
            dispatch({
              type: Updatepersonaldocument,
              payload: "error",
            });
          }
  }} catch (error) {
    console.log(error);
  }
};

export const getRelationTypes = (lang) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/relationships', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getRelationTypes' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: RelationTypes,
          payload: json.relations,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getDocumentTypes = (lang) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/doctypes', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('DocumentTypes' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: DocumentTypes,
          payload: json.documentTypes,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const clearprofileupdate = () => {
  try {
    return async dispatch => {
      dispatch({
        type: Update_CustomerProfileReset,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const postupdatedprofile = (
  FirstName,
  LastName,
  Name,
  Email,
  Address,
  Address2,
  PoBox,
  ZipCode,
  PassportNo,
  PassportExpiry,
  CnicNo,
  CnicExpiry,
  CustomerCity,
  Country,
) => {
  try {
    console.log('profile updation started');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');

      const result = await fetch(API_URl + 'v1/customer/profile', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: FirstName,
          LastName: LastName,
          Name: Name,
          Email: Email,
          Address: Address,
          Address2: Address2,
          PoBox: PoBox,
          ZipCode: ZipCode,
          PassportNo: PassportNo,
          PassportExpiry: PassportExpiry,
          CnicNo: CnicNo,
          CnicExpiry: CnicExpiry,
          CustomerCity: CustomerCity,
          Country: Country,
        }),
      });

      const json = await result.json();
      console.log('updated profile' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: Update_CustomerProfile,
          payload: 'success',
        });
      } else {
        dispatch({
          type: Update_CustomerProfile,
          payload: 'error',
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const resendcode = (number, pin) => {
  try {
    console.log('resendcode verification');
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/resendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Contact: number,
          PhoneCode: pin,
        }),
      });

      const json = await result.json();
      console.log('resendcode' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: ResentOTP,
          payload: json.status,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const resetotp = () => {
  try {
    return async dispatch => {
      dispatch({
        type: VerifyOTPReset,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const verifyotp = (number, otp, pin) => {
  try {
    console.log('otp verification');
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/otpverification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Contact: number,
          otp: otp,
          PhoneCode: pin,
        }),
      });

      const json = await result.json();
      console.log('otp verification' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: VerifyOTP,
          payload: '200',
        });
      } else {
        dispatch({
          type: VerifyOTP,
          payload: json.message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const changelang = lang => {
  try {
    return async dispatch => {
      dispatch({
        type: set_Lang,
        payload: lang,
      });
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

export const clearotpreset = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearOTPReset,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const eraselogin = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearLogin,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const erasesignup = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearSignUp,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const login = (code, email, password, deviceid) => {
  try {
    console.log('login');
    console.log('login--' + code);
    console.log('login--' + email);
    console.log('login--' + password);
    console.log('login--' + deviceid);
    return async dispatch => {
      const result = await fetch(API_URl + '/security/token', {
        method: 'POST',
        headers: header1,
        body: qs.stringify({
          grant_type: 'password',
          username: email,
          password: password,
          deviceId: deviceid,
          type: 'Customer',
          CountryCode: code,
        }),
      });

      const json = await result.json();
      console.log('Accesstoken' + JSON.stringify(json));

      if (json.access_token) {
        await AsyncStorage.setItem(
          'AccessToken',
          JSON.stringify(json.access_token),
        );
        await AsyncStorage.setItem('Password', password);
        dispatch({
          type: Login,
          payload: 200,
        });
      } else {
        dispatch({
          type: Login,
          payload: json.error_description,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const signUp = data => {
  try {
    console.log('SIGN UP DATA =====> ', data);
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          Email: data.Email,
          UserName: data.UserName,
          Password: data.Password,
          Contact: data.Contact,
          PhoneCode: data.PhoneCode,
        }),
      });

      const response = await result.json();
      console.log('RESPONSE =====> ', JSON.stringify(response));
      if (response.status === 'success') {
        dispatch({
          type: SignUp,
          payload: 200,
        });
      } else {
        dispatch({
          type: SignUp,
          payload: response.message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const logout = (DeviceID) => {
  try {
    console.log('DeviceID =====> ', DeviceID);
    return async dispatch => {
      const access_token = JSON.parse(await AsyncStorage.getItem('AccessToken'));
      const result = await fetch(API_URl + 'v1/logout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          DeviceID: DeviceID,
        }),
      });

      const response = await result.json();
      console.log("RESPONSE =====> ", JSON.stringify(response));
      if (response.status === "success") {
        AsyncStorage.setItem('AccessToken', "");
        dispatch({
          type: Login,
          payload: '',
        });
        dispatch({
          type: Logout,
          payload: true,
        });
      }

    };
  } catch (error) {
    console.log(error);
  }
};
export const eraselogout = () => {
  try {
    return async dispatch => {
      dispatch({
        type: Logout,
        payload: false,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getProfileInformation = () => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/customer/profile', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
      });

      const json = await result.json();
      console.log('getProfileInformation' + JSON.stringify(json.customer));

      if (json.status == 'success') {
        dispatch({
          type: GetProfileInformation,
          payload: json.customer,
          payloadimage: json.customer.logo,
          
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const createsession = (FirebaseToken, DeviceID) => {
  try {
    console.log('sesssion creation');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/sessions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirebaseToken: FirebaseToken,
          DeviceID: DeviceID,
          AccessToken: value,
        }),
      });

      const json = await result.json();
      console.log('sessionresponse' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: Createsession,
          payload: json,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const forgotpassword = (number, pin) => {
  try {
    console.log('forgot password');
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Contact: number,
          PhoneCode: pin,
        }),
      });

      const json = await result.json();
      console.log('forgot password response' + JSON.stringify(json));

      if (json) {
        dispatch({
          type: ForgotPassword,
          payload: json.message,
          status: json.status,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const forgotpasswordreset = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ForgotPassworderase,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const createnewpassword = (Contact, Password, OTP, PhoneCode) => {
  try {
    console.log('createnewpassword');
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Contact: Contact,
          Password: Password,
          OTP: OTP,
          PhoneCode: PhoneCode,
        }),
      });

      const json = await result.json();
      console.log('new-password  response' + JSON.stringify(json));

      if (json) {
        dispatch({
          type: NewPassword,
          payload: json.message,
          status: json.status,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const newpasswordreset = () => {
  try {
    return async dispatch => {
      dispatch({
        type: NewPasswordReset,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getcustomerdocuments = (lang) => {
  try {
    console.log('getcustomerdocuments');
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + 'v1/' + lang + '/documents', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('getcustomerdocuments' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetCustomerDocuments,
          personal: json.personal,
          family: json.family,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getNewsFeeds = (data, Lang) => {
  try {
    console.log("data =====> ", data);
    console.log("Lang =====> ", Lang);
    return async dispatch => {
      const result = await fetch(API_URl + `v1/${Lang}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const json = await result.json();
      console.log('NEWS FEED LIST =====> ' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetNewsFeeds,
          newsFeedsList: json.events,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const getNewsFeedDetail = (feedID, Lang) => {
  try {
    console.log("feedID", feedID);
    console.log("Lang", Lang);
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + `v1/${Lang}/events/${feedID}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('NEWS FEED RESPONSE =====> ' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetNewsFeedDetail,
          newsFeedDetail: json.newsfeed,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearNewsFeeds = () => {
  return async dispatch => {
    dispatch({
      type: ClearNewsFeeds,
      newsFeedsList: [],
    });
  };
};
export const newsFeedCountHandle = (count) => {
  return async dispatch => {
    dispatch({
      type: NewsFeedCount,
      newsFeedCount: count,
    });
  };
};
export const clearNewsFeedCount = () => {
  return async dispatch => {
    dispatch({
      type: ClearNewsFeedCount,
      newsFeedCount: 1,
    });
  };
};

export const getBlogs = (data) => {
  try {
    console.log('data =====> ' + JSON.stringify(data));
    return async dispatch => {
      const result = await fetch(API_URl + 'v1/newsfeed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const json = await result.json();
      console.log('NEWS FEED RESPONSE =====> ' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetBlogs,
          blogList: json.newsfeeds,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const getBlogDetail = (blogID, Lang) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(API_URl + `v1/${Lang}/newsfeed/${blogID}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('NEWS FEED RESPONSE =====> ' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: GetBlogDetail,
          blogDetail: json.newsfeed,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearBlogs = () => {
  return async dispatch => {
    dispatch({
      type: ClearBlogs,
      blogList: [],
    });
  };
};
export const blogsCountHandle = (count) => {
  return async dispatch => {
    dispatch({
      type: BlogsCount,
      blogsCount: count,
    });
  };
};
export const clearBlogsCount = () => {
  return async dispatch => {
    dispatch({
      type: ClearBlogsCount,
      blogsCount: 1,
    });
  };
};

export const getAllNotifications = (pageNumber, Lang, value) => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      console.log("JSON.parse(value)", JSON.parse(value));
      const result = await fetch(`${API_URl}v1/${Lang}/notifications?pg=${pageNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();

      console.log("RESPONSE =====> ", JSON.stringify(json.notifications))
      
      if (json.status == 'success') {
        json.notifications.forEach(object => {
          object.expanded = false;
        });
        dispatch({
          type: GetNotifications,
          notificationList: json.notifications,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const clearNotifications = () => {
  return async dispatch => {
    dispatch({
      type: ClearNotifications,
      notificationList: [],
    });
  };
};
export const addReadNotifications = (readList) => {
  return async dispatch => {
    dispatch({
      type: ReadNotifications,
      notificationList: readList,
    });
  };
};
export const updateNotificationStatus = (status) => {
  try {
    console.log('status =====> ' + JSON.stringify(status));
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(`${API_URl}v1/customer/pushnotification`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(value),
        },
        body: JSON.stringify({
          AllowPushNotification: status,
        })
      });

      const json = await result.json();
      console.log('NOTIFICATIONS RESPONSE =====> ' + JSON.stringify(json));

      if (json.status == 'success') {
        dispatch({
          type: NotificationStatus,
          payload: 200,
        });
      } else {
        dispatch({
          type: NotificationStatus,
          payload: json.message,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const eraseNotificationStatus = () => {
  try {
    return async dispatch => {
      dispatch({
        type: ClearNotificationStatus,
        payload: '',
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const notificationCountHandle = (count) => {
  return async dispatch => {
    dispatch({
      type: NotificationCount,
      notificationCount: count,
    });
  };
};
export const clearNotificationCount = () => {
  return async dispatch => {
    dispatch({
      type: ClearNotificationCount,
      notificationCount: 1,
    });
  };
};
export const readNotification = (id) => {
  try {
    console.log('id =====> ' + id);
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      const result = await fetch(`${API_URl}v1/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      console.log('NOTIFICATIONS RESPONSE =====> ' + JSON.stringify(json));

      // if (json.status == 'success') {
      //   dispatch({
      //     type: NotificationStatus,
      //     payload: 200,
      //   });
      // } else {
      //   dispatch({
      //     type: NotificationStatus,
      //     payload: json.message,
      //   });
      // }
    };
  } catch (error) {
    console.log(error);
  }
};
export const getNewNotificationCount = () => {
  try {
    return async dispatch => {
      const value = await AsyncStorage.getItem('AccessToken');
      console.log("JSON.parse(value)", JSON.parse(value));
      const result = await fetch(`${API_URl}v1/notifications/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(value),
        },
      });

      const json = await result.json();
      
      console.log('NOTIFICATIONS COUNT =====> ' + JSON.stringify(json.newNotifications));

      if (json.status == 'success') {
        dispatch({
          type: NewNotificationCount,
          newNotificationCount: json.newNotifications,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};


