import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { observer }  from 'mobx-react';
import Realm from 'realm';
import Store from './../../store/Store';
import Set from './../../store/Set';
import { COLOR, ThemeProvider, Toolbar, Button, Icon, RadioButton } from 'react-native-material-ui';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import css from './index.style';

const {
  LoginButton,
  AccessToken
} = FBSDK;

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
export default class Settings extends React.Component {
  logout() {
    if (Store.Users.loginWith == 'google') {
      this._signOutGoogle()
    } else if (Store.Users.loginWith == 'facebook') {
      this._signOutFB()
    } else {
      alert('you not already login')
    }
  }

  _signOutGoogle(){
    GoogleSignin.signOut()
    .then(() => {
      Store.resetUser()
      alert('Anda telah keluar')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  _signOutFB(){
    LoginManager.logOut()
    Store.resetUser()
    alert('Anda telah keluar')
  }

  showAbout(){
    alert('lorem ipsum dolor sit amet')
  }

  setNotif(){
    Set.Notif = !Set.Notif
  }

  componentDidMount(){
    GoogleSignin.configure({})
    .then(() => {
      // console.log('configured')
    })
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={css.container}>
          <Toolbar
            centerElement={<Text style={css.toolbar}>Pengaturan</Text>}
            style={{container: {backgroundColor: '#9C27B0', elevation: 8}}}
          />
          <View style={css.row}>
            <TouchableOpacity style={css.item} onPress={this.setNotif.bind(this)}>
              <Icon style={{paddingHorizontal: 10}} name={Set.Notif ? "notifications-active" : "notifications-off"}/>
              <Text>Notifikasi</Text>
            </TouchableOpacity>
            <Text style={{marginRight: 10}}>{ Set.Notif ? 'Aktif' : 'Tidak Aktif' }</Text>
          </View>
          <View style={css.row}>
            <TouchableOpacity style={css.item}>
              <Icon style={{paddingHorizontal: 10}} name="format-size"/>
              <Text>Ukuran Text</Text>
            </TouchableOpacity>
            <Text style={css.textLable}>{ 'besar' }</Text>
          </View>
          <View style={css.row}>
            <TouchableOpacity style={css.item} onPress={this.showAbout.bind(this)}>
              <Icon style={{paddingHorizontal: 10}} name="stay-primary-portrait"/>
              <Text>Tentang aplikasi</Text>
            </TouchableOpacity>
          </View>
          <View style={[css.row, Store.Users.loginWith == '' ? {display: 'none'} : null]}>
            <TouchableOpacity style={css.item} onPress={this.logout.bind(this)}>
              <Icon style={{paddingHorizontal: 10}} name="exit-to-app"/>
              <Text>Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}
