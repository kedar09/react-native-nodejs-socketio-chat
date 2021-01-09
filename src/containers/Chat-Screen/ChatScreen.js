import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {TouchableOpacity} from 'react-native';
import AppHeader from '../../components/App-Header/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './chat-screen.css';
import {SOCKET} from '../../config/config';
import {Text} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    SOCKET.on('message', (data) => {
      console.log(data[0].user._id);

      if (props.route.params.userId !== data[0].user._id) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, data),
        );
      }
    });
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    SOCKET.emit('chatMessage', messages);
  }, []);

  const renderInputToolbar = (props) => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainerStyle}
          textInputProps={{
            style: {
              color: '#000000',
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 20,
            },
            multiline: true,
            returnKeyType: 'go',
            onSubmitEditing: () => {
              if (props.text && props.onSend) {
                let text = props.text;
                props.onSend({text: text.trim()}, true);
              }
            },
          }}
        />
        {/* <TouchableOpacity style={styles.inputToolbarTouchableOpacity}>
          <Ionicons
            name="add-circle-outline"
            style={styles.inputToolbarIcon}
            size={32}
          />
        </TouchableOpacity> */}
      </>
    );
  };

  const renderSend = (props) => {
    return (
      <>
        <Send {...props}>
          <Ionicons name="send" size={28} style={styles.sendIcon} />
        </Send>
      </>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#A2E8DD',
            borderColor: '#000000',
          },
          left: {
            backgroundColor: '#E5D9FC',
          },
        }}
      />
    );
  };

  const leftFromGroup = () => {
    SOCKET.disconnect();
    props.navigation.navigate('login');
  };

  return (
    <>
      <AppHeader
        headerTitle={props.route.params.room}
        rightComponent={
          <AntDesign
            name="logout"
            size={16}
            color="#ffffff"
            onPress={() => {
              leftFromGroup();
            }}
          />
        }
      />
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderAvatar={null}
        renderUsernameOnMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: props.route.params.userId,
          name: props.route.params.username,
        }}
      />
    </>
  );
};

export default ChatScreen;
