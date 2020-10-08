import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { size } from 'lodash';
import { useNavigation } from '@react-navigation/native';

export const ListUsers = (props) => {

    const navigation = useNavigation();
    const { users } = props;

    return (
        <View>
            {
                (size(users) > 0)
                    ? (
                        <FlatList 
                            data={users}
                            renderItem={(user) => <User user={user} navigation={navigation}/>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
                    : (
                        <View style={styles.loadUsers}>
                            <ActivityIndicator size='large'/>
                            <Text>Cargando usuarios</Text>
                        </View>
                    )
            }
        </View>
    )
}

const User = (props) => {

    const {user, navigation} = props;
    const { image, name, position, id } = user.item;
    const userImage = image[0];

    const goUserScreen = () => {
        navigation.navigate('userDetail', {
            id,
            name
        });
    }

    return(
        <TouchableOpacity onPress={goUserScreen}>
            <View style={styles.viewUser}>
                <View style={styles.userImage}>
                    <Avatar
                        size="medium"
                        rounded
                        source={
                            userImage
                                ? { uri: userImage }
                                : require('../../../assets/no-image.png')
                        }
                    />
                </View>
                <View>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userPosition}>{position}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loadUsers: {
        marginTop: 10,
        alignItems: 'center'
    },
    viewUser: {
        flexDirection: 'row',
        margin: 10
    },
    userImage: {
        marginRight: 15
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    userPosition: {
        fontSize: 15,
        color: 'gray'
    }
})
