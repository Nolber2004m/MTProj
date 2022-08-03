// In App.js in a new project
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Scanner from '../screens/scanner/Scanner';
import AddScanner from '../screens/scanner/AddScanner';
import SelectForm from '../components/scanners/SelectForm';
import ListaFacturas from '../components/scanners/ListaFacturas';
import Camara from '../components/scanners/Camara';
import TomarFactura from '../components/scanners/TomarFactura';
import FLEjemplo from '../components/reportes/FLEjemplo';
import FLElementos from '../components/reportes/FLElementos';
import FLSectionList from '../components/reportes/FLSectionList';
import Factura from '../screens/scanner/Factura';
import EjemploZoom from '../components/scanners/EjemploZoom';

const Stack = createStackNavigator()

export default function ScannerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="scanner"
                component={Scanner}
                options={{ title: "Facturas y registros",
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
                name="add-scanner"
                component={AddScanner}
                options={{ title: "Gestionar informacocion",
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
                name="selectform"
                component={SelectForm}
                options={{  title: "Consultar información",
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
                name="camara"
                component={Camara}
                options={{ title: "Tomar foto desde la camara",
                headerStyle: {
                    backgroundColor: '#3f51b5',} }}
                
            />  

             <Stack.Screen
                name="listadofactura"
                component={ListaFacturas}
                options={{ title: "Listado de factura",
                headerStyle: {
                    backgroundColor: '#3f51b5',} }}
                
            />   

            <Stack.Screen
                name="tomarfactura"
                component={TomarFactura}
                options={{ title: "Gestionar Facturas",
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
                name="ftejemplo"
                component={FLEjemplo}
                options={{ title: "Flatlist",
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
                name="flelementos"
                component={FLElementos}
                options={{ title: "FL Elementos",
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
                name="factura"
                component={Factura}              
            />

            <Stack.Screen
                name="flsectionlist"
                component={FLSectionList}
                options={{ title: "FL Elementos",
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
                name="ejemplozoom"
                component={EjemploZoom}
                options={{ title: "FL Elementos",
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



        </Stack.Navigator>
    )
}
