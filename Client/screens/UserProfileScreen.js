/*

    User Profile Screen

*/

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const jwtDecode = require('jwt-decode');
let userToken = ""
async function getToken() {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      userToken = result;
    } else {
      console.log("Key " + key + "not found");
    }
}

getToken();

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#05998c',
        padding: 10,
    },
    image:{
        alignSelf: 'flex-start',
        width: 120,
        height: 120,
        marignLeft:180,
        marginTop: 40,
    },
    profilePic:{
        alignSelf: 'flex-end',
        marginLeft: 60,
        width: 120,
        height: 120,

    },
    row:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button:{
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        alignSelf: "flex-end",
        marginRight: 45,
        marginTop: 10,
        textAlign: "center",
    },
    buttonLabel:{
        fontSize: 12,
        color: "black",
    }
});

const UserProfileScreen = () =>{

    const [name, setName] = useState('');
    const [token, setToken] = useState(userToken);
    let decodedToken = jwtDecode(userToken);
    console.log(decodedToken._id);
    return(
        <View style={[styles.container]}>
            <View style={styles.row}>
            <Image 
                source={require('../assets/TutorHub.png')}
                style={[styles.image]}>
            </Image>
            <Image 
                source={require('../assets/images/user-profile-icon-free-vector.webp')}
                style={[styles.profilePic]}>
            </Image>
            </View>
            <TouchableOpacity 
                style={[styles.button]}>

                <Text style={[styles.buttonLabel]}> Choose your profile pic                   
                </Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <Text></Text>
            </View>
        </View>
    );

}

export default UserProfileScreen;