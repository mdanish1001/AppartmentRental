import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ColorCodes from '../../../utilities/ColorCodes';
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';
import styles from './styles';

const ApartmentDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const apartment = route?.params?.apartment;
  const userData = useSelector(state => state.auth.user);
  // yarn remove @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage 
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: apartment?.image }} style={styles.imageBackground}>
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcons}>
            <Ionicons name="arrow-back" size={28} color={ColorCodes.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcons}>
            <MaterialIcons name="more-vert" size={28} color={ColorCodes.textColor} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.apartmentTitle}>{apartment?.title}</Text>
          <AntDesign name="hearto" size={24} color={ColorCodes.black} />
        </View>

        <Text style={styles.location}>{apartment?.location}</Text>

        <View style={styles.ratingRow}>
          <AntDesign name="star" size={20} color="gold" />
          <Text style={styles.ratingText}>4.8 <Text style={styles.reviewCount}>(131 reviews)</Text></Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{apartment?.description}</Text>

        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesContainer}>
          <View style={styles.facility}>
            <FontAwesome5 name="bed" size={20} color="black" />
            <Text style={styles.facilityText}>{apartment?.rooms} Rooms</Text>
          </View>

          <View style={styles.facility}>
            <FontAwesome5 name="vector-square" size={20} color="black" />
            <Text style={styles.facilityText}>{apartment?.size} sq ft</Text>
          </View>

          <View style={styles.facility}>
            <Ionicons name="sunny" size={22} color="black" />
            <Text style={styles.facilityText}>Sunset View</Text>
          </View>

          <View style={styles.facility}>
            <MaterialIcons name="fitness-center" size={22} color="black" />
            <Text style={styles.facilityText}>Gym Center</Text>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={{ fontWeight: '600' }}>Start from</Text>
          <Text><Text style={styles.price}>${apartment?.price}</Text>/month</Text>
        </View>
        <Button
          name={userData.role === 'realtor' ? 'Update' : 'Chat'}
          variant={'primary'}
          containerStyle={{ width: '30%' }}
          onPress={
            () => userData.role === 'realtor' ?
              navigation.navigate('AddApartment', { apartment })
              : {}
          }
        />
      </View>
    </View>
  );
};

export default ApartmentDetails;
