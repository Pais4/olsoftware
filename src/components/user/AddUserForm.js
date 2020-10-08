import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { isEmpty, map } from "lodash";
import { Input, Button, Avatar } from 'react-native-elements';
import uuid from 'random-uuid-v4';
import { useNavigation } from "@react-navigation/native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { size } from 'lodash';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import'firebase/firestore';

import { validateEmail } from '../../utils/validations';

const db = firebase.firestore(firebaseApp);

export const AddUserForm = () => {

    const navigation = useNavigation();
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [imageSelectedUri, setimageSelectedUri] = useState([]);

    const uploadImageStorage = async() => {

        const imageBlob = [];

        await Promise.all(
            map(imageSelectedUri, async(image) => {
    
                const response = await fetch(image);
                
                const blob = await response.blob();
    
                const ref = firebase.storage().ref('users').child(uuid());
    
                await ref.put(blob).then(async(result) => {
                    
                    await firebase
                            .storage()
                            .ref(`users/${result.metadata.name}`)
                            .getDownloadURL()
                            .then(photoUrl => {
                                imageBlob.push(photoUrl);
                            })
                })
            })
        )
        return imageBlob;
    }

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

    const onChange = (e, type) => {
        setFormData({
          ...formData,
          [type]: e.nativeEvent.text,
        });
    };

    const onSubmit = () => {

        if (isEmpty(formData.email) || isEmpty(formData.lastName) || isEmpty(formData.age) || isEmpty(formData.position)) {
          return Alert.alert('All fields are required')
        } else if (!validateEmail(formData.email)) {
            return Alert.alert('Invalid email')
        } else {
            setLoading(true)
            uploadImageStorage()
                .then(response => {
                    db.collection('users')
                        .add({
                            name: formData.lastName,
                            email: formData.email,
                            age: formData.age,
                            position: formData.position,
                            image: response,
                            createAt: new Date()
                        })
                        .then(() => {
                            setLoading(false)
                            setFormData(initialState)
                            setimageSelectedUri([])
                            navigation.navigate('users')
                        })
                        .catch(() => {
                            setLoading(false)
                            Alert.alert('Error')
                        })
                })
        }

    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.avatarView}>
                <Avatar
                    size="xlarge"
                    rounded
                    onPress={imageSelected}
                    source={
                        (size(imageSelectedUri) > 0)
                            ?  {uri: imageSelectedUri[0]}
                            :  require('../../../assets/no-image.png')
                    }
                />
            </View>
            <Input
                placeholder="Email"
                containerStyle={styles.inputForm}
                value={formData.email}
                onChange={(e) => onChange(e, "email")}
            />
            <Input
                placeholder="Last Name"
                containerStyle={styles.inputForm}
                value={formData.lastName}
                onChange={(e) => onChange(e, "lastName")}
            />
            <Input
                placeholder="Age"
                containerStyle={styles.inputForm}
                value={formData.age}
                onChange={(e) => onChange(e, "age")}
            />
            <Input
                placeholder="Position"
                containerStyle={styles.inputForm}
                value={formData.position}
                onChange={(e) => onChange(e, "position")}
            />
            <Button
                title="Create"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnCreate}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    );
}

const initialState = {
    image: '',
    email: '',
    lastName: '',
    age: '',
    position: '',
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40
    },
    avatarView: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    btnContainer: {
      marginTop: 20,
      width: '100%'
    },
    btnCreate: {
      backgroundColor: "#F05C3C",
      width: '100%'
    },
    inputForm: {
      marginTop: 10,
    },
  });