import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View } from 'react-native'
import { Alert, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { ListItem, Rating, Icon, Input, Button } from 'react-native-elements'
import { isEmpty, map, size } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import { getCurrentUser, isUserLogged, getFacturas } from '../../utils/Actions'
import ListaFacturas from '../../components/scanners/ListaFacturas'



export default function Scanner({ navigation, route }) {
  const [login, setLogin] = useState(null)
  const [startFactura, setStartFactura] = useState(null)
  const [facturas, setFacturas] = useState([])
  const [loading, setLoading] = useState(false)

  const collection1 = "facturas"

  useFocusEffect (
      useCallback(() => {
          const user = getCurrentUser()
          user ? setLogin(true) : setLogin(false)
      }, [])
  )


  
  useFocusEffect(
    useCallback(() => {
        async function getData() {
            setLoading(true)
            const response = await getFacturas(collection1)

           if (response.statusResponse) {
                setStartFactura(response.startFacturas)
                setFacturas(response.facturas)
           }
            setLoading(false)
        }
        getData()
    }, [])
)



  return (
    <View style={styles.viewBody}>
 
        { login && 
                size(facturas) > 0 ? (
                   
                  <ListaFacturas
                        facturas={facturas}
                        navigation={navigation}
                       //handleLoadMore={handleLoadMore}
                    />
                 
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay facturas registrados, para el usuario registrado.</Text>
                    </View>
                )
            
        }

      
        { login &&
            <Icon
                type="material-community"
                name='camera-plus-outline'
                color="#442484"
                reverse
                containerStyle={styles.btncontiner}
                size={35}
                underlayColor="tranparent"
                onPress={() => navigation.navigate("add-scanner")}
            />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
      flex: 1,
      backgroundColor: "#fff"
  },
  btncontiner:{
    position:"absolute",
    bottom:10,
    right:10,
    shadowColor:"stack",
    shadowOffset:{width: 2,height: 2},
    shadowOpacity:0.5

  },
  viewRestaurantTitle: {
      padding: 15,
  },
  viewRestaurantContainer: {
      flexDirection: "row"
  },
  descriptionRestaurant: {
      marginTop: 8,
      color: "gray",
      textAlign: "justify"
  },
  rating: {
      position: "absolute",
      right: 0
  },
  nameRestaurant: {
      fontWeight: "bold"
  },
  viewRestaurantInfo: {
      margin: 15,
      marginTop: 25
  },
  restaurantInfoTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15
  },
  containerListItem: {
      borderBottomColor: "#a376c7",
      borderBottomWidth: 1
  },
  viewFavorite: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "#fff",
      borderBottomLeftRadius: 100,
      padding: 5,
      paddingLeft: 15
  },
  textArea: {
      height: 50,
      paddingHorizontal: 10
  },
  btnSend: {
      backgroundColor: "#442848"
  },
  btnSendContainer: {
      width: "95%"
  },
  textModal: {
      color: "#000",
      fontSize: 16,
      fontWeight: "bold"
  },
  modalContainer: {
      justifyContent: "center",
      alignItems: "center"
  }
})