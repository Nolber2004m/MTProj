// In App.js in a new project
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Mtpro from '../screens/principal/Mtpro';
import AddMTProj from '../screens/principal/AddMTProj';
import Oficina from '../screens/principal/Oficina';

const Stack = createStackNavigator()

export default function MtProjStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="mtpro"
                component={Mtpro}
                options={{ title: "Mega trucking proyecto",
                headerStyle: {
                    backgroundColor: '#3f51b5',},
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                     //fontFamily: 'Cochin',
                      fontWeight: 'bold',
                      fontSize: 20,
                    },
            
            }}
            />  
            <Stack.Screen
                name="addmtproj"
                component={AddMTProj}
                options={{ title: "Adiciona oficinas",
                headerStyle: {
                    backgroundColor: '#3f51b5',},
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                     // fontFamily: 'Cochin',
                      fontWeight: 'bold',
                      fontSize: 20,
                    },
            }}
            />           
            <Stack.Screen
                name="oficina"
                component={Oficina}              
            />
        </Stack.Navigator>
    )
}
