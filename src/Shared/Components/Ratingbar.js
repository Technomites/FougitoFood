import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fontSize, scalableheight} from '../../Utilities/fonts';
export default function Ratingbar(props) {
  const [MaxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [DefaultRating, setDefaultRating] = useState(0);
  return (
    <View
      style={{
        width: '50%',
        //  height: scalableheight.ten,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      {MaxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}>
            {/* <Image
                resizeMode={'contain'}
                  style={{height: 35, width: 35}}
                  source={
                    item <= DefaultRating
                      ? starimagefilled
                      : starimageempty
                  }
                /> */}
            <FontAwesome
              style={{marginRight: scalableheight.pointeight}}
              name="star"
              size={fontSize.twentyfive}
              color={item <= DefaultRating ? '#E6C24D' : '#F5F5F5'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
