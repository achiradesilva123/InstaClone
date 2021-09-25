import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {InputWrapper,InputField} from "../../../assets/style/addPostComponent/addPostStyle";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const Upload = () => {
    return(
        <View style={styles.container}>
            <InputWrapper>
                <InputField
                  placeholder = "What's on your mind?"
                  multilines
                  numberOfLines={4}
                />
            </InputWrapper>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={() => console.log("notes tapped!")}>
                    <Icon name="md-camera" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={() => {}}>
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
    }
});

