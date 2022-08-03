import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import { map, size, filter, isEmpty } from 'lodash' 

export default function SelectForm({ toastRef, setLoading, navigation }) {
 

    return (
        <ScrollView style={styles.viewContainer}>

        
            <Button
                title="Guardar registro de factura"              
                buttonStyle={styles.btnAddOficina}
                onPress={() => navigation.navigate("ftejemplo")} 
            /> 

             <Button
                title="Guardar registro de factura"              
                buttonStyle={styles.btnAddOficina}
                onPress={() => navigation.navigate("flelementos")} 
            /> 

             <Button
                title="Guardar registro de factura"              
                buttonStyle={styles.btnAddOficina}
                onPress={() => navigation.navigate("flsectionlist")} 
            />   

            <Button
                title="Zoom"              
                buttonStyle={styles.btnAddOficina}
                onPress={() => navigation.navigate("ejemplozoom")} 
            /> 
                      
          
        </ScrollView>
    )
}
 
const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10,
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddOficina: {
        margin: 20,
        backgroundColor: "#499fff"
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#a65273"
    },
    viewMapBtnSave: {
        backgroundColor: "#442484"
    }
})
