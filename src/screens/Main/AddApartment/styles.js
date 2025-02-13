import { StyleSheet } from 'react-native';
import ColorCodes from '../../../utilities/ColorCodes';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: ColorCodes.white,
        padding: 20,
    },
    image: {
        height: 200,
        width: '100%',
        resizeMode: 'contain'
    },
    text: {
        color: ColorCodes.textColor,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: ColorCodes.black,
    },
    counterButton: {
        backgroundColor: ColorCodes.primaryColor,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 8
    },
    numberText: {
        fontSize: 20,
        fontWeight: '500',
        color: ColorCodes.textColor
    }
});

export default styles;
