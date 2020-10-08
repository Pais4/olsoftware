import React from 'react';
import { StyleSheet, View, ScrollView, Image } from "react-native";

import { LoginForm } from '../components/account/LoginForm';

export const LoginScreen = () => {
    return (
        <ScrollView centerContent={true}>
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Image 
                        source={require('../../assets/descarga.png')}
                    />
                </View>
                <View style={styles.input}>
                    <LoginForm />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center'
    },
    input: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
})

