import {
  RelationTypes,
  BookingDetails,
  DocumentTypes,
  Deletecustomerdocument,
  Updatepersonaldocument,
  clearpersonaldocument,
  LangHistoryBookings,
  Updated_Profile_Picture,
  Update_CustomerProfileImageReset,
  LangUpcomingBookings,
  BookingsHistory,
  ClearBookings,
  GetCoupons,
  HistoryIcrement,
  createpersonaldocument,
  cleardeleteddocument,
  UpcomingIcrement,
  set_Lang,
  set_IconFocus,
  suggession,
  Login,
  Logout,
  SignUp,
  ClearLogin,
  ClearSignUp,
  GetProfileInformation,
  ForgotPassword,
  ForgotPassworderase,
  VerifyOTP,
  ClearSuggession,
  VerifyOTPReset,
  ResentOTP,
  ClearOTPReset,
  NewPassword,
  NewPasswordReset,
  GetCustomerDocuments,
  Update_CustomerProfile,
  Update_CustomerProfileReset,
  Bookings,
  GetNewsFeeds,
  ClearNewsFeeds,
  GetNewsFeedDetail,
  NewsFeedCount,
  ClearNewsFeedCount,
  GetBlogs,
  GetBlogDetail,
  ClearBlogs,
  GetNotifications,
  ClearNotifications,
  ClearNotificationStatus,
  NotificationStatus,
  BlogsCount,
  ClearBlogsCount,
  NotificationCount,
  ClearNotificationCount,
  ChangePassword,
  ClearChangePassword,
  ClearSubmitcoupon,
  Submitcoupon,
  CancelSubmitcoupon,
  GetBanner,
  Getcategories,
  GetcategoriesBYID,
  ReadNotifications,
  NewNotificationCount,
  Getservicedetailsbyid,
  CreateBooking,
  ClearCreateBooking,
  GetPopularservicehome,
  GetallPopularservicehome,
  GetallPopularservicehomeclean,
  GetNewsFeedsHome,
  GetBlogsHome,
  ContactForm,
  ClearContact,
  BussinessSettings,
  AcceptReject,
  ClearAcceptReject,
  SendClientMessage,
  ClearSendClientMessage,
  UpdateMessage,
  BookingCancelRequest,
  BookingCancelRequestClear,
  ServiceRatings,
  ClearServiceRatings,
  UpdateBookingHistory,
  UpdateUpcomingBooking,
  ReadAllNotifications
} from '../Actions/actions';

const initialState = {
  documenttypes: [],
  relationtypes:[],
  Lang: "en",
  HomeIcon: "false",
  BookingIcon: "false",
  SettingIcon: "false",
    Login: '',
    SignUp: '',
    Logout: false,
    ProfileInfo: [],
    forgotpasswordresponse: '',
    forgotpasswordresponsestatus: '',
    OtpVerified: '',
    OtpRegenerated: '',
    newpasswordstatus: '',
    newpasswordmessage: '',
    personaldocuments: [],
    familydocuments: [],
    profileupdated: '',
    documentupdated: '',
    coupons: [],
documentdeleted: '',
bookingdata: [],
bookinghistorydata: [],
bookinddetailsdata: [{}],
profileimage: "",
profilemessage: '',
upcomingbookingscount: 1,
historybookingcount: 1,
destroyed: "",
 
    newsFeedsList: [],
    newsFeedDetail: {},
    newsFeedCount: 1,
    blogList: [],
    blogDetail: {},
    blogsCount: 1,
    notificationList: [],
    notificationStatus: '',
    notificationCount: 1,
    suggessionmessage: '',
    passwordupdated: '',
    couponcoderesponse: '',
    bannerarray: [],
    categories: [],
    categoryservices: [],
    newNotificationCount: 0,
    servicedetailsdata: [],
    createbookingresponse: '',
    createbookingresponsebookingnumber: '',
    popularservicedatahome: [],
    popularservicedata: [],
    newsfeedshomedata: [],
    blogsdatahome: [],
    contactformsubmissionsuccess: '',
    bussinesslist: [],
    quotationdetails: [],
    messagedata: [],
    acceptrejectdecision:'',
    clientmessage: '',
    bookcancelrequest: '',
    serviceratingsubmitted: ""

};

