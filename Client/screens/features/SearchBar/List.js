/*

  Author: Tyler

  Search Bar for main screen

*/

import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
} from "react-native";

const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        height: "10%",
        width: "100%",
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
});

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
    </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
    const renderItem = ({ item }) => {
        // when no input, show all
        if (searchPhrase === "") {
            return <Item name={item.fullName}/>;
        }
        // filter of the name
        if (item.fullName.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.fullName} />;
        } 
    };

    return (
        <SafeAreaView style={styles.list__container}>
            <View
                onStartShouldSetResponder={() => {
                    setClicked(false);
                }}
            >
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </SafeAreaView>
    );
};

export default List;
