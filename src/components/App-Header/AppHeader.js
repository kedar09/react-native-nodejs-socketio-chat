import React from 'react';
import {View} from 'react-native';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

function AppHeader(props) {
  return (
    <View>
      <Header
        backgroundColor="#0F0326"
        placement="left"
        leftComponent={
          props.leftIconMenu ? (
            <Ionicons name="arrow-back" color="#ffffff" size={16} />
          ) : null
        }
        centerComponent={{
          text: props.headerTitle,
          style: {color: '#ffffff', fontSize: 16},
        }}
        rightComponent={props.rightComponent}
      />
    </View>
  );
}

export default AppHeader;
