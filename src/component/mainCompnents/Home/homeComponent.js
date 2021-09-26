import React, {useEffect, useState} from 'react';
import cardData from "../../../../cardData";
import {StyleSheet ,View ,FlatList} from 'react-native';

import CardComponent from "../../cardComponent/cardComponent";
import firestore from '@react-native-firebase/firestore';

const Home = () => {

    const [cardsData ,setCardData]=useState([]);

    useEffect( () => {
      getPosts().then(r => setCardData(r));

    });

    const getPosts = async () => {
        console.log(cardData);
        return  await firestore().collection('Users').get();

    };

    return(
        <View style={styles.container}>
            <FlatList
                data={cardData}
                renderItem={ ( {item} ) => <CardComponent card={item}/>}
                inverted
            />
        </View>
    )
};

export default Home;

const  styles =  StyleSheet.create({
   container  : {
       flex : 1 ,
       justifyContent : 'center',
       alignItems : 'center',
       backgroundColor : 'grey'
   }
});

