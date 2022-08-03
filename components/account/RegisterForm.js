import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input} from 'react-native-elements'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { validateEmail } from '../../utils/helpers'
import {size} from 'lodash'
import { Dropdown } from 'react-native-element-dropdown';


import { registerUser } from '../../utils/Actions'
import Loading from '../Loading'
import SelectCountryScreen from '../SelectCountryScreen'


export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)
   
 
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    

    const navigation = useNavigation()

    const data = [
        { label: 'Administrador', value: 'Administrador' },
        { label: 'Gerente', value: 'Gerente' },
        { label: 'Chofer', value: 'Chofer' },
        { label: 'Contador', value: 'Chofer' },      
      ];

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    
    const doRegisterUser = async() => {
       
        console.log(value)

        if (!validateData()) {
            return;
        }

        setLoading(true)

        
        const i = "espanol"
       
        const result = await registerUser(formData.email, formData.password, value, i)
        if (!result.statusResponse) {
            setLoading(false)
            setErrorEmail(result.error)
            return
        }

        setLoading(false)
        navigation.navigate("account")
    }


    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if(!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }

        if(size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos seis carácteres.")
            isValid = false
        }

        if(size(formData.confirm) < 6) {
            setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos seis carácteres.")
            isValid = false
        }

        if(formData.password !== formData.confirm) {
            setErrorPassword("La contraseña y la confirmación no son iguales.")
            setErrorConfirm("La contraseña y la confirmación no son iguales.")
            isValid = false
        }

        return isValid
    }

    return (
    <View style={styles.form}>
        <Input
            containerStyle={styles.input} 
            placeholder="Ingresa tu email..."
            onChange={(e) => onChange(e, "email")}
            keyboardType="email-address"
            errorMessage={errorEmail}
            defaultValue={formData.email}
            />
         
         <Input
           containerStyle={styles.input}
           placeholder="Ingresa tu contraseña..."
           password={true}
           secureTextEntry={!showPassword}
           onChange={(e) => onChange(e, "password")}
           errorMessage={errorPassword}
           defaultValue={formData.password}

            rightIcon={
                <Icon
                    type="material-community"
                    name={ showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}                

                />
            }
            />

        <Input
            containerStyle={styles.input}
            placeholder="Ingresa tu contraseña..."
            password={true}
            secureTextEntry={!showPassword}
            onChange={(e) => onChange(e, "confirm")}
            errorMessage={errorConfirm}
            defaultValue={formData.confirm}


            rightIcon={
                <Icon
                    type="material-community"
                    name={ showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress={() => setShowPassword(!showPassword)}
               
                    />
            }
            />  

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Selecciona un Rol' : '...'}
          searchPlaceholder="Buscar..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
         
        />

        <SelectCountryScreen></SelectCountryScreen>
       
          


            <Button
                title="Registrar Nuevo Usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />
            <Loading isVisible={loading} text="Creando cuenta..."/>   
    </View>
  )
}




const defaultFormValues = () => {
    return { email: "", password: "", confirm: "", roll: "" }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: "100%"
    },  
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    },
    dropdown: {
        marginTop: 5,
        width: "95%",
        alignSelf: "center",
        height: 50,
        borderColor: '#442484',
        borderWidth: 0.7,
        borderRadius: 9,
        paddingHorizontal: 8,
    
      },
      
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})
