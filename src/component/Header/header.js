import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from "react-native";
import { theme } from "../../constants/styles";
// import { SvgIcons } from "../../constants/svgIcons";

const Header = ( props ) => {
    return (
        <View style={[styles.headerMain, props.customHeaderStyle]}>
            <StatusBar backgroundColor={props.statusBarColor} translucent />
            <View style={{flexDirection:"row"}}>
                {props.backArrow ? 
                    <TouchableOpacity 
                        activeOpacity={.7}
                        onPress={props.backPage}
                        style={styles.backIconMain}
                    >
                        {/* <SvgIcons.BackIcon /> */}
                    </TouchableOpacity>
                :
                    null
                }
                <View style={{flex:2,alignItems:"flex-start",justifyContent:"center"}}>
                    <Text style={styles.headerHeading}>
                        {props.title}
                    </Text>
                </View>
                {props.cartIcon ? 
                    <TouchableOpacity 
                        activeOpacity={.7}
                        onPress={() => navigation.navigate("Cart")} 
                        style={{flex:.2,alignItems:"flex-end",justifyContent:"center"}}
                    >
                        {/* <SvgIcons.CartIcon /> */}
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>
                                {cartQuantity}
                            </Text>
                        </View>
                    </TouchableOpacity>
                :
                    null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backIconMain: {
        // flex: .2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#FFF",
        height: 35,
        width: 35,
    },
    headerMain: {
        backgroundColor: theme.color.white,
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
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

export default Header;