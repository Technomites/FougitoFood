import React from "react";
import {View, SafeAreaView, StatusBar, StyleSheet} from "react-native";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const CustomStatusBar = (props) => {
    return (
        <View style={[styles.statusBar, {backgroundColor:props.backgroundColor}]}>
            <SafeAreaView>
                <StatusBar 
                    translucent 
                    barStyle={props.barStyle}
                    backgroundColor={props.backgroundColor}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
})

export default CustomStatusBar;
