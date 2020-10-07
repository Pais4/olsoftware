import React from 'react';
import { StyleSheet, View } from 'react-native';

import { RegisterForm } from '../components/account/RegisterForm';

export const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <RegisterForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
})
