import React from 'react';
import {View,Text,StyleSheet, Image,Button , TouchableHighlight} from 'react-native'

import Logo from '../../assets/img/landing/Instagram_logo.png'
import LoginComponent from "../../component/loginComponent/loginComponent";
import { Link } from '@react-navigation/native';

const Login = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Image source={Logo}  style={styles.img} />
            <LoginComponent navigation ={navigation}/>
              <View style={{position : 'absolute' , bottom : 20 ,width : '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection : 'row',paddingBottom:10}}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#8f8f8f' , marginTop: 10}} />
                </View>
                  <View style={{flexDirection : 'row', justifyContent : 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 12}}>Don't have an account?</Text>
                      <Link  style={{fontSize: 12 , fontWeight: 'bold'}} to={{ screen : 'SignUp'}}>Sign Up</Link>
                  </View>
            </View>
        </View>
    )
};

export default Login;

const styles = StyleSheet.create({
    container :{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#ffffff'
    },
    txt : {
      marginLeft : 10,
      fontWeight : 'bold',
      letterSpacing : 2,
      color  : '#fff',
      fontSize : 15
    },
    img : {
        width : "50%",
        height : "10%",
        resizeMode: 'cover',
    },
    button : {
        width: 300,
        height: 40,
        backgroundColor : '#3797F0',
        padding : 10,
        borderRadius : 10
    }
});



