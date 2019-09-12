import React from 'react';
import { Icon } from 'react-native-elements';

export const LoginIcon = (props) => {
  return (
    <Icon
      type='material-community'
      name='login'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.disabled ? 'grey'  : props.color ||'green'}
      containerStyle={[props.containerStyle, { alignSelf: 'center', paddingRight: 10 }]}
    />
  );
}

export const VerifyIcon = (props) => {
  return (
    <Icon
      type='antdesign'
      name='checksquareo'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.color || 'green'}
      containerStyle={[props.containerStyle, { alignSelf: 'center', paddingRight: 10 }]}
    />
  );
}


export const NextIcon = (props) => {
  return (
    <Icon
      type='antdesign'
      name='rightcircleo'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.color || 'green'}
      containerStyle={[props.containerStyle, { alignSelf: 'center', paddingRight: 10 }]}
    />
  );
}

export const InformationIcon = (props) => {
  return (
    <Icon
      type='font-awesome'
      name='info-circle'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.color || 'green'}
      containerStyle={[props.containerStyle, { alignSelf: 'center' }]}
    />
  );
}

export const SaveIcon = (props) => {
  return (
    <Icon
      type='font-awesome'
      name='cloud-upload'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.disabled ? 'grey' : props.color || 'green'}
      containerStyle={[props.containerStyle, { alignSelf: 'center' }]}
    />
  );
}

export const SignOutIcon = (props) => {
  return (
    <Icon
      type='font-awesome'
      name='sign-out'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.disabled ? 'grey' : props.color || 'red'}
      containerStyle={[props.containerStyle, { alignSelf: 'center' }]}
    />
  );
}

export const FilterIcon = (props) => {
  return (
    <Icon
      type='font-awesome'
      name='filter'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.disabled ? 'green' : props.color || 'red'}
      containerStyle={[props.containerStyle, { alignSelf: 'center', paddingLeft: 5 }]}
    />
  );
}
export const CashIcon = (props) => {
  return (
    <Icon
      type='font-awesome'
      name='money'
      onPress={props.onPress || null}
      size={props.size || 33}
      color={props.disabled ? 'green' : props.color || 'red'}
      containerStyle={[props.containerStyle, { alignSelf: 'center', paddingLeft: 5 }]}
    />
  );
}
