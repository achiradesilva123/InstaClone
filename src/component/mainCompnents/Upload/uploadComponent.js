import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, ActivityIndicator} from 'react-native';
import {InputWrapper,InputField,StatusWrapper} from "../../../assets/style/addPostComponent/addPostStyle";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from "react-native-elements";

import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';

const {width,height} = Dimensions.get('window');

const Upload = () => {

    const [image , setImage] = useState('');
    const [message , setMessage] = useState('');
    const [upload , setUpload] = useState(false);
    const [transfer , setTransfer] = useState(0);

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

    const Submit = async  () => {
      const uploadUri = image;
      let fileName = uploadUri.substring(uploadUri.lastIndexOf('/')+1);

      const extension = fileName.split('.').pop();
      const name = fileName.split('.').slice(0,-1).join('.');
      fileName = name +Date.now() + '.' + extension;

      setUpload(true);
      setTransfer(0);

        let task = storage().ref(fileName).putFile(uploadUri);

        try{
            await task;
            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

                setTransfer(
                    Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes )*100
                );

            });
            const taskCompleted = () => {
                task.snapshot.ref.getDownloadURL().then((snapshot) => {
                    savePost(snapshot);
                })
            };


            Alert.alert(
              'image Uploaded!',
              'Your image has been uploaded to thr Firebase Cloud'
          );

          setImage(null)

      }catch (e) {
          alert(e.message)
      }

    };

    const savePost = (uri) => {

        firestore()
            .collection('Post')
            .add({
                id : Math.random().toString(36),
                content : message,
                imageUri: uri,
                user : auth().currentUser
            })
            .then(() => {
                console.log('User added!');
            });
    };

    const isValid = () => (((image !== '' && image !== null) &&  (message !== '' && message !== null)) );

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
                  onChangeText = {(txt) => {
                      setMessage(txt);
                  }}
                />
                {upload ?(
                    <StatusWrapper>
                        <Text>{transfer} % Completed!</Text>
                        <ActivityIndicator size={'large'} color ="#0000f"/>
                    </StatusWrapper>
                ): (
                    <Button
                        title="Post"
                        type="outline"
                        buttonStyle={{width : 100}}
                        onPress={Submit}
                    />
                )}

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

