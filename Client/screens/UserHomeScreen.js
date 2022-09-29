/*

    May rename, but this will be the home screen of the app after login

*/

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const UserHomeScreen = () =>{
    return(
        <View style={styles.homeContainer}>
            <Text style={styles.headline}>TutorHub</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    homeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        backgroundColor: '#05998c',
      },

    headline: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        height: 80,
        textAlign: 'center',
        paddingTop: 30,
    },
});

export default UserHomeScreen;