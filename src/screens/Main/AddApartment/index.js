import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, Keyboard, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import ColorCodes from '../../../utilities/ColorCodes';
import ImagePickerModal from '../../../components/ImagePickerModal';
import { setLoading } from '../../../redux/slices/loadingReducer';
import firestore, { getFirestore } from '@react-native-firebase/firestore';

const AddApartment = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const userData = useSelector(state => state.auth.user);
    const apartment = route.params?.apartment || null;

    const [showImageModal, setShowImageModal] = useState(false);
    const [image, setImage] = useState(apartment ? apartment.image : null);
    const [title, setTitle] = useState(apartment ? apartment.title : '');
    const [size, setSize] = useState(apartment ? apartment.size : '');
    const [location, setLocation] = useState(apartment ? apartment.location : '');
    const [price, setPrice] = useState(apartment ? apartment.price : '');
    const [rooms, setRooms] = useState(apartment ? apartment.rooms : 1);
    const [description, setDescription] = useState(apartment ? apartment.description : '');

    const handleImagePick = async (type) => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            saveToPhotos: true
        };

        let result;
        if (type === 'Camera') {
            setShowImageModal(false);
            result = await launchCamera(options);
            console.log('hello world', result);

        } else {
            setShowImageModal(false);
            result = await launchImageLibrary(options);
        }

        if (result.didCancel) return;
        if (result.errorCode) {
            setShowImageModal(false);
            Alert.alert('Error', 'Failed to pick image');
            return;
        }

        const imageUri = result.assets[0].uri;
        uploadImageToFirebase(imageUri);
        setImage(imageUri)
    };

    const uploadImageToFirebase = async (imageUri) => {
        dispatch(setLoading(true));
        const fileName = `apartments/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
        const storageRef = storage().ref(fileName);

        // try {
        //     await storageRef.putFile(imageUri);
        //     const downloadUrl = await storageRef.getDownloadURL();
        //     setImage(downloadUrl);
        // } catch (error) {
        //     Alert.alert('Upload Failed', error.message);
        // } finally {
            dispatch(setLoading(false));
        // }
    };

    const handleSubmitApartment = async () => {
        if (!title || !size || !location || !price || !description || !image) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        dispatch(setLoading(true));
        try {
            if (apartment) {
                await firestore().collection('apartments').doc(apartment.id).update({
                    title,
                    size,
                    location,
                    price,
                    rooms,
                    description,
                    image: 'https://vaastudevayah.com/images/vastu-for-apartment1.jpg',
                    userId: userData.uid,
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                });
                console.log("Success", "Apartment updated successfully.");
            } else {
                await getFirestore().collection('apartments').add({
                    title,
                    size,
                    location,
                    price,
                    rooms,
                    description,
                    image: 'https://vaastudevayah.com/images/vastu-for-apartment1.jpg',
                    userId: userData?.uid,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
                console.log("Success", "Apartment added successfully.");
            }
            navigation.pop();
        } catch (error) {
            Alert.alert("Error", "Something went wrong.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Pressable onPress={() => Keyboard.dismiss()}>
                <TouchableOpacity onPress={() => navigation.pop()} style={{ paddingBottom: 20 }}>
                    <Entypo name='chevron-thin-left' size={24} color={ColorCodes.black} />
                </TouchableOpacity>

                <Text style={styles.text}>Apartment Images</Text>
                <TouchableOpacity onPress={() => setShowImageModal(true)}>
                    <Image source={image ? { uri: image } : require('../../../assets/placeholder.jpeg')} style={styles.image} />
                </TouchableOpacity>

                <Input
                    label={'Title'}
                    value={title}
                    onChangeText={setTitle}
                    leftIcon={'text-box'}
                />

                <Input
                    label={'Area Size'}
                    value={size}
                    onChangeText={setSize}
                    leftIcon={'rectangle'}
                    keyboardType={'number-pad'}
                />

                <Input
                    label={'Location'}
                    value={location}
                    onChangeText={setLocation}
                    leftIcon={'map-marker'}
                />

                <Input
                    label={'Price ($/month)'}
                    value={price}
                    onChangeText={setPrice}
                    leftIcon={'currency-usd'}
                    keyboardType={'number-pad'}
                />

                <Text style={styles.text}>No. of Rooms</Text>

                <View style={styles.counterContainer}>
                    <TouchableOpacity
                        onPress={() => setRooms(rooms - 1)}
                        disabled={rooms === 1}
                        style={styles.counterButton}
                    >
                        <Entypo name='minus' size={20} color={ColorCodes.white} />
                    </TouchableOpacity>
                    <Text style={styles.numberText}>{rooms}</Text>
                    <TouchableOpacity
                        onPress={() => setRooms(rooms + 1)}
                        style={styles.counterButton}
                    >
                        <Entypo name='plus' size={20} color={ColorCodes.white} />
                    </TouchableOpacity>
                </View>

                <Input
                    label={'Description'}
                    value={description}
                    onChangeText={setDescription}
                    style={{ minHeight: 120 }}
                    multiline
                />
                <Button
                    variant={'primary'}
                    name={apartment ? "Update Apartment" : "Add Apartment"}
                    onPress={handleSubmitApartment}
                />
            </Pressable>

            <ImagePickerModal
                showModal={showImageModal}
                setShowModal={setShowImageModal}
                onPress={handleImagePick}
            />
        </KeyboardAwareScrollView>
    );
};

export default AddApartment;
