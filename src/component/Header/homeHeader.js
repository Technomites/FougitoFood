import React, {useState, useEffect} from "react";
import { StyleSheet, View, Image, TouchableOpacity, StatusBar } from "react-native";
import { theme } from "../../constants/styles";
import Fontisto from 'react-native-vector-icons/Fontisto';
import { fontSize, scalableheight } from '../../Utilities/fonts'
const HomeHeader = ( props ) => {
    return (
        <View style={styles.headerMain}>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity 
                    activeOpacity={.7}
                    onPress={props.leftIconPress}
                    style={{justifyContent:"center"}}
                >
                    <Image 
                        source={theme.images.toggle} 
                        style={{height:26,width:26,resizeMode:"contain"}}
                    />
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Image 
                        source={theme.images.homeLogo} 
                        style={{height:24,width:84,resizeMode:"contain"}}
                    />
                </View>
                <TouchableOpacity 
                    activeOpacity={.7}
                    onPress={props.rightIconPress}
                    style={{justifyContent:"center",backgroundColor:"#000"}}
                >
                    <Fontisto 
                        color={'#B10071'}
                        name="bell"
                        size={scalableheight.twentysix}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerMain: {
        backgroundColor: theme.color.white,
    },
    headerHeading: {
        color: theme.color.headingColor,
        fontSize: 20,
        textAlign: "left",
        textTransform: "capitalize",
    },
    circle: {
        position: "absolute",
        top: -8,
        right: -10,
        backgroundColor: theme.color.primaryColor,
        height: 15,
        width: 15,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    circleText: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "bold",
    }
})

export default HomeHeader;