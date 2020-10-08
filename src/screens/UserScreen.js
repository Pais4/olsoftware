import React, { useState, useCallback } from 'react';
import { Input } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';

import { ListUsers } from '../components/user/ListUsers';
import { View } from 'react-native';

const db = firebase.firestore(firebaseApp);

export const UserScreen = () => {

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useFocusEffect(
        useCallback(() => {
            db.collection('users')
            .get()
            .then((snap) => {
                setTotalUsers(snap.size)
            });

            const resultUser = [];

            db.collection('users')
                .orderBy('createAt', 'desc')
                .get()
                .then((response) => {
                    response.forEach((doc) => {
                        const userInfo = doc.data();
                        userInfo.id = doc.id;
                        resultUser.push(userInfo)
                    })
                    setUsers(resultUser);
                })
        }, [])
    );

    return (
        <View>
            <Input
                placeholder='Search'
                leftIcon={{ type: 'material-community', name: 'magnify' }}
            />
            <ListUsers users={users}/>
        </View>
    )
}
