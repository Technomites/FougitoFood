import React from "react"
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native"

const AuthButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={Styles.mainContainer}>
            <Text style={{ fontSize: 15, color: "white", fontWeight: "600" }}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const Styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: "100%",
        backgroundColor: '#AB8651',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        borderRadius: 10,



    }
})
export default AuthButton