import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, RefreshControl, Dimensions, Pressable, Keyboard, ScrollView } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import ColorCodes from '../../../utilities/ColorCodes';
import { setLoading } from '../../../redux/slices/loadingReducer';
import ItemApartment from '../../../components/ItemApartment';
import { getStorage } from '@react-native-firebase/storage';
import Input from '../../../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width } = Dimensions.get('window');

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userData = useSelector(state => state.auth.user);
    const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [isSortDropdownVisible, setSortDropdownVisible] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchApartments();
    }, []);

    useEffect(() => {
        let filtered = apartments;
        if (search) {
            filtered = apartments.filter(apartment =>
                apartment?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
                apartment?.location?.toLowerCase()?.includes(search?.toLowerCase())
            );
        }

        if (sortBy) {
            filtered = sortApartments(filtered, sortBy);
        }

        setFilteredApartments(filtered);
    }, [search, apartments, sortBy]);

    const sortApartments = (apartments, criteria) => {
        if (criteria === 'price') {
            return [...apartments].sort((a, b) => a.price - b.price);
        } else if (criteria === 'area') {
            return [...apartments].sort((a, b) => a.size - b.size);
        } else {
            return apartments;
        }
    };

    const fetchApartments = async () => {
        dispatch(setLoading(true));
        try {
            let query = getFirestore().collection('apartments');

            if (userData.role === 'realtor') {
                query = query.where('userId', '==', userData?.uid);
            }

            const snapshot = await query.get();
            const apartments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setApartments(apartments);
            setFilteredApartments(apartments);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch apartments');
        } finally {
            dispatch(setLoading(false));
            setIsLoading(false);
        }
    };

    const deleteApartment = async (apartmentId, imageUrl) => {
        console.log("🚀 ~ deleteApartment ~ imageUrl:", imageUrl)
        console.log("🚀 ~ deleteApartment ~ apartmentId:", apartmentId)
        Alert.alert(
            "Delete Apartment",
            "Are you sure you want to delete this apartment?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        dispatch(setLoading(true));
                        try {
                            await getFirestore().collection('apartments').doc(apartmentId).delete();

                            // Delete image from Firebase Storage
                            // if (imageUrl) {
                            //     const storageRef = getStorage().refFromURL(imageUrl);
                            //     await storageRef.delete();
                            // }

                            setApartments(prevApartments => prevApartments.filter(apartment => apartment.id !== apartmentId));

                            Alert.alert("Success", "Apartment deleted successfully.");
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete apartment.");
                        } finally {
                            dispatch(setLoading(false));
                        }
                    },
                },
            ]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await getAuth().signOut();
                            navigation.replace('OnBoarding');
                            dispatch(clearUser())
                        } catch (error) {
                            console.log('Error logging out: ', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleRefresh = () => {
        setIsLoading(true);
        fetchApartments();
    };

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                Keyboard.dismiss();
                setProfileDropdownVisible(false);
                setSortDropdownVisible(false);
            }}
        >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={handleRefresh}
                        colors={[ColorCodes.primaryColor]}
                        tintColor={ColorCodes.primaryColor}
                    />
                }
            >
                <View style={styles.headerContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.welcomeText}>Hello, {userData?.name} 👋</Text>

                        <TouchableOpacity onPress={() => setProfileDropdownVisible(!isProfileDropdownVisible)}>
                            <Ionicons name="person-circle-sharp" size={32} color={ColorCodes.black} />
                        </TouchableOpacity>
                    </View>
                    {isProfileDropdownVisible && (
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => { }}>
                                <Text style={styles.dropdownItemText}>Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                                <Text style={styles.dropdownItemText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <Text style={styles.text}>Let’s find your cozy place to stay</Text>

                    <View style={styles.headerRow}>
                        <Input
                            label={'Where do you want to stay?'}
                            value={search}
                            onChangeText={setSearch}
                            leftIcon={'magnify'}
                            style={{ width: width * 0.8 }}
                        />
                        <TouchableOpacity
                            onPress={() => setSortDropdownVisible(!isSortDropdownVisible)}
                            hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
                        >
                            <FontAwesome5 name='sliders-h' size={24} color={ColorCodes.primaryColor} />
                        </TouchableOpacity>
                    </View>
                    {isSortDropdownVisible && (
                        <View style={[styles.dropdownMenu, { top: 100, right: 30 }]}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => setSortBy('price')}>
                                <Text style={styles.dropdownItemText}>Sort by Price</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => setSortBy('area')}>
                                <Text style={styles.dropdownItemText}>Sort by Area Size</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => setSortBy(null)}>
                                <Text style={styles.dropdownItemText}>Clear Sorting</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <FlatList
                    scrollEnabled={false}
                    data={filteredApartments}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flex: 1, marginHorizontal: 10 }}
                    renderItem={({ item }) => (
                        <ItemApartment
                            item={item}
                            onPress={() => navigation.navigate('ApartmentDetails', { apartment: item })}
                            onPressDelete={() => deleteApartment(item?.id, item?.image)}
                            onPressEdit={() => navigation.navigate('AddApartment', { apartment: item })}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No Apartment Found!</Text>
                        </View>
                    )}
                />
            </KeyboardAwareScrollView>

            {userData?.role === 'realtor' && (
                <TouchableOpacity onPress={() => navigation.navigate('AddApartment')} style={styles.addButton}>
                    <FontAwesome5 name='plus' size={28} color={ColorCodes.white} />
                </TouchableOpacity>
            )}
        </Pressable>
    );
};

export default Home;
