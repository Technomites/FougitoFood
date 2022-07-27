import { Platform } from 'react-native'

const FontFamilyAndroid = {
    lightFont: 'Rubik-Light', // 300 FONT WEIGHT
    regularFont: 'Rubik-Regular', // 400 FONT WEIGHT
    mediumFont: 'Rubik-Medium', // 500 FONT WEIGHT
    semiBoldFont: 'Rubik-SemiBold', // 600 FONT WEIGHT
    boldFont: 'Rubik-Bold', // 800 FONT WEIGHT    
    blackFont: 'Rubik-Black',
}
const FontFamilyIos = {
    lightFont: 'Rubik-Light', // 300 FONT WEIGHT
    regularFont: 'Rubik-Regular', // 400 FONT WEIGHT
    mediumFont: 'Rubik-Medium', // 500 FONT WEIGHT
    semiBoldFont: 'Rubik-SemiBold', // 600 FONT WEIGHT
    boldFont: 'Rubik-Bold', // 800 FONT WEIGHT    
    blackFont: 'Rubik-Black',
}

const FontFamily = Platform.OS === 'ios' ? FontFamilyIos : FontFamilyAndroid;

export { FontFamily };
