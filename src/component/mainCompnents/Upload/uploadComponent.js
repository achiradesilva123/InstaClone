import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {InputWrapper,InputField} from "../../../assets/style/addPostComponent/addPostStyle";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from "react-native-elements";


const {width,height} = Dimensions.get('window');

const Upload = () => {

    const [image , setImage] = useState('');

    const takePhoto  = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image.path)
        });

    };
    const choosePhoto  = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image.path)
        });
    };

    return(
        <View style={styles.container}>
            <InputWrapper>
                <View style={styles.imageWrapper}>
                  <ImageBackground source={{
                      uri : image
                  }} style={{width : width/1.5 ,height :  height/3}}/>
                </View>
                <InputField
                  placeholder = "What's on your mind?"
                  multilines
                  numberOfLines={4}
                />
                <Button
                    title="Post"
                    type="outline"
                    buttonStyle={{width : 100}}
                />
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={takePhoto}>
                    <Icon name="md-camera" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={choosePhoto}>
                    <Icon name="md-attach" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    )
};

export default Upload;

const styles = StyleSheet.create({
   container : {
       flex :  1,
       justifyContent :  'center',
       alignItems : 'center'
   },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    imageWrapper : {
       width : width/1.5,
       height : height/3,
       borderColor : 'black',
       borderWidth : 1
    }
});