function userReducer(state = initialState, action) {
  switch (action.type) {
   
    
    case ReadAllNotifications:
      return {
        ...state,
        newNotificationCount: action.payload
      };

    case UpdateUpcomingBooking:
      return {
        ...state,
        bookingdata: action.payload
      };

    case UpdateBookingHistory:
      return {
        ...state,
        bookinghistorydata: action.payload
      };

    case ClearServiceRatings:
      return {
        ...state,
        serviceratingsubmitted: action.payload
      };


    case ServiceRatings:
      return {
        ...state,
        serviceratingsubmitted: action.payload
      };

    case BookingCancelRequestClear:
      return {
        ...state,
        bookcancelrequest: action.payload
      };
    
    case BookingCancelRequest:
      return {
        ...state,
        bookcancelrequest: action.payload
      };

    case UpdateMessage:
      return {
        ...state,
        messagedata: action.payload
      };

    case ClearSendClientMessage:
      return {
        ...state,
        clientmessage: action.payload
      };

    case SendClientMessage:
      return {
        ...state,
        clientmessage: action.payload
      };

    case ClearAcceptReject:
      return {
        ...state,
        acceptrejectdecision: action.payload
      };

    case AcceptReject:
      return {
        ...state,
        acceptrejectdecision: action.payload
      };
    
    case BussinessSettings:
      return {
        ...state,
        bussinesslist: action.payload
      };

    case ClearContact:
      return {
        ...state,
        contactformsubmissionsuccess: action.payload
      };

    case ContactForm:
      return {
        ...state,
        contactformsubmissionsuccess: action.payload
      };
      
    case GetBlogsHome:
      return {
        ...state,
        blogsdatahome: action.payload
      };
    case GetNewsFeedsHome:
      return {
        ...state,
        newsfeedshomedata: action.payload
      };


    case GetallPopularservicehomeclean:
      return {
        ...state,
        popularservicedata: []
      };
    
    case GetallPopularservicehome:
      return {
        ...state,
        popularservicedata: [...state.popularservicedata, ...action.payload]
      };


    case GetPopularservicehome:
      return {
        ...state,
        popularservicedatahome: action.payload,
      };

    case ClearCreateBooking:
      return {
        ...state,
        createbookingresponse: action.payload,
      };

    case CreateBooking:
      return {
        ...state,
        createbookingresponse: action.payload,
        createbookingresponsebookingnumber:  action.bookingno
      };

    case Getservicedetailsbyid:
      return {
        ...state,
        servicedetailsdata: action.payload,
      };

    case GetcategoriesBYID:
      return {
        ...state,
        categoryservices: action.payload,
      };


    case Getcategories:
      return {
        ...state,
        categories: action.payload,
      };

    case GetBanner:
      return {
        ...state,
        bannerarray: action.payload,
      };
    
    case CancelSubmitcoupon:
      return {
        ...state,
        couponcoderesponse: action.payload,
      };

    case ClearSubmitcoupon:
      return {
        ...state,
        couponcoderesponse: action.payload,
      };

    case Submitcoupon:
      return {
        ...state,
        couponcoderesponse: action.payload,
      };

    case ClearChangePassword:
      return {
        ...state,
        passwordupdated: action.payload,
      };


    case ChangePassword:
      return {
        ...state,
        passwordupdated: action.payload,
      };

    case ClearSuggession:
      return {
        ...state,
        suggessionmessage: action.payload,
      };

    case suggession:
      return {
        ...state,
        suggessionmessage: action.payload,
      };
  
    case GetCoupons:
      return {
        ...state,
        coupons: action.payload,
      };

    case ClearBookings:
      return {
        ...state,
        bookingdata: [],
        bookinghistorydata: [],
        historybookingcount: 1,
        upcomingbookingscount: 1,
        destroyed: "true"
      };

      

      case HistoryIcrement:
        return {
          ...state,
          historybookingcount: action.payload,
        };
  
    
    case UpcomingIcrement:
      return {
        ...state,
        upcomingbookingscount: action.payload,
      };

    case Update_CustomerProfileImageReset:
      return {
        ...state,
        profilemessage: action.payload,
      };

    case Updated_Profile_Picture:
      return {
        ...state,
        profileimage: action.payloadimage,
        profilemessage: action.payloadmessage,
      };

    case BookingDetails:
      return {
        ...state,
        bookinddetailsdata: action.payload,
        quotationdetails: action.quotation,
        messagedata: action.messagesdata
      };

    case Bookings:
      return {
        ...state,
        bookingdata: [...state.bookingdata, ...action.payload],
        
      };
      case LangUpcomingBookings:
        return {
          ...state,
          bookingdata: action.payload,
        };
      
        case BookingsHistory:
          return {
            ...state,
            bookinghistorydata: [...state.bookinghistorydata, ...action.payload]
        
          };
      
        case LangHistoryBookings:
          return {
            ...state,
            bookinghistorydata: action.payload,
          
          };
        
    case cleardeleteddocument:
      return {
        ...state,
        documentdeleted: action.payload,
     
      };


    case Deletecustomerdocument:
      return {
        ...state,
        documentdeleted: action.payload,
     
      };

    case clearpersonaldocument:
      return {
        ...state,
        documentupdated: action.payload,
     
      };

      

      case createpersonaldocument:
        return {
          ...state,
          documentupdated: action.payload,
       
        };
    case Updatepersonaldocument:
      return {
        ...state,
        documentupdated: action.payload,
     
      };

    case RelationTypes:
      return {
        ...state,
        relationtypes: action.payload,
     
      };

    case DocumentTypes:
      return {
        ...state,
        documenttypes: action.payload,
     
      };

    case Update_CustomerProfileReset:
      return {
        ...state,
        profileupdated: action.payload,
     
      };

    case Update_CustomerProfile:
      return {
        ...state,
        profileupdated: action.payload,
     
      };

  case GetCustomerDocuments:
    return {
      ...state,
      personaldocuments: action.personal,
      familydocuments: action.family,
    };

    case NewPasswordReset:
      return {
        ...state,
        newpasswordstatus: action.payload,
        newpasswordmessage: action.payload,
      };

    case NewPassword:
      return {
        ...state,
        newpasswordstatus: action.status,
        newpasswordmessage: action.payload,
      };

    case ClearOTPReset:
      return {
        ...state,
        OtpRegenerated: action.payload,
      };

    case ResentOTP:
      return {
        ...state,
        OtpRegenerated: action.payload,
      };

    case VerifyOTPReset:
      return {
        ...state,
        OtpVerified: action.payload,
      };

    case VerifyOTP:
      return {
        ...state,
        OtpVerified: action.payload,
      };
    case ForgotPassword:
      return {
        ...state,
        forgotpasswordresponse: action.payload,
        forgotpasswordresponsestatus: action.status,
      };
      case ForgotPassworderase:
        return {
          ...state,
          forgotpasswordresponse: action.payload,
          forgotpasswordresponsestatus: action.payload,
        };

      
    case set_IconFocus:
      return {
        ...state,
        HomeIcon: action.home,
        BookingIcon: action.booking,
        SettingIcon: action.setting,
     
      };

    case set_Lang:
      return {
        ...state,

        Lang: action.payload,
     
      };

      case Login:
        return {
          ...state,
          Login: action.payload,
        };
      case Logout:
        return {
          ...state,
          Logout: action.payload,
        };

      case SignUp:
        return {
          ...state,
          SignUp: action.payload,
        };

        case ClearLogin:
          return {
            ...state,
            Login: action.payload,
          };
          case ClearSignUp:
          return {
            ...state,
            SignUp: action.payload,
          };

          case GetProfileInformation:
            return {
              ...state,
              ProfileInfo: action.payload,
              profileimage: action.payloadimage,
            };

      case GetNewsFeeds:
        return {
          ...state,
          newsFeedsList: [...state.newsFeedsList, ...action.newsFeedsList],
        };
      case GetNewsFeedDetail:
        return {
          ...state,
          newsFeedDetail: action.newsFeedDetail,
        };
      case ClearNewsFeeds:
        return {
          ...state,
          newsFeedsList: [],
        };
      case NewsFeedCount:
        return {
          ...state,
          newsFeedCount: action.newsFeedCount,
        };
      case ClearNewsFeedCount:
        return {
          ...state,
          newsFeedCount: 1,
          newsFeedsList: [],
        };

      case GetBlogs:
        return {
          ...state,
          blogList: [...state.blogList, ...action.blogList],
        };
      case GetBlogDetail:
        return {
          ...state,
          blogDetail: action.blogDetail,
        };
      case ClearBlogs:
        return {
          ...state,
          blogList: [],
        };
      case BlogsCount:
        return {
          ...state,
          blogsCount: action.blogsCount,
        };
      case ClearBlogsCount:
        return {
          ...state,
          blogsCount: 1,
          blogList: [],
        };

      case GetNotifications:
        return {
          ...state,
          notificationList: [...state.notificationList, ...action.notificationList],
        };
      case ClearNotifications:
        return {
          ...state,
          notificationList: [],
        };

      case NotificationStatus:
        return {
          ...state,
          notificationStatus: action.payload,
        };
      case ClearNotificationStatus:
        return {
          ...state,
          notificationStatus: action.payload,
        };
      case NotificationCount:
        return {
          ...state,
          notificationCount: action.notificationCount,
        };
      case ClearNotificationCount:
        return {
          ...state,
          notificationCount: 1,
          notificationList: [],
        };
      case ReadNotifications:
        return {
          ...state,
          notificationList: action.notificationList,
        };
      case NewNotificationCount:
        return {
          ...state,
          newNotificationCount: action.newNotificationCount,
        };
    default:
      return state;
  }
}

export default userReducer;
