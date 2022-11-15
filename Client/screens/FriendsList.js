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
    flatListStyle:{
        width: 400,
        top: 10,
        height: 680,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
    },
});

const Post = ({friends}) => (
    <View>
        <View style={{borderBottomColor: "rgb(5, 153, 140)", borderBottomWidth: 4, marginLeft: 5, marginRight: 5, paddingBottom: 5}}>
        <Text>Friends: {friends}</Text>
        </View>
    </View>
);

const FriendsList = ({navigation}) =>{

    const [data, setData] = useState([]);

    //Render post item
    const renderItem = ({item}) => <Post 
        friends={item.friends}
        />;

    const fetchUserInfo = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        const decodedToken = jwtDecode(userToken);
        const resp = await fetch("http://70.177.34.147:3000/api/home/newsFeed/messages/"+decodedToken._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': userToken,
            },
        })
        const data = await resp.json();
        console.log(data)
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

    return(
        <View>
            <View style={styles.Header}>
                <View style={styles.buttonBio}>
                    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                        <Text style={{fontWeight: 'bold'}}>Messages</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            <View style={styles.flatListStyle}>
                <FlatList
                        data={data}
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                    />
            </View>
            </View>
        </View>
    );

}

export default FriendsList;