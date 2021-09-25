import React,{useEffect} from 'react';
import {View, Text, ImageBackground , StyleSheet ,Animated} from 'react-native';
import backImage from "../../assets/img/landing/landing.jpg";
import {useState} from "react/cjs/react.production.min";



const Landing = ( {navigation} ) => {

    const switchAuth = () => {
       navigation.navigate('Login')
    };

    useEffect( () => {
        setTimeout( () => { switchAuth()},1000)
    });

    return(
        <ImageBackground
            source={backImage}
            resizeMode = 'cover'
            style={styles.backImage}
        />
    )
};

export default Landing;

const styles = StyleSheet.create({
    backImage : {
        width :'100%',
        height :'100%',
    }
});