/*

  Author: Tyler

  This is the main screen with chat feed 

*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Text, Function } from "react-native";
import SearchBar from './features/SearchBar/SearchBar';
import MainFeed from './mainFeed/MainFeed';

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
    const [fakeData, setFakeData] = useState();

    // get data from the fake api endpoint
    useEffect(() => {
        const getData = async () => {
            const apiResponse = await fetch(
                "http://70.177.34.147:3000/api/getUserInfo/"
            );
            const data = await apiResponse.json();
            setFakeData(data);
        };
        getData();
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