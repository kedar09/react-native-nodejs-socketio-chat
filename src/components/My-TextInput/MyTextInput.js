import React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import styles from './my-textinput.css';

const MyTextInput = (props) => {
  return (
    <View style={styles.viewInput}>
      <Input
        placeholder={props.placeholder}
        errorStyle={props.errorStyle}
        onChangeText={props.onChangeText}
        errorMessage={props.errorMessage}
        value={props.value}
        onBlur={props.onBlur}
      />
    </View>
  );
};

export default MyTextInput;
