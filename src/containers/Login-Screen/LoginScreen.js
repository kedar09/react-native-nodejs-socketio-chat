import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
// import AppHeader from '../../components/App-Header/AppHeader';
import {Card} from 'react-native-elements';
import MyTextInput from '../../components/My-TextInput/MyTextInput';
import MyButton from '../../components/My-Button/MyButton';
import styles from './login-screen.css';
import {SOCKET} from '../../config/config';
// import {API_URL} from '../../config/config';
import 'react-native-get-random-values';
import {useIsFocused} from '@react-navigation/native';

const LoginScreen = (props) => {
  const isFocused = useIsFocused();
  const [values, setValues] = useState({});

  const handleChange = (name) => (text) => {
    setValues({...values, [name]: text});
  };

  useEffect(() => {
    return () => {
      setValues({});
    };
  }, [isFocused]);

  const handleLogin = () => {
    if (values.roomName === '') {
      Alert.alert('Room Name is required');
    } else {
      if (values.userName === '') {
        Alert.alert('UserName is required');
      } else {
        
        SOCKET.connect();
        SOCKET.emit('joinGroup', {
          username: values.userName,
          room: values.roomName,
        });
        props.navigation.navigate('chat', {
          username: values.userName,
          room: values.roomName,
        });
      }
    }
  };

  return (
    <View style={styles.loginScreenContainer}>
      {/* <AppHeader headerTitle="Login" /> */}
      <Card containerStyle={styles.loginCardContainer}>
        <Card.Title>React Native NodeJS Socket.IO Example</Card.Title>
        <Card.Divider />
        <View>
          <MyTextInput
            placeholder="Enter Room Name"
            style={styles.textInput}
            value={values.roomName}
            onChangeText={handleChange('roomName')}
          />
          <MyTextInput
            placeholder="Enter Username"
            style={styles.textInput}
            value={values.userName}
            onChangeText={handleChange('userName')}
          />
          <MyButton
            title="Login"
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
      </Card>
    </View>
  );
};

export default LoginScreen;
