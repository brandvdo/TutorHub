/*

  Author: Tyler & Brandon

  This is the main screen with chat feed 

*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Text, Image,TouchableOpacity, FlatList} from "react-native";
import SearchBar from './features/SearchBar/SearchBar';
import * as SecureStore from 'expo-secure-store';
const jwtDecode = require('jwt-decode');

const styles = StyleSheet.create({
    homeHeader: {
        _paddingTop: 40,
        get paddingTop() {
            return this._paddingTop;
        },
        set paddingTop(value) {
            this._paddingTop = value;
        },
        backgroundColor: '#05998c',
    },
    profilePic:{
        marginTop: 20,
        width: 30,
        height: 30,
        borderRadius: '50%',
    },
    flatListStyle:{
        width: 400,
        top: 10,
        height: 650,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
    },
});

/*

    TODO Create post item CSS

*/

const Post = ({message, userName, tags}) => (
    <View>
        <View style={{borderBottomColor: "rgb(5, 153, 140)", borderBottomWidth: 4, marginLeft: 5, marginRight: 5, paddingBottom: 5}}>
        <Image
            source={require('../assets/images/user-profile-icon-free-vector.webp')}
            style={[styles.profilePic]}>
        </Image>
        <Text>Name: {userName}</Text>
        <Text>Message: {message}</Text>
        <Text>Tags: {tags}</Text>
        </View>
    </View>
);

const UserHomeScreen = () => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //Render post item
    const renderItem = ({item}) => <Post 
        message={item.message}
        userName={item.userName}
        tags={item.tags}
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

    return (
        <View>
            <View style={styles.homeHeader}>
                <SearchBar/>
            </View>
                <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    top: 730,
                    right: 20,
                    height: 70,
                    backgroundColor: '#05998c',
                    borderRadius: 100,
                }}
                onPress={() => { '' }}
                >
                    <Text style={{ color: "white" }}>Post</Text>
                </TouchableOpacity>
            <View style={styles.flatListStyle}>
                <FlatList
                        data={data}
                        keyExtractor={item => item._id}
                        renderItem={renderItem}
                    />
            </View>
        </View>
    );
}

export default UserHomeScreen;