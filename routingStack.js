import React from 'react';

//react native navigation
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

//import screens
import Landing from './src/screen/Landing/landing'
import Login from './src/screen/Login/login'
import SignUp from "./src/screen/SignUp/signUp";
import MainScreen from "./src/screen/Main/mainScreen";
import {Icon} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function routinStack() {
    return(
        <NavigationContainer>
            <RoutingComponent/>
        </NavigationContainer>
    )
}

const Stack = createStackNavigator();

function RoutingComponent() {
 return(
     <Stack.Navigator>
         <Stack.Screen name="Landing" component={Landing}
            options={{
                headerShown: false
            }}
         />
         <Stack.Screen name="Login" component={Login}
            options={{
                headerShown: false
            }}
         />
         <Stack.Screen name="SignUp" component={SignUp}
             options={{
                           headerShown: false
           }}
         />
         <Stack.Screen name="Main" component={MainScreen}
                       options={{
                           // headerShown: false,
                           headerLeft: () => <FontAwesome name="camera"   style={{paddingLeft : 15}} size={20}/>,
                           title : "Instagram",
                           headerTitleAlign: 'center',
                           headerRight : () =><FontAwesome name="send"   style={{paddingRight : 15}} size={20}/>,
                       }}
         />
         {/*<Stack.Screen name="Settings" component={s} />*/}
     </Stack.Navigator>
 )
}

