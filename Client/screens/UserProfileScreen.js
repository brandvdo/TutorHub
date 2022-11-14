/*

    Author: Logan & Tyler

    User Profile Screen

*/
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const jwtDecode = require('jwt-decode');

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
    },
    Header:{
        paddingBottom: 10,
        backgroundColor: '#05998c',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    image:{
        alignSelf: 'flex-start',
        width: 120,
        height: 120,
        marignLeft:180,
        marginTop: 40,
    },
    profilePic:{
        marginTop: 50,
        width: 120,
        height: 120,
        borderRadius: '50%',

    },
    row:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    button:{
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonBio:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        alignSelf: 'center',
    },
    nameStyle:{
        fontWeight: 'bold',
        fontSize: '25px',
        color: "#e0e0e0",
        marginTop: 10,
        alignSelf: 'center',
    },
    box:{
        paddingHorizontal: 40,
        paddingVertical: 20,
        marginTop: 10,
        backgroundColor: "#e0e0e0",
        alignSelf: 'center',
    },
    buttonLabel:{
        fontSize: 12,
        color: "black",
    },
    mainFeed:{
        fontSize: 20,
        color: "black",
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    }
});

const UserProfileScreen = ({navigation}) =>{

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

      const fetchUserMessages = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        const decodedToken = jwtDecode(userToken);
        const resp = await fetch("http://70.177.34.147:3000/api/userpost/getMessages/"+decodedToken._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': userToken,
            },
        })
        const data = await resp.json();
        console.log("Message: " + data[0][0]._id)
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

      useEffect(() => {
        fetchUserMessages();
          const dataInterval = setInterval(() => fetchUserMessages(), 10 * 1000);
          return () => clearInterval(dataInterval);
      }, []);

    return (
        <View>
            <View style={[styles.Header]}>
                <View>
                    <View style={styles.row}>
                        <Image
                            source={require('../assets/images/user-profile-icon-free-vector.webp')}
                            style={[styles.profilePic]}>
                        </Image>
                    </View>
                </View>
                <View>
                    <Text style={styles.nameStyle}>{data.fullName}</Text>
                </View>
                <View style={styles.buttonBio}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                        <Text>Message</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonBio}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditUserProfile')}>
                        <Text>Edit profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.mainFeed}>
                    {data.message}
                </Text>
            </View>
        </View>
    );

}

export default UserProfileScreen;