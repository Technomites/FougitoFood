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

const API_URl = 'https://api.fougitodemo.com/api/';
// const API_URl = 'http://192.168.18.119:45460/api/';

const header1 = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};



export const filteredcatdata = (data) => {
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

export const storerestrauntid = (id) => {
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


export const storecartprice = (price) => {
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

export const storecartdata = (data) => {
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

export const savemenucategoryoptiondetailsdata = (data) => {
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

export const updatedmenuselection = (data) => {
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
export const getrestrauntmenubyid = (id) => {
  try {
   
    return async dispatch => {
    
      const result = await fetch(API_URl + "Customer/Restaurant/Branch/" + id  + "/Menu", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      });

      const json = await result.json();
    
      let data = json.Result
     let arr = []
   for (const key in data){
    if (key == 0){
      data[key]['visible'] = true; 
    }else{
      data[key]['visible'] = false; 
    }
    for (const index in data[key].Items){
      if(data[key].Items[index]?.MenuItemOptions.length > 0){
        for (const i in data[key].Items[index]?.MenuItemOptions){
        
          if(data[key].Items[index]?.MenuItemOptions[i].MenuItemOptionValues.length > 0){
            //console.log("menuitemlength" + data[key].Items[index]?.MenuItemOptions[i].MenuItemOptionValues.length)
          for (const j in data[key].Items[index]?.MenuItemOptions[i]?.MenuItemOptionValues){
          // console.log("-------------------------------------------")
            // console.log(data[key]?.Items[index]?.MenuItemOptions[i]?.MenuItemOptionValues[j].Price)
            data[key].Items[index].MenuItemOptions[i].MenuItemOptionValues[j]['selected'] = false; 
      
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

  export const getpopularcategoriesbyid = (id) => {
    try {
     
      return async dispatch => {
      
        const result = await fetch(API_URl + "Customer/Restaurant/Branch/" + id  + "/PopularCategories", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        
        });
  
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

  export const getallrestrauntsbyid = (id) => {
    try {
     
      return async dispatch => {
      
        const result = await fetch(API_URl + "Customer/Restaurant/Branch/" + id  + "/Details", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        
        });
  
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

export const updaterestraunts = (data) => {
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
          "Paging": {
            "Search": "",
            "PageNumber": 1,
            "PageSize": 10
          },
          // "Latitude": lat,
          // "Longitude": long
          "Latitude": 24.8581087,
          "Longitude":67.0605057
        }),
      });

      const json = await result.json();
      console.log(lat + "lat")
  console.log(long + "long")
      console.log('getallrestraunts' + JSON.stringify(json.Result));
   
    let data = [...json.Result]
    for (const index in data){
      data[index]["expanded"] = false;
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

