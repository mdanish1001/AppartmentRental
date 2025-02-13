import { StyleSheet } from 'react-native';
import ColorCodes from '../../../utilities/ColorCodes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorCodes.white,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
        maxHeight: '60%',
    },
    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: '500',
        color: ColorCodes.black,
        textAlign: 'center'
    },
    text: {
        fontSize: 14,
        color: ColorCodes.textColor,
        marginVertical: 20,
        textAlign: 'center'
    },
});

export default styles;
