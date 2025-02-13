import React from 'react';
import { View, Text, useColorScheme, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import ColorCodes from '../../utilities/ColorCodes';
import { useSelector } from 'react-redux';

const ItemApartment = ({ item, onPress, onPressDelete, onPressEdit }) => {
  const userData = useSelector(state => state.auth.user);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress()} style={styles.mainView}>
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.location}>{item.location}</Text>
            {userData?.role === 'realtor' && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <TouchableOpacity onPress={onPressDelete}>
                  <MaterialIcons name='delete' size={24} color={ColorCodes.red} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressEdit}>
                  <MaterialIcons name='edit' size={24} color={ColorCodes.green} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.text}><Text style={{ color: ColorCodes.primaryColor }}>$</Text>{item.price}</Text>
            <Text style={styles.text}>{item.size} sq ft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemApartment;
