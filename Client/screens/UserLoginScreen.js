/*

    User Login Screen

*/

import React from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';

const UserLoginScreen = () =>{
    return(
        <View style={styles.container}>
            <Text style={styles.headline}>User Login Screen</Text>
            <Image 
            source={require('../assets/TutorHub.png')}
            style={{width:110, height:110}}
            ></Image>
            <TextInput style={styles.login}>lsu email</TextInput> 
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#05998c',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 0,
        width: 200,
        height: 80,
        textAlign: 'center',
        paddingTop: 30,
        color:'white'
    },
    login:{
        fontWeight:'bold',
        fontSize: 22,
        width: 200,
        height: 80
    }
});

export default UserLoginScreen;