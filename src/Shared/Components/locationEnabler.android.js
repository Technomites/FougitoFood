import LocationEnabler from 'react-native-location-enabler';

const  {
    PRIORITIES: { HIGH_ACCURACY },
    useLocationSettings,
  } = LocationEnabler;
  


 

export async function request() {
    const [enabled, requestResolution] = useLocationSettings(
        {
          priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
          alwaysShow: true, // default false
          needBle: true, // default false
        },
        false /* optional: default undefined */
    
       
      );
 requestResolution()


 return enabled;

}