import { useEffect } from 'react';
import LocationEnabler from 'react-native-location-enabler';

const  {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
  } = LocationEnabler;
  


 

// export function request(){   
//   console.log("requestinggg android")
//   // const [enabled, requestResolution] = useLocationSettings(
//   //   {
//   //     priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
//   //     alwaysShow: true, // default false
//   //     needBle: true, // default false
//   //   },
//   //   false /* optional: default undefined */

   
//   // )


 

// }

export function LocationSettings() {
 
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */

   
  )
  function request() {
    console.log("requestinggg android hook")
    requestResolution()
  }

  return { enabled, request };
}




// export default function locationEnabler(props) {
//   console.log("requestinggg android")
//  const [enabled, requestResolution] = useLocationSettings(
//       {
//         priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
//         alwaysShow: true, // default false
//         needBle: true, // default false
//       },
//       false /* optional: default undefined */
  
     
//     );
   

//      function request() {
//       console.log("requestinggg android only")
    
    
//     }

// }


