import * as React from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {StyleSheet, Text, TouchableHighlight, View, SafeAreaView, TextInput, Alert,Dimensions} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import auth from '@react-native-firebase/auth';
import {useEffect} from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
const { width } = Dimensions.get('window');

const LoginComponent = ( {navigation} ) => {
    const [text, setText] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '307582013279-e7mdc75eg86rtu6d5nt1gqaiu0mi35ri.apps.googleusercontent.com',
        });
    });


    const hasErrors = () => {
        return !text.includes('@');
    };

    const onChangeText = text => setText(text);

    const handlePress = () => {
        if( email === '' && password === '' ){
            Alert.alert(
                "Fields missing !",
                "fill all required",
                [
                    // {
                    //     text: "Cancel",
                    //     onPress: () => console.log("Cancel Pressed"),
                    //     style: "cancel"
                    // },
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ]
            );
        }else{
            auth()
                .signInWithEmailAndPassword(email,password)
                .then( (resp) => {
                  if(resp.user === null){
                      alert("No user Found!")
                  }else{
                      navigation.navigate('Main',{
                          user : resp.user
                      })
                  }
                }).catch(e => {
                    alert(e.message)
            });
            console.log(email);
        }
    };

    const googleSign = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            await logIn(userInfo);
            // this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const faceBookSign = async () => {
// Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
    };

    const logIn = (userInfo) => {
        if(userInfo !== null){
            navigation.navigate('Main',{
                user : userInfo.user
            })
        }
    };

   const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            // this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    return(
     <Card style={{width: '85%', elevation : 0}}>
        <Card.Content>
            <View style={styles.txtInputArea}>
                <SafeAreaView style={{padding : 0}}>
                 <TextInput
                     style={styles.input}
                     // onChangeText={onChangeText}
                     // value={text}
                     placeholder="Phone number,username, or email"
                     onChangeText={ (text) => {
                        setEmail(text);
                     }}
                 />
                 <TextInput
                     style={styles.input}
                     // onChangeText={onChangeNumber}
                     // value={number}
                     placeholder="Password"
                     autoCompleteType ="password"
                     onChangeText={ (text) => {
                         setPassword(text);
                     }}
                 />
             </SafeAreaView>
         </View>
            <TouchableHighlight onPress={handlePress} underlayColor = '#fff'>
                <View style={styles.button}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={[styles.txt,{textAlign: 'center'}]}>Log In</Text>
                    </View>
                </View>
            </TouchableHighlight>

            <View style={{flexDirection : 'row', justifyContent : 'center' , margin: 5}}>
                <Text style={{fontSize: 10}}>Forgot your login details? </Text>
                <Text style={{fontSize: 10 , fontWeight: 'bold'}}>Get help logging in</Text>
            </View>

            <View style={{flexDirection : 'row'}}>
                <View style={{flex: 0.5, height: 2, backgroundColor: '#8f8f8f' , marginTop: 10}} />
                <Text style={{textAlign : 'center',marginHorizontal : 10}}>OR</Text>
                <View style={{ flex: 0.5, height: 2, backgroundColor: '#8f8f8f',marginTop: 10 }} />
            </View>

            <TouchableHighlight onPress={faceBookSign} underlayColor ='#fff'>
                <View style={styles.bt_bottom}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <FontAwesome name="facebook" size={18} color={'white'}/>
                        <Text style={styles.txt_bt}>Log in with FaceBook</Text>
                    </View>
                </View>
            </TouchableHighlight>


            <TouchableHighlight onPress={googleSign} underlayColor ='#fff'>
                <View style={styles.bt_bottom_2}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <FontAwesome name="google" size={18} color={'white'}/>
                        <Text style={styles.txt_bt}>Log in with Google</Text>
                    </View>
                </View>
            </TouchableHighlight>


        </Card.Content>
        {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
    </Card>
)};

export default LoginComponent;

const styles = StyleSheet.create({
    txt : {
        marginLeft : 10,
        fontWeight : 'bold',
        letterSpacing : 2,
        color  : '#fff',
        fontSize : 15
    },

    txt_bt : {
        marginLeft : 10,
        fontWeight : 'bold',
        letterSpacing : 2,
        color  : 'white',
        fontSize : 12
    },

    button : {
        width: 290,
        height: 40,
        backgroundColor : '#3797F0',
        padding : 10,
        borderRadius : 5,
        margin: 10,
    },
    bt_bottom :{
        width: 290,
        height: 40,
        backgroundColor : '#0029FA',
        padding : 10,
        borderRadius : 5,
        margin: 10
    },
    bt_bottom_2 :{
        width: 290,
        height: 40,
        backgroundColor : '#F07178',
        padding : 10,
        borderRadius : 5,
        margin: 10
    },
    txtInputArea: {
        marginTop : 0,
        // padding: 3,
    },
    // textInput : {
    //     height: 40,
    //     marginTop: 8
    // },
    input: {
        height: 40,
        margin: 12,
        backgroundColor : '#F9FAF9',
        // borderWidth: 1,
        padding: 10,
    },
});

