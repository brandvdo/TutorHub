/*

Author: Tyler

This is for testing only remove later

*/
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const jwtDecode = require('jwt-decode');

const styles = StyleSheet.create({
    Header: {
        paddingTop: 50,
        backgroundColor: '#05998c',
    },
    buttonBio:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    nameStyle:{
        fontWeight: 'bold',
        fontSize: '20px',
        alignSelf: 'left',
        alignSelf: 'center',
        top: 10
    },
    flatListStyle:{
        width: 400,
        top: 20,
        height: 700,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#e0e0e0'
    },
});

const FriendsList = ({navigation}) =>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //Render post item
    const renderItem = ({item}) => <Post 
        friends={item}
        />;

    const fetchUserInfo = async (id) => {
        const userToken = await SecureStore.getItemAsync("token");
        const decodedToken = jwtDecode(userToken);
        if(id == null){
            id = decodedToken._id;
        }
        const resp = await fetch("http://70.177.34.147:3000/api/users/getUserFriendsList/"+id, {
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
        fetchUserInfo();
        const dataInterval = setInterval(() => fetchUserInfo(), 10 * 1000);
        return () => clearInterval(dataInterval);
      }, []);

      function goToProfile(id){
        SecureStore.setItemAsync("profileID",id);
        navigation.navigate('UserProfile')
      }

      const Post = ({friends}) => (
        <View>
            <TouchableOpacity onPress={() => goToProfile(friends[1])}>
                <View style={{borderBottomColor: "rgb(5, 153, 140)", borderBottomWidth: 4, paddingBottom: 5, paddingTop: 10, paddingLeft: 5, paddingRight: 5}}>
                    <Text style={{fontSize: 17}}>{friends[0]}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return(
        <View>
            <View style={styles.Header}>
                <View style={styles.buttonBio}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                        <Text style={{fontWeight: 'bold'}}>Back To Chat</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            <View>
            <Text style={styles.nameStyle}>Friend's List</Text>
            <View style={styles.flatListStyle}>
                <FlatList
                        data={data}
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                />
                </View>
            </View>
            </View>
        </View>
    );

}

export default FriendsList;