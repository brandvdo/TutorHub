/*

  Author: Tyler

  This is the main screen with chat feed 

*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Text, Function } from "react-native";
import SearchBar from './features/SearchBar/SearchBar';
import MainFeed from './mainFeed/MainFeed';
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
    }
});

const Item = ({message, userID, tags}) => (
    <View>
        <Text>UserID: {userID}</Text>
        <Text>Message: {message}</Text>
        <Text>Tags: {tags}</Text>
    </View>
);

const UserHomeScreen = () => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const renderItem = ({item}) => <Item 
        message={item.message}
        userID={item.userID}
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
        setData(data[0]);
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
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                    
                />
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                />
                <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    top: 590,
                    right: 20,
                    height: 70,
                    backgroundColor: '#05998c',
                    borderRadius: 100,
                }}
                onPress={() => { '' }}
            >
                <Text style={{ color: "white" }}>Post</Text>
            </TouchableOpacity>
            </View>
        </View>
    );

}

export default UserHomeScreen;