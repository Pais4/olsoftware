import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { validateEmail } from '../../utils/validations';

export const RegisterForm = () => {

    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: ''
    });

    const onChange = (e, type) => {
        setFormData({
          ...formData,
          [type]: e.nativeEvent.text,
        });
    };

    const onSubmit = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
          return console.log('Vacio');
        }
    
        if (!validateEmail(formData.email)) {
            return console.log('email invalido');
        }

      };

    return (
        <View style={styles.formContainer}>
            
                <Input
                    placeholder="Full Name"
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "fullName")}
                    leftIcon={
                        <Icon
                            type="font-awesome-5"
                            name="user"
                            iconStyle={styles.iconStyle}
                        />
                    }
                />
                <Input
                    placeholder="Email"
                    containerStyle={styles.inputForm}
                    onChange={(e) => onChange(e, "email")}
                    leftIcon={
                    <Icon
                        type="font-awesome-5"
                        name="envelope"
                        iconStyle={styles.iconStyle}
                    />
                    }
                />
                <Input
                    placeholder="Password"
                    containerStyle={styles.inputForm}
                    secureTextEntry={showPassword}
                    onChange={(e) => onChange(e, "password")}
                    leftIcon={
                    <Icon
                        type="font-awesome-5"
                        name="lock"
                        iconStyle={styles.iconStyle}
                    />
                    }
                    rightIcon={
                    <Icon
                        type="material-community"
                        name="lock"
                        name={!showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconStyle}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                    }
                />
                <Input
                    placeholder="Repeat Password"
                    containerStyle={styles.inputForm}
                    secureTextEntry={showPassword}
                    onChange={(e) => onChange(e, "password")}
                    leftIcon={
                    <Icon
                        type="font-awesome-5"
                        name="lock"
                        iconStyle={styles.iconStyle}
                    />
                    }
                    rightIcon={
                    <Icon
                        type="material-community"
                        name="lock"
                        name={!showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconStyle}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                    }
                />
                <Button
                    title="Sign Up"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnLogin}
                    onPress={onSubmit}
                />
            
        </View>
    )
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
    btnLogin: {
      backgroundColor: "#F05C3C",
      width: '100%'
    },
    btnRegister: {
      marginTop: 10,
      color: "#F05C3C",
      width: '100%'
    },
    iconStyle: {
      color: "#c1c1c1",
    },
    inputForm: {
      marginTop: 10,
    },
  });