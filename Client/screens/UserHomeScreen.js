/*

  Author: Tyler

  This is the main screen with chat feed 

*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Text } from "react-native";
import AppNavigator from '../navigation/AppNavigator';
import List from './features/SearchBar/List';
import SearchBar from './features/SearchBar/SearchBar';


const styles = StyleSheet.create({
    homeHeader: {
        paddingTop: 40,
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
                <Text>testing</Text>
            </View>
        </View>
    );

}

export default UserHomeScreen;