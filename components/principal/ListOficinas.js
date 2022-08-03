import { size } from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { formatPhone } from '../../utils/helpers'

export default function ListOficinas({oficinas, navigation }) {
    return (
        <View>
            <FlatList
                data={oficinas}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                //onEndReached={handleLoadMore}
                renderItem={(oficina) => (
                    <Oficina oficina={oficina} navigation={navigation}/>
                )}
            />
        </View>
    )
}

function Oficina({ oficina, navigation }) {
    const { id, images, name, address, description, phone, callingCode } = oficina.item
    const imageOficina = images[0]

    const goOficina = () => {
        navigation.navigate("oficina", { id, name })
    } 

    return (
        <TouchableOpacity onPress={goOficina}>
            <View style={styles.viewOficinas}>
                <View style={styles.viewOficinaImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={{ uri: imageOficina }}
                        style={styles.imageOficina}
                    />
                </View>
                <View>
                    <Text style={styles.oficinaTitle}>{name}</Text>
                    <Text style={styles.oficinaInformation}>{address}</Text>
                    <Text style={styles.oficinaInformation}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.oficinaDescription}>
                        {
                            size(description) > 0
                                ? `${description.substr(0, 60)}...`
                                : description
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewOficinas: {
        flexDirection: "row",
        margin: 10
    },
    viewOficinaImage: {
        marginRight: 15
    },
    imageOficina: {
        width: 90,
        height: 90
    },
    oficinaTitle: {
        fontWeight: "bold"
    },
    oficinaInformation: {
        paddingTop: 2,
        color: "grey"
    },
    oficinaDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})
