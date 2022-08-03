import React from 'react';
import {StyleSheet, View, Text, SectionList, SafeAreaView} from 'react-native';


export default function FLSectionList(navigation) {

    const LISTDATA = [
        {
          title: 'Days list',
          data: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs'],
        },
        {
          title: 'Months list',
          data: ['Jan', 'Feb', 'March', 'April', 'May'],
        },
        {
          title: 'Years list',
          data: [2000, 2001, 2002, 2003],
        },
      ];
      
      const ListItem = ({item}) => {
        return (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item}</Text>
          </View>
        );
      };
      
      const ListHeader = ({item}) => {
        return (
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{item.title}</Text>
          </View>
        );
      };
      
      
        return (
          <SafeAreaView style={styles.parentView}>
            <SectionList
              style={styles.list}
              sections={LISTDATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <ListItem item={item} />}
              renderSectionHeader={({section}) => <ListHeader item={section} />}
            />
          </SafeAreaView>
        );
     
}


const styles = StyleSheet.create({
    parentView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    list: {
      width: '100%',
    },
    listText: {
      color: 'white',
    },
    listHeaderText: {
      color: 'white',
    },
    listItem: {
      flex: 1,
      marginRight: 20,
      marginLeft: 20,
      marginTop: 10,
      backgroundColor: '#9575cd',
      padding: 10,
      borderRadius: 5,
    },
    listHeader: {
      flex: 1,
      marginRight: 20,
      marginLeft: 20,
      marginTop: 10,
      backgroundColor: '#2196f3',
      padding: 10,
      borderRadius: 5,
    },
  });