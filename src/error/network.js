import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Network extends React.Component {
  render() {
    return(
      <View style={css.container}>
        <Icon name="wifi" size={170} color="rgba(0,0,0,.1)" />
        <Text style={css.h1}>NETWORK ERROR</Text>
        <Text style={css.h2}>swipe down to</Text>
        <Text style={css.h2}>try again</Text>
      </View>
    )
  }
}

const css = {
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height - 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    opacity: 0.35,
    fontSize: 15,
    marginBottom: 10,
  },
  h2: {
    opacity: 0.35,
    fontSize: 15
  }
}
