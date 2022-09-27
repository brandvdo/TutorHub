import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const Header = () => {

    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome to TutorHub
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#179296',
        padding: 15
    },
    headerTitle: {
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        textAlign: 'center',
        fontSize: 20
    },
});

export default Header;