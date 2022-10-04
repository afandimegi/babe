import React from 'react';
import {Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './home/index';
import NewArticle from './newarticle/index';
import Profile from './profile/index';
import Settings from './settings/index';

let AppNavigator = TabNavigator(
  {
    Beranda: {screen: Home},
    'Tulis Artikel': {screen: NewArticle},
    Profil: {screen: Profile},
    Pengaturan: {screen: Settings}
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Beranda') {
          iconName = `home`;
        } else if (routeName === 'Tulis Artikel') {
          iconName = `create`;
        } else if (routeName === 'Profil') {
          iconName = `person`;
        } else if (routeName === 'Pengaturan') {
          iconName = `settings`;
        }
        return <Icon name={iconName} size={24} color={tintColor} />;
      },
      tabBarVisible: navigation.state.routeName == 'Tulis Artikel' ? false : true
    }),
    tabBarOptions: {
      pressColor: 'red',
      activeTintColor: '#9C27B0',
      inactiveTintColor: 'grey',
      style: {
        elevation: 8,
      },
      labelStyle: {
        marginBottom: 4,
        marginTop: -4,
      }
    },
    lazy: true,
    initialRouteName: 'Beranda',
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default class Main extends React.Component {
  render(){
    return(
      <AppNavigator/>
    )
  }
}
