import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import { UserDetailForm } from '../components/user/UserDetailForm';

export const UserDetailScreen = () => {
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
                <Text style={styles.nameTag}>CARGO</Text>
                </View>
                <View style={styles.form}>
                    <UserDetailForm />
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
    nameTag: {
        fontSize: 20,
        marginTop: 10
    },
    form: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    }
})