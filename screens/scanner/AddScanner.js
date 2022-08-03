import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

import AddScannerForm from '../../components/scanners/AddScannerForm'

export default function AddScanner({navigation}) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
    <KeyboardAwareScrollView>    
      <AddScannerForm   
        toastRef={toastRef} 
        setLoading={setLoading}
        navigation={navigation}/>
         <Loading isVisible={loading} text="Creando imagenes..."/>
        <Toast ref={toastRef} position="center" opacity={0.9}/>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})