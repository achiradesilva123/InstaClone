import React from 'react';
import {Dimensions, Text ,Image,StyleSheet,View} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import { Card as cardCompo } from '../../../types';
import {width} from "styled-system";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export type cardItems = {
    card : cardCompo
}

const CardCompo = ( props : cardItems) => {
    const { width } = Dimensions.get('window');
    const { card } = props;
    const LeftContent = () =>  <Image source={{uri : card.user.imageUri}} style={styles.avatar} />;
    return(
        <Card style={[styles.container,{ width:   width}]}>
            <Card.Title title={card.user.name} left={LeftContent}  />
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
                <View style={{flexDirection :'row',flexWrap: "wrap",}}>
                    <View style={{flexDirection : 'row' , justifyContent : 'space-around',}}>
                        <FontAwesome name="heart"  size={18} color={'grey'} style={{ marginTop : 5 ,marginRight : 10}}/>
                        <FontAwesome name="comment"  size={18} color={'grey'} style={{ marginTop : 5 ,marginRight : 10}}/>
                        <FontAwesome name="share"  size={18} color={'grey'} style={{ marginTop : 5 ,marginRight : 10}}/>
                    </View>
                    <View style={{alignContent : 'flex-end'}}>
                        <FontAwesome name="flag"  size={18} color={'grey'} style={{ marginTop : 5 ,marginRight : 10 ,alignItems : 'flex-end'}}/>
                    </View>
                </View>
            </Card.Actions>
        </Card>
    )
};


export default CardCompo;

const styles = StyleSheet.create({
    container : {
      marginBottom : 20,
        // flex : 1
        flex: 1,

    },
    avatar : {
        width : 30,
        height : 30,
        borderRadius : 50,
    },
    textArea : {
        paddingLeft : 18
    },
    name : {
        fontWeight : 'bold',
        fontSize : 18,
        marginBottom :8
    },
});