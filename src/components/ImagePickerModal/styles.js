import ColorCodes from '../../utilities/ColorCodes';
const { StyleSheet, Dimensions } = require('react-native');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalStyle: {
    bottom: 0,
    paddingVertical: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: width,
  },
  mainContainer: {
    backgroundColor: ColorCodes.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 18,
    color: ColorCodes.white,
    fontWeight: '500'
  },
  buttonContainer: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    gap: 10,
    backgroundColor: ColorCodes.white
  }
});
export default styles;
