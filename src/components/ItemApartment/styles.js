import { StyleSheet } from 'react-native';
import ColorCodes from '../../utilities/ColorCodes';

export default StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: ColorCodes.white,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 5,
        width: '100%',
        alignSelf: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        resizeMode: 'cover'
    },
    details: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: ColorCodes.black,
    },
    description: {
        fontSize: 12,
        marginVertical: 5,
        fontWeight: '400',
        color: ColorCodes.textColor,
    },
    location: {
        fontSize: 12,
        marginVertical: 5,
        color: ColorCodes.primaryColor,
        fontWeight: '500',
        maxWidth: '75%'
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: ColorCodes.black,
    }
});
