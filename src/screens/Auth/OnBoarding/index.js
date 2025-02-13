import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Button from '../../../components/Button';

const OnBoarding = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/Gallery.png')} style={styles.image} />
            <Text style={styles.title}>New Place, New Home!</Text>
            <Text style={styles.text}>Are you ready to uproot and start over in a new area? Placoo will help you on your journey!</Text>

            <Button
                variant={'primary'}
                name={'Login'}
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                name={'Sign up'}
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

export default OnBoarding;