import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login/index.js';
import Register from '../screens/Auth/Register/index.js';
import Home from '../screens/Main/Home';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import OnBoarding from '../screens/Auth/OnBoarding/index.js';
import Splash from '../screens/Auth/Splash/index.js';
import AddApartment from '../screens/Main/AddApartment/index.js';
import ApartmentDetails from '../screens/Main/AppartmentDetails.js/index.js';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  const loading = useSelector(state => state.loading);

  return (
    <NavigationContainer>
      <Spinner visible={loading} />
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='OnBoarding' component={OnBoarding} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ApartmentDetails' component={ApartmentDetails} />
        <Stack.Screen name='AddApartment' component={AddApartment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

