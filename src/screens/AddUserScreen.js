import React from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

import { AddUserForm } from '../components/user/AddUserForm';

export const AddUserScreen = () => {

    return (
        <ScrollView centerContent={true}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <AddUserForm/>
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
    form: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    }
})
