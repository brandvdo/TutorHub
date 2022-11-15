/*

Author: Tyler

This is for testing only remove later

*/
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';

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
});

const PostScreen = ({navigation}) =>{
    return(
        <View>
            <View style={styles.Header}>
            <View style={styles.buttonBio}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={{fontWeight: 'bold'}}>Back To Home</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View>
            </View>
        </View>
    );

}

export default PostScreen;