import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableHighlight,Alert} from 'react-native'
import {Input, NativeBaseProvider, extendTheme} from 'native-base';
import { Button } from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import md5 from "react-native-md5";
import {err} from "react-native-svg/lib/typescript/xml";

const SignUpComponent = ( {navigation} ) => {

    const [emailSt,setEmailSt] = useState(false);
    const [passSt,setPassSt] = useState(false);


    const [btState ,setBtState] = useState(0);
    const [buttonSt,setButtonSt] = useState(true);
    const [btDisableSt,setDisableSt] =useState(true);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState(null);
    const [userName,setUserName] = useState(null);

    const isFormValid = () => {
      return (email === null && password === null && userName === null);
    };


    const handlePress = ()=> {
        if (isFormValid()) {
            Alert.alert(
                "Fields missing !",
                "fill all required",
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ]
            );
        } else {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    createdUser.user.updateProfile({
                        displayName : userName,
                        photoURL : `http://gravatar.com/avatar/${md5.str_md5(createdUser.user.email)}?d=identicon`
                    }).then( (user) => {
                       saveUser(createdUser)
                    }).catch( (err => {
                        alert(err.message)
                    }))

                })
                .catch(error => {
                  alert(error.message)
                });
        }
    };

   const saveUser = createdUser =>{
       console.log(createdUser);
       firestore()
           .collection('Users')
           .add({
               id : createdUser.user.uid,
               name:userName,
               imageUri: createdUser.user.photoURL,
           })
           .then(() => {
               console.log('User added!');
           });
    };

    return(
      <View style={styles.container}>
          <View style={{flexDirection : 'row'}}>
              <TouchableHighlight onPress={() => {
                  setBtState(0);
                  setButtonSt(true);
              }} underlayColor = '#fff'>
                  <View style={[styles.button,{borderBottomColor : btState === 0 ?'black' : 'gray',  borderBottomWidth: btState === 0 ? 1.5 :1,}]}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                          <Text style={[styles.txt,{textAlign: 'center'}]}>PHONE</Text>
                      </View>
                  </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => {
                  setBtState(1);
                  setButtonSt(false);
              }} underlayColor = '#fff'>
                  <View style={[styles.button,{borderBottomColor :btState === 1 ?'black' : 'gray',borderBottomWidth: btState === 1 ? 1.5 :1}]}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                          <Text style={[styles.txt,{textAlign: 'center'}]}>EMAIL</Text>
                      </View>
                  </View>
              </TouchableHighlight>
          </View>
          {buttonSt ?
              <NativeBaseProvider theme={theme} >
              <Input
                  InputLeftElement={
                      <View style={{flexDirection : 'row'}}>
                          <Text style={{marginLeft :10 ,marginVertical : 6 , marginRight : 3}}> LK  +94 </Text>
                          <View style={styles.verticalLine}/>
                      </View>

                  }
                  placeholder="Phone" // mx={4}
                  _light={{
                      placeholderTextColor: "blueGray.400",
                  }}
                  _dark={{
                      placeholderTextColor: "blueGray.50",
                  }}
              />

                  <View style={{
                      width : '90%',
                      flexDirection : 'row',
                      justifyContent: 'center',
                      alignItems : 'center',
                      padding : 8,
                      marginTop: 10
                  }}>
                      <Text style={{
                          textAlign : 'center',
                          fontSize : 12,
                          width :300,
                          color : '#969696'
                      }}>You may receive SMS updates from instagram and opt out at any time</Text>
                  </View>

              <Button
                  title="Next"
                  type="solid"
                  buttonStyle={{
                      width : (width -40),
                      marginTop : 12
                  }}
                  disabled={btDisableSt}
                  disabledStyle={ {
                      backgroundColor :'#B2DFFC',
                      marginTop : 12
                  } }
              />
          </NativeBaseProvider>
              :  <View>
                  <View>
                      <NativeBaseProvider theme={Theme} >
                          <Input
                              placeholder="email" // mx={4}
                              _light={{
                                  placeholderTextColor: "blueGray.400",
                              }}
                              _dark={{
                                  placeholderTextColor: "blueGray.50",
                              }}
                              onChange={(txt) => {
                                  // setUserName(txt);
                                  // isFormValid()
                              }}

                              onChangeText={ (txt) => {
                                  setEmail(txt);
                              }}

                          />
                          <Input
                              placeholder="user name" // mx={4}
                              _light={{
                                  placeholderTextColor: "blueGray.400",
                              }}
                              _dark={{
                                  placeholderTextColor: "blueGray.50",
                              }}
                              onChange={(txt) => {
                                  // setUserName(txt);
                                  // isFormValid()
                               }}

                              onChangeText={ (txt) => {
                                  setUserName(txt);
                              }}

                          />
                          <Input
                              placeholder="password" // mx={4}
                              _light={{
                                  placeholderTextColor: "blueGray.400",
                              }}
                              _dark={{
                                  placeholderTextColor: "blueGray.50",
                              }}
                              style={ { marginTop : 10}}
                              type = {"password"}
                              onChange={ (txt) => {
                                  setPassSt(true);
                                  // isFormValid()
                              }}
                              onChangeText={ (txt) => {
                                  setPassword(txt);
                              }}
                          />
                      </NativeBaseProvider>
                  </View>
                  <View>
                      <Button
                          title="Next"
                          type="solid"
                          buttonStyle={{
                              width : (width -40)
                          }}
                          // disabled={btDisableSt}
                          disabledStyle={ {
                              backgroundColor :'#B2DFFC',
                              marginTop : 12
                          } }
                          onPress={ handlePress }
                      />
                  </View>
              </View>
              }
      </View>

    )
};

export default SignUpComponent;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container : {
      flex : 0.3,
      justifyContent : 'center',
      alignItems : 'center',
    },
    img : {

    },
    verticalLine: {
        height: 30,
        width: 1,
        backgroundColor: 'black' ,
        // borderLeftWidth: 1,
        // borderLeftColor: 'black',
    } ,
    button : {
        width: width/2.5,
        height: 40,
        // backgroundColor : '#3797F0',
        padding : 6,
        borderRadius : 5,
        // margin: 10,
        borderBottomWidth: 1.5,
        marginBottom : 15
    },
    txt : {
        marginLeft : 10,
        // fontWeight : 'bold',
        // letterSpacing : 2,
        // color  : '#fff',
        fontSize : 15
    }
});

const theme = extendTheme({
    components: {
        Input: {
            baseStyle: {width: "90%"},
            // defaultProps: {width: 100},
            // variants: {width: 100},
            // sizes: { width: 100},
        }
    }
});

const Theme = extendTheme({
    components: {
        Input: {
            baseStyle: {width: (width-40)},
            // defaultProps: {width: 100},
            // variants: {width: 100},
            // sizes: { width: 100},
        },
    }
});