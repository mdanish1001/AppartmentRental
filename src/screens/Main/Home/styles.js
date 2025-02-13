import { StyleSheet } from 'react-native';
import ColorCodes from '../../../utilities/ColorCodes';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: ColorCodes.white,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: ColorCodes.white,
    },
    welcomeText: {
        fontSize: 24,
        color: ColorCodes.black,
        fontWeight: 'bold',
        maxWidth: '90%',
    },
    text: {
        fontSize: 14,
        color: ColorCodes.textColor,
        fontWeight: 'thin'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropdownMenu: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: ColorCodes.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 1000,
      },
      dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
      },
      dropdownItemText: {
        color: ColorCodes.black,
        fontSize: 16,
      },
    addButton: {
        height: 50,
        width: 50,
        backgroundColor: ColorCodes.primaryColor,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        right: 15,
        position: 'absolute'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      emptyText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: '#ccc',
      },
});

export default styles;
