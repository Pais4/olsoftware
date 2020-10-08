import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { UserDetailForm } from '../components/user/UserDetailForm';

export const UserDetailScreen = (props) => {

    const { route } = props;
    const { id } = route.params;

    return (
        <ScrollView centerContent={true}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <UserDetailForm id={id}/>
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