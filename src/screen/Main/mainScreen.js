import React, {Component, useEffect} from 'react';
import { View , Text ,StyleSheet} from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";


//screens
import Home from "../../component/mainCompnents/Home/homeComponent";
import Search from "../../component/mainCompnents/Search/searchComponent";
import User from "../../component/mainCompnents/User/userComponent";
import Upload from "../../component/mainCompnents/Upload/uploadComponent";
import {Icon} from "react-native-vector-icons";


const MainScreen =( {navigation, route}) => {

    // render() {
    //     const {user1} = props;

        useEffect( () => {{
          setData();
        }});

        const setData = () => {
            const { user } = route.params;
            console.log(user)
        };

        const Tab = createMaterialBottomTabNavigator();
        return (
            <Tab.Navigator
                initialRouteName="Feed"
                activeColor="#e91e63"
                tabBarOptions={customTabBarStyle}
                shifting="false"
                barStyle={{ backgroundColor: '#fff' ,activeColor : 'grey'}}

            >
                <Tab.Screen name="Home" component={Home}
                            options = {{
                                tabBarIcon : () =>   <FontAwesome name="home"  size={18} color={'grey'} style={{ marginTop : 5}}/>,
                                tabBarLabel : () => null
                            }}
                />
                <Tab.Screen name="Search" component={Search}
                            options = {{
                                tabBarIcon : () =>   <FontAwesome name="search"  size={18} color={'grey'} style={{ marginTop : 5}}/>,
                                tabBarLabel : () => null
                            }}
                />
                <Tab.Screen name="Upload" component={Upload}
                            options = {{
                                tabBarIcon : () =>   <FontAwesome name="upload"  size={18} color={'grey'} style={{ marginTop : 5}}/>,
                                tabBarLabel : () => null
                            }}
                            // options={{
                            //     tabBarLabel: '',
                            //     tabBarIcon: ({ color }) => (
                            //         <View
                            //             style={{
                            //                 position: 'absolute',
                            //                 bottom: 0, // space from bottombar
                            //                 height: 68,
                            //                 width: 68,
                            //                 borderRadius: 68,
                            //                 justifyContent: 'center',
                            //                 alignItems: 'center',
                            //             }}
                            //         >
                            //             <Icon name="add-circle-outline" color="grey" size={68}/>
                            //         </View>
                            //     )
                            // }}
                />

                <Tab.Screen name="User" component={User}
                            options = {{
                                tabBarIcon : () =>   <FontAwesome name="user"  size={18} color={'grey'} style={{ marginTop : 5}}/>,
                                tabBarLabel : () => null
                            }}
                />
            </Tab.Navigator>
        );
    // }
};

export default MainScreen;

const customTabBarStyle = {
    activeTintColor: '#0091EA',
    inactiveTintColor: 'gray',
    style: {backgroundColor: 'white' },
};

