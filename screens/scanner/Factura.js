import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View } from 'react-native'
import { Alert, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { ListItem, Rating, Icon, Input, Button, Image } from 'react-native-elements'
import { isEmpty, map } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'
import Zoom from 'react-native-reanimated'

import Toast from 'react-native-easy-toast'
import { getDocumentById,getCurrentUser } from '../../utils/Actions'
import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'

const widthScreen = Dimensions.get("window").width

export default function Factura({ navigation, route }) {
    const { id } = route.params

    const [factura, setFactura] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalNotification, setModalNotification] = useState(false)
    const [relodUser, setRelodUser] = useState(false)


    

    useEffect(() => {
        setUserLogged(getCurrentUser())
        setCurrentUser(userLogged)
        }, [relodUser])

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getDocumentById("facturas", id)
                if (response.statusResponse) {
                    setFactura(response.documento)
                } else {
                    setFactura({})
                    Alert.alert("Ocurrió un problema cargando Facturas, intente más tarde.")
                }
            })()
        }, [])
    )

    if (!factura) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

  return (
    <ScrollView style={styles.viewBody}>
      <Text>Factura</Text>

      
        
      <CarouselImages
        images={factura.images}
        height={250}
        width={widthScreen}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />      
 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewOficinaTitle: {
        padding: 15,
    },
    viewOficinaContainer: {
        flexDirection: "row"
    },
    descriptionOficina: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameOficina: {
        fontWeight: "bold"
    },
    viewOficinaInfo: {
        margin: 15,
        marginTop: 25
    },
    oficinaInfoTitle: {
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