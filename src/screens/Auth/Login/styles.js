import { Dimensions, StyleSheet } from 'react-native';
import ColorCodes from '../../../utilities/ColorCodes';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: ColorCodes.white,
        paddingHorizontal: 15,
    },
    backbutton: {
        paddingVertical: 20,
    },
    title: {
        marginTop: height * 0.12,
        fontSize: 28,
        fontWeight: '500',
        color: ColorCodes.black
    },
    text: {
        fontSize: 14,
        color: ColorCodes.textColor,
        marginVertical: 20
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    forgotPasswordText: {
        color: ColorCodes.primaryColor,
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    notAMemberText: {
        color: ColorCodes.textColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerNowText: {
        color: ColorCodes.primaryColor,
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 12,
        color: ColorCodes.red,
        textAlign: 'right'
    }
});

export default styles;
