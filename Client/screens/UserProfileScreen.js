/*

    User Profile Screen

*/
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const jwtDecode = require('jwt-decode');

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

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    /*
        Take in the stored token and request the user information of the current user.
        Note that data is an object that contains all the user information

        Example: data.fullName 
    */
    const fetchData = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        const decodedToken = jwtDecode(userToken);
        const resp = await fetch("http://70.177.34.147:3000/api/users/getUserInfo/"+decodedToken._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': userToken,
            },
        })
        const data = await resp.json();
        setData(data);
        setLoading(false);
      };

      /*
        Used to update information
      */
      useEffect(() => {
        fetchData();
        const dataInterval = setInterval(() => fetchData(), 10 * 1000);
        return () => clearInterval(dataInterval);
      }, []);

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
                <Text>{data.fullName}</Text>
            </View>
        </View>
    );

}

export default UserProfileScreen;