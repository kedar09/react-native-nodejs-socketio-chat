import {ToastAndroid} from 'react-native';

const ToastMessage = (props) => {
  ToastAndroid.showWithGravity(
    props.toastMessage,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
};

export default ToastMessage;
