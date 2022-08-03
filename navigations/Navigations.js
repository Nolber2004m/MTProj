import { View, Text, TabBarIOSItem } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon, Image } from 'react-native-elements'


import AccountStack from './AccountStack'
import ScannerStack from './ScannerStack'
import MtProjStack from './MtprojStack'


const Tab = createBottomTabNavigator()


export default function Navigations() {
  
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "mtprostack":
                iconName = "truck-cargo-container"
                break;
            case "scannerbc":
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
                size={35}
                color={color}
            />
        )
    }


  return (
   <NavigationContainer>
    <Tab.Navigator
     initialRouteName="mtprostack"
     tabBarOptions={{
         inactiveTintColor: "#a17dc3",
         activeTintColor: "#442484" 
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color)
        })}
    >

        <Tab.Screen 
            name='mtprostack'
            component={MtProjStack}
            options={{headerLeft: () => (
                <Image
                  style={{ width: 30, height: 30, margin: 20 }}
                  source={require("../assets/1595382790477.jpg")}
                />
              ),
              
              title:"Mega trucking", 
            
            headerStyle: {
                backgroundColor: '#2196f3',},
                headerTintColor: '#fff',
                headerTitleStyle: {
                 // fontFamily: 'Cochin',
                  fontWeight: 'bold',
                  fontSize: 20,
                },
        }}
        />

        <Tab.Screen 
            name='scannerbc'
            component={ScannerStack}
            options={{
                headerLeft: () => (
                    <Image
                      style={{ width: 30, height: 30, margin: 20 }}
                      source={require("../assets/1595382790477.jpg")}
                    />
                  ),
                title:'Scanner', 
            headerStyle: {
                backgroundColor: '#2196f3',},
                headerTintColor: '#fff',
                headerTitleStyle: {
                 // fontFamily: 'Cochin',
                  fontWeight: 'bold',
                  fontSize: 20,
                },
            }}
        /> 

        <Tab.Screen 
            name='cuenta'
            component={AccountStack}
            options={{
                headerLeft: () => (
                    <Image
                      style={{ width: 30, height: 30, margin: 20 }}
                      source={require("../assets/1595382790477.jpg")}
                    />
                  ),
                
                title:'Datos de la Cuenta', 
            headerStyle: {
                backgroundColor: '#2196f3',},
                headerTintColor: '#fff',
                headerTitleStyle: {
                 // fontFamily: 'Cochin',
                  fontWeight: 'bold',
                  fontSize: 20,
                },
            }}

        />


    </Tab.Navigator>

   </NavigationContainer>
  )
}