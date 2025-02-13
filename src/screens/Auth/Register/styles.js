import { Dimensions, StyleSheet } from 'react-native';
import ColorCodes from '../../../utilities/ColorCodes';
const { height, width } = Dimensions.get('window');

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
        marginTop: height * 0.1,
        fontSize: 28,
        fontWeight: '500',
        color: ColorCodes.black
    },
    text: {
        fontSize: 14,
        color: ColorCodes.textColor,
        marginVertical: 20
    },
    roleSelection: {
        alignItems: 'flex-start',
        width: '100%',
    },
    label: {
        color: ColorCodes.textColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioButtonGroup: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioLabel: {
        fontSize: 16,
        color: ColorCodes.textColor,
    },
    errorText: {
        fontSize: 12,
        color: ColorCodes.red,
        textAlign: 'right'
    }
});

export default styles;
