import { View, Text, TabBarIOSItem } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import Scanner from '../screens/Scanner'
import Account from '../screens/Account'
import Mtpro from '../screens/Mtpro'


const Tab = createBottomTabNavigator()


export default function Navigations() {
  return (
   <NavigationContainer>
    <Tab.Navigator>
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
            component={Account}
            options={{title:'Cuenta'}}

        />


    </Tab.Navigator>

   </NavigationContainer>
  )
}