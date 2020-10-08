import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export const UserDetailForm = (props) => {

    const navigation = useNavigation();
    const { id } = props;
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
         db.collection('users')
            .doc(id)
            .get()
            .then((response) => {
                const data = response.data();
                data.id = response.id;
                setUser(data);
                setFormData(data)
            })
    }, []);

    const onChange = (e, type) => {
        setFormData({
          ...formData,
          [type]: e.nativeEvent.text,
        });
    };

    const removeUser = () => {
        db.collection('users')
            .doc(id)
            .delete()
            .then(() => {
                navigation.navigate('user')
            })
            .catch(() => {
                console.log('error');
            })
    }

    const updateUser = () => {
        db.collection('users')
            .doc(id)
            .update({
                name: formData.name,
                email: formData.email,
                position: formData.position,
                age: formData.age,
            })
            .then(() => {
                navigation.goBack();
            })
    }
    
    console.log(formData);

    return (
        <View style={styles.formContainer}>
            {
                (!user)
                    ? (
                        <View style={styles.loadUsers}>
                            <ActivityIndicator size='large'/>
                            <Text>Cargando usuarios</Text>
                        </View>
                    )
                    : (
                        <View style={styles.formContainer}>
                            <View style={styles.avatarView}>
                                    <Avatar
                                        size="xlarge"
                                        rounded
                                        source={{ uri: user.image[0] }}
                                    />
                                <Text style={styles.nameTag}>{user.position}</Text>
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
                                value={formData.name}
                                onChange={(e) => onChange(e, "name")}
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
                                title="Update"
                                containerStyle={styles.btnContainer}
                                buttonStyle={styles.btnUpdate}
                                onPress={updateUser}
                            />
                            <Button
                                title="Delete"
                                type="outline"
                                containerStyle={styles.btnContainer}
                                buttonStyle={styles.btnDelete}
                                onPress={removeUser}
                            />
                        </View>
                    )
            }
        </View>
    );
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
    nameTag: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
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
    btnUpdate: {
      backgroundColor: "#F05C3C",
      width: '100%'
    },
    btnDelete: {
      width: '100%'
    },
    inputForm: {
      marginTop: 10,
    },
    loadUsers: {
        marginTop: 10,
        alignItems: 'center'
    },
  });