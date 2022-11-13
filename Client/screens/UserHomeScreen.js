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

const UserHomeScreen = () => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //TODO fix api request
    const fetchData = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        console.log(userToken)
        const resp = await fetch("http://70.177.34.147:3000/api/home/newsFeed/messages", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': userToken,
            },
        })
        const data = await resp.json();
        console.log(data);
        setData(data);
        setLoading(false);
    };

    useEffect(() => {
    fetchData();
    const dataInterval = setInterval(() => fetchData(), 10 * 1000);
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
                <MainFeed/>
            </View>
        </View>
    );

}

export default UserHomeScreen;