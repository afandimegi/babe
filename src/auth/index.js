import React from 'react';
import { Text, View, Image } from 'react-native';
import { observer }  from 'mobx-react';
import Store from './../../store/Store';
import FBSDK from 'react-native-fbsdk';
import Meteor, { connectMeteor } from 'react-native-meteor';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import css from './index.style';

const {
  LoginButton,
  AccessToken
} = FBSDK;

@connectMeteor
@observer
export default class Auth extends React.Component {
  getMeteorData() {
    return {
      users: Meteor.collection('users'),
    };
  }

  saveToDB(arg) {
    let { users } = this.data;
    users.insert({
      '_id': arg.id, 
      'name': arg.name, 
      'email': arg.email,
      'description': 'Tell your self to the world in here',
      'followers': [],
      'following': [], 
      'image': arg.image, 
      'loginWith': arg.loginWith
    });
  }

  _signIn(){
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.signIn()
      .then(currentUser => {
        // console.log(currentUser);
        let data = {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.photo,
          loginWith: 'google'
        }
        this.saveToDB(data)
        Store.updateUser(data)
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    })
  }

  componentDidMount(){
    GoogleSignin.configure({})
    .then(() => {
      console.log('configured')
    })
  }

  render() {
    return (
      <View style={css.container}>
        <Image
          resizeMode="cover"
          style={css.icon}
          source={require('./../../static/icons/icon.png')}/>
        <Text style={css.loginText}>Silakan masuk untuk melanjutkan aktivitas</Text>
        <GoogleSigninButton
          style={css.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn.bind(this)}/>
        <Text style={css.splitText}>ATAU</Text>
        <LoginButton
          style={css.fbButton}
          readPermissions={["email", "user_friends", "public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    fetch('https://graph.facebook.com/v2.11/me?fields=name,email,picture.type(large)&access_token=' + data.accessToken.toString())
                    .then((response) => response.json())
                    .then((user) => {
                      let data = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.picture.data.url,
                        loginWith: 'facebook'
                      }
                      this.saveToDB(data)
                      Store.updateUser(data)
                    })
                    .catch(() => {
                      console.log('ERROR GETTING DATA FROM FACEBOOK')
                    })
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            Store.resetUser()
          }} />
      </View>
    );
  }
}
