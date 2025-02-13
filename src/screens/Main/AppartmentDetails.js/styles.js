import { StyleSheet } from 'react-native';
import ColorCodes from '../../../utilities/ColorCodes';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorCodes.white
    },
    imageBackground: {
        width: '100%',
        height: 250
    },
    headerIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    headerIcons: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 20,
        padding: 5,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: ColorCodes.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        marginTop: -20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    apartmentTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    location: {
        fontSize: 16,
        color: ColorCodes.textColor,
        marginVertical: 5
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    ratingText: {
        fontSize: 16,
        marginLeft: 5
    },
    reviewCount: {
        color: ColorCodes.textColor
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15
    },
    description: {
        fontSize: 14,
        color: ColorCodes.textColor,
        marginVertical: 5
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10
    },
    facility: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '33%',
        marginBottom: 10
    },
    facilityText: {
        fontSize: 14,
        marginLeft: 5
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: ColorCodes.white,
        borderTopWidth: 1,
        borderColor: ColorCodes.lightGrey
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ColorCodes.black
    }
});

export default styles;
