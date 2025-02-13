import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import styles from './styles';
import Input from '../../../components/Input';
import InputPassword from '../../../components/InputPassword';
import Entypo from 'react-native-vector-icons/Entypo';
import ColorCodes from '../../../utilities/ColorCodes';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { getAuth } from '@react-native-firebase/auth';
import firestore, { getFirestore } from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingReducer';
import { setUser } from '../../../redux/slices/authReducer';

const Register = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('regular');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
            isValid = false;
        } else {
            setErrorMessage('');
        }

        if (!name) {
            errors.name = 'Name is required';
            isValid = false;
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
        } else if (password.length < 6) {
            errors.password = 'Password should be at least 6 characters';
            isValid = false;
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm your password';
            isValid = false;
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleRegister = () => {
        if (!validateForm()) return;

        dispatch(setLoading(true));
        getAuth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const userData = {
                    uid: user.uid,
                    name,
                    email,
                    role,
                };

                await getFirestore().collection('users').doc(user.uid).set({
                    ...userData,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
                
                dispatch(setUser(userData));

                dispatch(setLoading(false))
                navigation.replace('Home');
            })
            .catch((error) => {
                dispatch(setLoading(false))
                if (error.code === 'auth/email-already-in-use') {
                    setErrors({ email: 'This email address is already in use' });
                } else if (error.code === 'auth/invalid-email') {
                    setErrors({ email: 'This email address is invalid' });
                } else if (error.code === 'auth/weak-password') {
                    setErrors({ password: 'Password should be at least 6 characters' });
                } else {
                    setErrorMessage(error);
                }
            })
    };

    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.pop()} style={styles.backbutton}>
                    <Entypo name='chevron-thin-left' size={24} color={ColorCodes.black} />
                </TouchableOpacity>

                <Text style={styles.title}>Let’s explore together!</Text>
                <Text style={styles.text}>Create your account to explore your dream place to live across the whole world!</Text>

                {errorMessage ? <Text style={[styles.errorText, { textAlign: 'center' }]}>{errorMessage}</Text> : null}

                <Input
                    label={'Full Name'}
                    value={name}
                    onChangeText={setName}
                    leftIcon={'account-outline'}
                    keyboardType={'default'}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <Input
                    label={'Email'}
                    value={email}
                    onChangeText={setEmail}
                    leftIcon={'email-outline'}
                    keyboardType={'email-address'}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <View style={styles.roleSelection}>
                    <Text style={styles.label}>Select Role</Text>
                    <View style={styles.radioButtonGroup}>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton
                                value="regular"
                                status={role === 'regular' ? 'checked' : 'unchecked'}
                                onPress={() => setRole('regular')}
                            />
                            <Text style={styles.radioLabel}>Regular User</Text>
                        </View>
                        <View style={styles.radioButtonContainer}>
                            <RadioButton
                                value="realtor"
                                status={role === 'realtor' ? 'checked' : 'unchecked'}
                                onPress={() => setRole('realtor')}
                            />
                            <Text style={styles.radioLabel}>Realtor</Text>
                        </View>
                    </View>
                </View>

                <InputPassword
                    leftIcon={'lock-outline'}
                    label={'Password'}
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <InputPassword
                    leftIcon={'lock-outline'}
                    label={'Confirm Password'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <Button
                    variant={'primary'}
                    name={'Register'}
                    onPress={handleRegister}
                    containerStyle={{ marginTop: 20 }}
                />
            </Pressable>
        </KeyboardAwareScrollView>
    );
};

export default Register;
