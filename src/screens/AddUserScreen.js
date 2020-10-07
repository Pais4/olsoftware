import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { AddUserForm } from '../components/user/AddUserForm';

export const AddUserScreen = () => {
    return (
        <ScrollView centerContent={true}>
            <View style={styles.container}>
                <View style={styles.avatarView}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
                </View>
                <View style={styles.form}>
                    <AddUserForm />
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
    avatarView: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    }
})
