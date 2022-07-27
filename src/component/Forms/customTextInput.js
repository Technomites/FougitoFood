import React, { useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontFamily } from "../../constants/fonts";

const CustomTextInput = (props) => {
    return (
        <>
            <TextInput
                style={[styles.inputStyle, props.customStyle]}
                multiline={props.multiline}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                value={props.value}
                editable={props.editable}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                maxLength={props.maxLength}
            />
            <View>
                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        height: 45,
        paddingHorizontal: 18,
        justifyContent: "center",
    },
    placeholderStyle: {
        color: "#A8A8A8",
        fontFamily: FontFamily.lightFont,
        fontSize: 10,
        opacity: .7,
    },
})

export default CustomTextInput
