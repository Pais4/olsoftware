import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';


export const UserDetailForm = () => {
    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Email"
                containerStyle={styles.inputForm}
                //onChange={(e) => onChange(e, "email")}
            />
            <Input
                placeholder="Last Name"
                containerStyle={styles.inputForm}
                //onChange={(e) => onChange(e, "email")}
            />
            <Input
                placeholder="Age"
                containerStyle={styles.inputForm}
                //onChange={(e) => onChange(e, "email")}
            />
            <Input
                placeholder="Position"
                containerStyle={styles.inputForm}
                //onChange={(e) => onChange(e, "email")}
            />
            <Button
                title="Update"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnUpdate}
                //onPress={onSubmit}
            />
            <Button
                title="Delete"
                type="outline"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnDelete}
                //onPress={onSubmit}
            />
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
  });