import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontFamily } from "../../constants/fonts";
import { theme } from "../../constants/styles";

const CustomButton = ( props ) => {
    return (
        <TouchableOpacity
            activeOpacity={props.activeOpacity}
            onPress={props.onPress}
            style={[styles.buttonMain, props.customButtonStyle]}
        >
            <Text style={[styles.buttonText, props.customButtonTextStyle]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonMain: {
        backgroundColor: theme.color.primaryColor,
        borderRadius: 6,
        marginBottom: 20,
        paddingVertical: 14,
        borderWidth: 1,
        justifyContent: "center",
        borderColor: theme.color.primaryColor,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 23,
    },
    buttonText: {
        fontFamily: FontFamily.regularFont,
        color: theme.color.white,
        fontSize: 14,
        textAlign: "center",
    },
})

export default CustomButton;
