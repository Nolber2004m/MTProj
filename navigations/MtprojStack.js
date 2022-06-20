// In App.js in a new project
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Mtpro from '../screens/Mtpro';

const Stack = createStackNavigator()

export default function MtProjStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Mtpro}
                options={{ title: "Restaurantes" }}
            />           
        </Stack.Navigator>
    )
}
