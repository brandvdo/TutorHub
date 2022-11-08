/*

    User Profile Screen

*/

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
    Header: {
        paddingTop: 50,
        backgroundColor: '#05998c',
    }
});

const UserProfileScreen = () =>{
    return(
        <View>
            <View style={styles.Header}/>
            <View>
                <Text>
                    
                </Text>
            </View>
        </View>
    );

}

export default UserProfileScreen;