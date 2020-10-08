import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { isEmpty, map } from "lodash";
import { Input, Button } from 'react-native-elements';
import uuid from 'random-uuid-v4';
import { useNavigation } from "@react-navigation/native";

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import'firebase/firestore';

import { validateEmail } from '../../utils/validations';

const db = firebase.firestore(firebaseApp);

export const AddUserForm = (props) => {

    const { imageSelectedUri } = props;

    const navigation = useNavigation();
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

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

    const onChange = (e, type) => {
        setFormData({
          ...formData,
          [type]: e.nativeEvent.text,
        });
    };

    const onSubmit = () => {

        console.log(formData);

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
            <Input
                placeholder="Email"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
            />
            <Input
                placeholder="Last Name"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "lastName")}
            />
            <Input
                placeholder="Age"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "age")}
            />
            <Input
                placeholder="Position"
                containerStyle={styles.inputForm}
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