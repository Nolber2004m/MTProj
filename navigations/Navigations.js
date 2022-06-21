import { View, Text, TabBarIOSItem } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'


import Scanner from '../screens/Scanner'
import Mtpro from '../screens/Mtpro'
import Account from '../screens/account/Account'
import AccountStack from './AccountStack'


const Tab = createBottomTabNavigator()


export default function Navigations() {
  
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "mtpro":
                iconName = "truck-cargo-container"
                break;
            case "scanner":
                iconName = "barcode-scan"
                break;           
            case "cuenta":
                iconName = "account-cog"
                break;
        }
        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }


  return (
   <NavigationContainer>
    <Tab.Navigator
     initialRouteName="restaurants"
     tabBarOptions={{
         inactiveTintColor: "#a17dc3",
         activeTintColor: "#442484" 
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color)
        })}
    >

        <Tab.Screen 
            name='mtpro'
            component={Mtpro}
            options={{title:"Mega trucking"}}
        />

        <Tab.Screen 
            name='scanner'
            component={Scanner}
            options={{title:'Scanner'}}
        /> 

        <Tab.Screen 
            name='cuenta'
            component={AccountStack}
            options={{title:'Datos de la Cuenta'}}

        />


    </Tab.Navigator>

   </NavigationContainer>
  )
}