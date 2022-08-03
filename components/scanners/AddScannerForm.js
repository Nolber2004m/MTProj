import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import { map, size, filter, isEmpty } from 'lodash' 

import { loadImageFromGallery,tomarImageFromCamera } from '../../utils/helpers'


import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getStorage
  } from "firebase/storage";

  import { storage } from '../../utils/firebase';
  import { v4 } from "uuid";  

export default function AddScannerForm({toastRef,loading, navigation}) {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
   
    const [imagesSelected, setImagesSelected] = useState([])


    
  const imagesListRef = ref(storage, "avatars/");

  const changePhoto = async() => {
    const result = await loadImageFromGallery([1, 1])
    imageUpload.name = result.image
  }

  const takePhoto = async() => {
    const result = await loadImageFromGallery([1, 1])
    imageUpload.name = result.image
  }

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (

    
    <ScrollView style={styles.viewContainer}>

            <Avatar
                //style={styles.btnAddScanner}
                rounded
                size="xlarge"          
                //onPress={changePhoto}
                source={require("../../assets/uploadimagen.jpg")}   
                onPress={() => navigation.navigate("tomarfactura")}
                  
            />

          

            <Avatar
               // style={styles.btnAddScanner}
                rounded
                size="xlarge"      
              
                source={require("../../assets/registroimagen.jpg")}     
                onPress={() => navigation.navigate("selectform")}        
                
            />


           
        </ScrollView>
  )
}


const styles = StyleSheet.create({
    viewContainer: {
        height: "100%",
        alignSelf:"center"

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

    btnAddScanner: {
       alignContent:"center"
       
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