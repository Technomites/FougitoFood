import * as React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar barStyle={props?.barStyle} /> : null;
}

export default FocusAwareStatusBar;
