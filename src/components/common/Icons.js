import React from 'react';
import { Icon } from 'react-native-elements';

export default LoginIcon = (props) => {
  return (
    <Icon
      type='material-community'
      name='login'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.color || 'green'}
      containerStyle={[props.containerStyle, { alignSelf: 'center', paddingRight: 10 }]}
    />
  );
}