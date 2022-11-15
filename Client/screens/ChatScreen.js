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
        height: 640,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#e0e0e0'
       
    },
});

const ChatScreen = ({navigation}) =>{
    return(
        <View>
            <View style={styles.Header}>
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    top: 60,
                    right: 20,
                    height: 40,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 100,
                }}
                onPress={() => navigation.navigate('FriendsList')}
                > 
                <Text style={{fontWeight: 'bold' }}>Chat</Text>
                </TouchableOpacity>
            <View style={styles.buttonBio}>
                <TouchableOpacity onPress={() => navigation.navigate('FriendsList')}>
                    <Text style={{fontWeight: 'bold'}}>View Friend's List</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View >
            <Text style={styles.nameStyle}>Messages</Text>
            </View>
            <View style={styles.flatListStyle}>
                    
                </View>
        </View>
    );

}

export default ChatScreen;