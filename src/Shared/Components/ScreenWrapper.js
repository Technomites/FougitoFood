import React from 'react';
import {ImageBackground, SafeAreaView, StatusBar, View} from 'react-native';
import Animated from 'react-native-reanimated';

const ScreenWrapper = ({
  children,
  transclucent = false,
  scrollEnabled = false,
  backgroundImage,
  drawer,
  barStyle = 'light-content',
}) => {
  const content = () => {
    return (
      <Animated.View
        style={{
          flex: 1,
          ...drawer,
          backgroundColor: '#F6F6F6',
          overflow: 'hidden',
        }}>
        {children}
      </Animated.View>
    );
  };
  return backgroundImage ? (
    <ImageBackground
      source={backgroundImage}
      style={{flex: 1}}
      resizeMode={'cover'}>
      {content()}
    </ImageBackground>
  ) : (
    content()
  );
};

export default ScreenWrapper;
