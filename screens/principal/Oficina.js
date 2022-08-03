import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View } from 'react-native'
import { Alert, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import { ListItem, Rating, Icon, Input, Button } from 'react-native-elements'
import { isEmpty, map } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'


import Toast from 'react-native-easy-toast'
import { getDocumentById,getCurrentUser } from '../../utils/Actions'
import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapOficina from '../../components/principal/MapOficina'
import { callNumber, formatPhone, sendEmail, sendWhatsApp } from '../../utils/helpers'

const widthScreen = Dimensions.get("window").width

export default function Oficina({ navigation, route }) {
    const { id, name } = route.params

    const [oficina, setOficina] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
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
                const response = await getDocumentById("oficinas", id)
                if (response.statusResponse) {
                    setOficina(response.documento)
                } else {
                    setOficina({})
                    Alert.alert("Ocurrió un problema cargando oficinas, intente más tarde.")
                }
            })()
        }, [])
    )

    if (!oficina) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

 


    navigation.setOptions({title : name})
    return (
    <ScrollView style={styles.viewBody}>
          <CarouselImages
                images={oficina.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
              <TitleOficina
                name={oficina.name}
                description={oficina.description}               
            />

            <OficinaInfo
                name={oficina.name}
                location={oficina.location}
                address={oficina.address}
                email={oficina.email}
                phone={formatPhone(oficina.callingCode, oficina.phone)}
                currentUser={currentUser}
                callingCode={oficina.callingCode}
                phoneNoFormat={oficina.phone}
                setLoading={setLoading}
                setModalNotification={setModalNotification}
            />
    
    </ScrollView>
  )
}


function OficinaInfo({ 
    name, 
    location, 
    address, 
    email, 
    phone, 
    currentUser, 
    callingCode, 
    phoneNoFormat, 
    setLoading,
    setModalNotification 
}) {
    const listInfo = [
        { type: "addres", text: address, iconLeft: "map-marker", iconRight: "message-text-outline" },
        { type: "phone", text: phone, iconLeft: "phone", iconRight: "whatsapp" },
        { type: "email", text: email, iconLeft: "at" },
    ]

    const actionLeft = (type) => {
        if (type == "phone") {
            callNumber(phone)
        } else if (type == "email") {
            if (currentUser) {
                sendEmail(email, "Interesado", `Soy ${currentUser.displayName}, estoy interesado en sus servicios`)
            } else {
                sendEmail(email, "Interesado", `Estoy interesado en sus servicios`)
            }
        }
    }

    const actionRight = (type) => {
        if (type == "phone") {
            if (currentUser) {
                sendWhatsApp(`${callingCode} ${phoneNoFormat}`, `Soy ${currentUser.displayName}, estoy interesado en sus servicios`)
            } else {
                sendWhatsApp(`${callingCode} ${phoneNoFormat}`, `Estoy interesado en sus servicios`)
            }
        } else if (type == "addres") {
            setModalNotification(true)
        }
    }

    return (
        <View style={styles.viewOficinaInfo}>
            <Text style={styles.oficinaInfoTitle}>
                Información sobre el oficina
            </Text>
            <MapOficina
                location={location}
                name={name}
                height={150}
            />
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconLeft}
                            color="#442484"
                            onPress={() => actionLeft(item.type)}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                        {
                            item.iconRight && (
                                <Icon
                                    type="material-community"
                                    name={item.iconRight}
                                    color="#442484"
                                    onPress={() => actionRight(item.type)}
                                />
                            )
                        }
                    </ListItem>
                ))
            }
        </View>
    )
}


function TitleOficina({ name, description, rating }) {
    return (
        <View style={styles.viewOficinaTitle}>
            <View style={styles.viewOficinaContainer}>
                <Text style={styles.nameOficina}>{name}</Text>
            </View>
            <Text style={styles.descriptionOficina}>{description}</Text>
        </View>
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