import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import ColorCodes from '../../../utilities/ColorCodes';

const Splash = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.user);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user && userData) {
        navigation.replace('Home');
      } else {
        navigation.replace('OnBoarding');
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/Gallery.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: ColorCodes.white,
      paddingHorizontal: 20,
      justifyContent: 'center',
  },
  image: {
      maxWidth: '100%',
      resizeMode: 'contain'
  }
});

export default Splash;