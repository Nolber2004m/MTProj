import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

export default function SelectCountryScreen() {


    const local_data = [
        {
          value: '1',
          lable: 'Español',
          image: {
            uri: 'https://static.vecteezy.com/system/resources/previews/000/401/734/original/illustration-of-spain-flag-vector.jpg',
          },
        },
        {
          value: '2',
          lable: 'Ingles',
          image: {
            uri: 'https://www.clipartkey.com/mpngs/m/6-61844_image-of-usa-flag-waving-gif-png-emoji.png',
          },
        },       
      ];
    

      const [country, setCountry] = useState('1');

      return (
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={country}
          data={local_data}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Seleccione idioma"
          searchPlaceholder="Buscar..."
          onChange={e => {
            setCountry(e.value);
          }}
        />
      );


}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width: "85%",
      backgroundColor: '#EEEEEE',
      borderRadius: 22,
      paddingHorizontal: 8,      
    },
    imageStyle: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });