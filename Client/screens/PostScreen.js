/*

Author: Tyler

This is for testing only remove later

*/
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';

const styles = StyleSheet.create({
    Header: {
        paddingTop: 50,
        backgroundColor: '#05998c',
    },
    buttonCancel:{
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'left',
        marginLeft: 5,
        height: 40,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListStyle:{
        width: 400,
        top: 20,
        height: 200,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#e0e0e0'
    },
    flatListStyle2:{
        width: 400,
        top: 30,
        height: 50,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#e0e0e0'
    },
});

const PostScreen = ({navigation}) =>{

    const [makePost, setMakePost] = useState('');
    const [addTag, setAddTag] = useState('');
    const [clicked, setClicked] = useState(false);

    return(
        <View>
            <View style={styles.Header}>
            <View style={styles.buttonCancel}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={{fontWeight: 'bold'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
                    borderRadius: 30,
                }}
                onPress={() => ''}
                >
                    <Text style={{fontWeight: 'bold' }}>Post</Text>
                </TouchableOpacity>
            </View>
            <View>
            <View style={styles.flatListStyle}>
                <TextInput
                    autoFocus
                    multiline
                    style={{fontSize: 20, marginLeft: 5, paddingTop: 5}}
                    placeholder="What do you need help with?"
                    placeholderTextColor="#111111"
                    onChangeText={(makePost) => setMakePost(makePost)} />
            </View>
            <View style={styles.flatListStyle2}>
                <TextInput
                    style={{fontSize: 20, marginLeft: 5, paddingTop: 5}}
                    placeholder="Add subject tag"
                    placeholderTextColor="#111111"
                    onChangeText={(addTag) => setAddTag(addTag)} />
            </View>
            </View>
        </View>
    );

}

export default PostScreen;