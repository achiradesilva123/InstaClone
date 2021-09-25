import React from 'react';
import {StyleSheet ,View ,FlatList} from 'react-native';


import cardData from "../../../../cardData";

import CardComponent from "../../cardComponent/cardComponent";

const Home = () => {
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

