/*

Author: Brandon & Tyler

    This uses React and Expo to create a navigation bar allowing users to go to the different screens in the screens folder

*/

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import UserHomeScreen from '../screens/UserHomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CreateUserScreen from '../screens/CreateUserScreen';

const Tab = createBottomTabNavigator();

const style =StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

/*
TODO: change navbar color to match header 
*/

const AppNavigator = () => {
    return(
            <Tab.Navigator 
                screenOptions={{
                    tabBarShowLabel: false, 
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 30,
                        left: 40,
                        right: 40,
                        borderRadius: 35,
                        height: '9%',
                        backgroundColor: '#05998c',
                        elevation: 50,
                        borderTopWidth: 0, 
                        }
                    
            }}
        >
                <Tab.Screen name="Home" component={UserHomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image
                                    source={require('../assets/home.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                                />
                                <Text
                                    style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                                    Home
                                </Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen name="AddUser" component={CreateUserScreen}
                     options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image
                                    source={require('../assets/comment-alt.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                                />
                                <Text
                                    style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                                    Chat
                                </Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen name="UserProfile" component={UserProfileScreen}
                     options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                <Image
                                    source={require('../assets/user.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                                />
                                <Text
                                    style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                                    Profile
                                </Text>
                            </View>
                        )
                    }}
                />
        </Tab.Navigator>
    );
}

export default AppNavigator;