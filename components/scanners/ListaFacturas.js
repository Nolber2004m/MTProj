import { size } from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { formatPhone } from '../../utils/helpers'

export default function ListaFacturas({facturas, navigation }) {
    return (
        <View>
            <FlatList
                data={facturas}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                //onEndReached={handleLoadMore}
                renderItem={(factura) => (
                    <Factura factura={factura} navigation={navigation}/>
                )}
            />
        </View>
    )
}

function Factura({ factura, navigation }) {
    const { id, images, company, amount, pesoCarga } = factura.item
    const imageFactura = images[0]

    const goFactura = () => {
        navigation.navigate("factura", { id})
    } 

    return (        
        <TouchableOpacity onPress={goFactura}>
            <View style={styles.viewFacturas}>
                <View style={styles.viewFacturaImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={{ uri: imageFactura }}
                        style={styles.imageFactura}
                    />
                </View>
                <View>
                    <Text style={styles.facturaTitle}>{company}</Text>
                    <Text style={styles.facturaInformation}>Importe de la carga:</Text>
                    <Text style={styles.facturaTitle}>${amount}</Text>
                    <Text style={styles.facturaInformation}>Peso de carga:</Text>
                    <Text style={styles.facturaTitle}>{pesoCarga}</Text>
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewFacturas: {
        flexDirection: "row",
        margin: 10
    },
    viewFacturaImage: {
        marginRight: 15
    },
    imageFactura: {
        width: 90,
        height: 90
    },
    facturaTitle: {
        fontWeight: "bold"
    },
    facturaInformation: {
        paddingTop: 2,
        color: "grey"
    },
    facturaDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})
