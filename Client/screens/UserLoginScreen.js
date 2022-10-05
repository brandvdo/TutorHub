/*

    User Login Screen

*/

import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

const UserLoginScreen = () =>{

    const [flexDirection, setflexDirection] = useState("column");

    return(
        <View style={[styles.container, {     
            flexDirection: "column"
          }]}>
            <View style ={styles.container}/>
            <Image 
                source={require('../assets/TutorHub.png')}
                style={{alignSelf: 'center', width:120, height:120}}
            ></Image>
            <Text style ={styles.headline}>Welcome to TutorHub</Text>
            <Layout 
            label = "Login"
            values = {["Email", "Password"]}
            selectedValue = {flexDirection}
            setSelectedValue = {setflexDirection}
            ></Layout>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#05998c',
        marginBottom: 50,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
    headline: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
        color:'white'
    },

    background:{
        flex: 1,
        padding: 10,
        backgroundColor: "white"
    },

    selectedLabel: {
        color: "white",
    },

    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },

    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
      },
});

const Layout = ({
    values,
    selectedValue,
    label,
    children,
}) => (
        <View style={styles.background}>
            <View style={styles.row}>
                {values.map((value) => (
                    <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedValue(value)}
                    style={[
                        styles.button,
                        selectedValue === value && styles.selected,
                    ]}
                    >
                    <Text
                        style={[
                        styles.buttonLabel,
                        selectedValue === value && styles.selectedLabel,
                        ]}
                    >
                        {value}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
                <View style={[styles.container, { [label]: selectedValue }]}>
                {children}
            </View>
        </View>
)

export default UserLoginScreen;