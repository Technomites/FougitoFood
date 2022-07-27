import { theme } from './styles';
// import { showMessage } from "react-native-flash-message";
import { FontFamily } from './fonts';

const api = {
    baseUrl: '',
    mapKey: '',
};
const constant = {
    currencyName: "Rs",
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};
const customStyle = {
    validationBox: {
        backgroundColor: "#F6E9E9",
        borderWidth: 1,
        borderColor: "#BC5B6C",
    },
    validationText: {
        color: theme.color.errorColor,
        fontSize: 12,
        textTransform: "capitalize",
    },
    cardShadow: {
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    centeredView: {
        flex: 1,
        backgroundColor: "#00000075",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    modalView: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 14,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHeading: {
        fontSize: 18,
        fontFamily: FontFamily.boldFont,
        textAlign: "center",
    },
    modalButton: {
        alignSelf: "center",
        width: "46%",
        height: 44,
        marginTop: 14,
        marginBottom: 0,
    },
    modalListMain: {
        marginTop: 12,
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: .7,
    },
    modalListText: {
        color: theme.color.textColor,
        fontFamily: FontFamily.regularFont,
        fontSize: 12,
        paddingBottom: 4,
        textAlign: "left",
    },
};

const helpers = {
    api,
    constant,
    customStyle
};

// const ToastMessage = (message) => {
//     showMessage({
//         message: message,
//         backgroundColor: "#383d41",
//         duration: 3000,
//         floating: true,
//         position: "bottom", 
//     });
// };

export {
    helpers,
    // ToastMessage,
};

