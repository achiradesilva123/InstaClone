import React from 'react';
import {Image, StyleSheet, Text, View,Dimensions} from 'react-native'
import SignUpComponent from "../../component/signUpComponent/signUpCompo";

import UserLog from "../../assets/img/signUp/userLogopng.png";
import {Link} from "@react-navigation/native";

const SignUp = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Image source={UserLog} style ={styles.img}  resizeMode='cover'/>
            <SignUpComponent />
            <View style={{position : 'absolute' , bottom : 20 ,width : '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection : 'row',paddingBottom:10}}>
                    <View style={{flex: 1, height: 1, backgroundColor: '#8f8f8f' , marginTop: 10}} />
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 12}}>Already have an account?</Text>
                    <Link  style={{fontSize: 12 , fontWeight: 'bold'}} to={{ screen : 'Login'}}>Log in</Link>
                </View>
            </View>
        </View>
    )
};

export default SignUp;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#ffffff',
        margin : 0,
        padding : 0,
    },
    img : {
        margin : 0,
        padding : 0,
        width: '50%',
        height: '30%',
    }
});
