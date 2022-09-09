import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Header = () => {

    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Tutor Hub</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f2f2f2f2',
        padding: 15
    },
    headerTitle: {
        margin: 40,
        textAlign: 'center',
        fontSize: 20
    }
});

export default Header;