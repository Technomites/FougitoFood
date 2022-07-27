import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { SvgIcons } from "../../constants/svgIcons";

const NoItemFound = () => {
    return (
        <View style={styles.noItemFoundMain}>
            {/* <SvgIcons.EmptyBox /> */}
            <Text style={styles.noItemFoundText}>
                No item found!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noItemFoundMain: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 300,
    },
    noItemFoundText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
})

export default NoItemFound;
