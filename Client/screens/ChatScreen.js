/*

This is for testing only remove later

*/
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
    Header: {
        paddingTop: 50,
        backgroundColor: '#05998c',
    }
});

const ChatScreen = () =>{
    return(
        <View>
            <View style={styles.Header}/>
            <View>
                <Text>
                    test
                </Text>
            </View>
        </View>
    );

}

export default ChatScreen;