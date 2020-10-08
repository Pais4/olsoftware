import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { AddUserForm } from '../components/user/AddUserForm';
import { size } from 'lodash';

export const AddUserScreen = () => {

    const [imageSelectedUri, setimageSelectedUri] = useState([]);

    const imageSelected = async () => {
        
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if(resultPermissions === 'denied'){
            Alert.alert('Permissions denied')
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })

            if(result.cancelled){
                Alert.alert("You haven´t pick an image")
            } else {
                setimageSelectedUri([result.uri])
            }
        }
    }


    return (
        <ScrollView centerContent={true}>
            <View style={styles.container}>
                <View style={styles.avatarView}>
                <Avatar
                    size="xlarge"
                    rounded
                    onPress={imageSelected}
                    source={
                        (size(imageSelectedUri) > 0)
                            ?  {uri: imageSelectedUri[0]}
                            :  require('../../assets/no-image.png')
                    }
                />
                </View>
                <View style={styles.form}>
                    <AddUserForm imageSelectedUri={imageSelectedUri}/>
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
