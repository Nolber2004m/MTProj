import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectRoll } from 'react-native-element-dropdown';

export default function SelectRollScreen() {


    const local_data = [
        {
          value: '1',
          lable: 'Administrador',
          image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
          },
        },
        {
          value: '2',
          lable: 'Gerente',
          image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
          },
        },
        {
          value: '3',
          lable: 'Chofer',
          image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
          },
        },
        {
          value: '4',
          lable: 'Contador',
          image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
          },
        },
        {
          value: '5',
          lable: 'Auditor',
          image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
          },
        },
      ];
    

      const [roll, setRoll] = useState('1');

      return (
        <SelectRollScreen
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={roll}
          data={local_data}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Select Roll"
          searchPlaceholder="Search..."
          onChange={e => {
            setRoll(e.value);
          }}
        />
      );


}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      width: 150,
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