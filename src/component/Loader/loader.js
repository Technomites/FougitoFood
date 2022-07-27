import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { theme } from "../../constants/styles";

const Loader = () => {
    return (
        <View style={styles.loaderOverlay}>
            <Image 
                source={theme.images.loader} 
                style={styles.loaderImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loaderOverlay: {
        flex: 1,
        position: "absolute",
        top: 0,
        backgroundColor: "#ffffff9e",
        height: "100%",
        width: "100%",
        zIndex: 9999999,
        alignItems: "center", 
        justifyContent: "center",
    },
    loaderImage: {
        height: 55,
        width: 55,
    },
})

export default Loader;
