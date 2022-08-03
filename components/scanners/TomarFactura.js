import { useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
 import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
import uuid from 'random-uuid-v4'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import * as Permissions from 'expo-permissions'

import { addDocumentWithoutId, getCurrentUser, uploadImage } from '../../utils/Actions'
import {  PinchGestureHandler,onGestureEvent, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native-web';
import { isEmpty, size, values } from 'lodash';

export default function TomarFactura({ toastRef, setLoading, navigation }) {

  const [formData, setFormData] = useState(defaultFormValues())
  const [errorAmount, setErrorAmount] = useState(null)
  const [errorPesoCarga, setErrorPesoCarga] = useState(null)
  const [errorCompany, setErrorCompany] = useState(null)

  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [result,setResult] = useState("");


  

  const validForm = () => {
    clearErrors()
    let isValid = true

    if (isEmpty(formData.amount)) {
        setErrorAmount("Debes ingresar un monto.")
        isValid = false
    }

    if (isEmpty(formData.pesoCarga)) {
        setErrorPesoCarga("Debes ingresar un peso de la carga.")
        isValid = false
    }

    if (isEmpty(formData.company)) {
        setErrorCompany("Debes ingresar una compañia.")
        isValid = false
    }


    return isValid
  }

  const clearErrors = () => {
    setErrorAmount(null)
    setErrorPesoCarga(null)
    setErrorCompany(null)

  }

  const addFactura = async() => {
        if (!validForm()) {
            return
         }

     // setLoading(true)

      const responseUploadImages = await uploadImages()

      const factura = {
        amount: formData.amount,
        pesoCarga: formData.pesoCarga,
        company: formData.company,
        images: responseUploadImages,
        createAt: new Date(),       
        createBy: getCurrentUser().uid
      }
 
      const responseAddDocument = await addDocumentWithoutId("facturas", factura)
      
     // setLoading(false)

      if (!responseAddDocument.statusResponse) {
          toastRef.current.show("Error al grabar la Oficina, por favor intenta más tarde.", 3000)
          return
      } 

      navigation.navigate("scanner")
  }

  const uploadImages = async() => {
    const imagesUrl = []
   
    const response = await uploadImage(pickedImagePath, "facturas/", uuid())
    if (response.statusResponse) {
      imagesUrl.push(response.url)
    }
   
    return imagesUrl
}

 
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const finallyOcr = async    () => {
    console.log(pickedImagePath)
    const resultFromUri = await MlkitOcr?.detectFromUri(pickedImagePath);
    console.log(resultFromUri)
}


const pickFromCamera = async ()=>{
  const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
  if(granted){
     let data =  await ImagePicker.launchCameraAsync({
       mediaTypes:ImagePicker.MediaTypeOptions.Images,
       allowsEditing:true,
       aspect:[4,3],
       quality:1
     })
    if(!data.cancelled){
      let newfile = { 
       uri:data.uri,
       type:`test/${data.uri.split(".")[1]}`,
       name:`test.${data.uri.split(".")[1]}` 

     }

      

     if (!newfile.cancelled) {
      setPickedImagePath(newfile.uri);
     
    }
    
    }
  }else{
    Alert.alert("you need to give up permission to work")
  }
 }

  return (

    <ScrollView style={styles.viewContainer}>
        
      <View style={styles.buttonContainer}>
        <Button style={styles.boton} onPress={showImagePicker} title="Selecciona una imagen" />
        <Button style={styles.boton} onPress={pickFromCamera} title="Abrir la camara" />
        
        
      
      </View>

      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />    


        }
      </View>

      <Button  style={styles.boton} onPress={finallyOcr} title="Cargar información" />


        
       <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorAmount={errorAmount}
                errorPesoCarga={errorPesoCarga}
                errorCompany={errorCompany}              
            />

       
        {
          pickedImagePath !== '' && 
        <Button
                title="Guardar registro de factura"
                onPress={addFactura}
                buttonStyle={styles.btnAddOficina}
            /> 
        }

    </ScrollView>
  );


}



function FormAdd({ 
  formData, 
  setFormData, 
  errorAmount,
  errorPesoCarga,
  errorCompany,
}) {
 

  const onChange = (e, type) => {
      setFormData({ ...formData, [type] : e.nativeEvent.text })
  }
  
  return (
    
      <View style={styles.viewForm}>
          <Input
              keyboardType="decimal-pad"
              placeholder="Importe de la carga..."
              defaultValue={formData.amount}
              onChange={(e) => onChange(e, "amount")}
              errorMessage={errorAmount}
          />
          <Input
              keyboardType="decimal-pad"
              placeholder="Peso de la carga..."
              defaultValue={formData.pesoCarga}
              onChange={(e) => onChange(e, "pesoCarga")}
              errorMessage={errorPesoCarga}
          />           
          <Input
              
              placeholder="Compañia..."         
              defaultValue={formData.company}      
              onChange={(e) => onChange(e, "company")}
              errorMessage={errorCompany}
          />           
     
      </View>
  )
}



const defaultFormValues = () => {
  return {
      amount: 0.00,
      pesoCarga: 0,
      company: ""
  }
}




// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    height: "100%"
},
  buttonContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-around',
   
  },
  textArea: {
    height: 100,
    width: "100%"
},
  imageContainer: {
    padding: 20
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  },

  boton:{
    color: "red",
  },

  viewForm: {
    marginHorizontal: 10,
},
textArea: {
    height: 100,
    width: "100%"
},
});