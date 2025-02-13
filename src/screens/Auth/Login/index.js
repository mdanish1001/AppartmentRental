import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import InputPassword from '../../../components/InputPassword';
import Entypo from 'react-native-vector-icons/Entypo';
import ColorCodes from '../../../utilities/ColorCodes';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingReducer';
import { getAuth } from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setUser } from '../../../redux/slices/authReducer';
import { getFirestore } from '@react-native-firebase/firestore';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      isValid = false;
    } else {
      setErrorMessage('');
    }

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSignIn = () => {
    if (!validateForm()) return;

    dispatch(setLoading(true));

    getAuth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          const userDoc = await getFirestore().collection('users').doc(user.uid).get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            dispatch(setUser(userData));
            dispatch(setLoading(false));
            navigation.replace('Home');
          } else {
            dispatch(setLoading(false));
            setErrorMessage('User data not found.');
          }
        } catch (error) {
          dispatch(setLoading(false));
          setErrorMessage('Failed to fetch user data.');
        }
      })
      .catch((error) => {
        dispatch(setLoading(false));
        if (error.code === 'auth/invalid-email') {
          setErrors({ email: 'This email address is invalid' });
        } else if (error.code === 'auth/invalid-credential') {
          setErrorMessage('Email/Password Invalid.');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      });
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.pop()} style={styles.backbutton}>
          <Entypo name='chevron-thin-left' size={24} color={ColorCodes.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.text}>Log In to your account to explore your dream place to live across the whole world!</Text>

        {errorMessage ? (
          <Text style={[styles.errorText, { textAlign: 'center' }]}>{errorMessage}</Text>
        ) : null}

        <Input
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          leftIcon={'email-outline'}
          keyboardType={'email-address'}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <InputPassword
          leftIcon={'lock-outline'}
          label={'Password'}
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => { }}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          variant={'primary'}
          name={'Sign in'}
          onPress={handleSignIn}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.notAMemberText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerNowText}>Register now</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default Login;
