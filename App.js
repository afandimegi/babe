import React, { Component } from 'react';
import { View, StatusBar, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { observer }  from 'mobx-react';
import Main from './src/main';
import Search from './src/search/index';
import Store from './store/Store';
import Meteor from 'react-native-meteor';
import OneSignal from 'react-native-onesignal';
import DetailNews from './src/detailnews/index';
import Auth from './src/auth/index';

//ws:ipaddress:3000
Meteor.connect(Store.Root.nodejs()+'/websocket');

const uiTheme = {
    palette: {
        primaryColor: COLOR.purple500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

@observer
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount(){
    Store.connectToRealm();
    Store.Route = this.props.navigation
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' backgroundColor='#7B1FA2'/>
          <View style={{flex: 1}}>
            <Main />
            { Store.isSearchActive ? <Search /> : null }
          </View>
        </View>
      </ThemeProvider>
    );
  }
}


export default StackNavigator(
  {
    App: {
      screen: App,
    },
    DetailNews: {
      screen: DetailNews
    },
    Auth: {
      screen: Auth
    }
  },
  {
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        return CardStackStyleInterpolator.forHorizontal(sceneProps);
      }
    }),
    navigationOptions: {
      header: null
    },
  }
);
