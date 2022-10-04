import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { observer }  from 'mobx-react';
import Meteor, { connectMeteor } from 'react-native-meteor';
import Store from './../../store/Store';
import Method from './../../store/Method';
import { Button } from 'react-native-material-ui';
import css from './index.style';
import Auth from './../auth/index';
import WebViewAutoHeight from './../components/webview/WebViewAutoHeight';

@connectMeteor
@observer
export default class Profile extends React.Component {
  constructor(){
    super()
    this.state = {
      user: {
        followers: [],
        following: []
      },
      post: [],
      description: '',
      bg: require('./../../static/images/default_bg.png')
    }
  }

  getMeteorData() {
    return {
      users: Meteor.collection('users'),
      articles: Meteor.collection('articles'),
    };
  }

  likeArticle(id) {
    alert(id)
  }


  render() {
    let { users, articles } = this.data;
    let currentUser = users.findOne({"_id": {$regex : `.*${Store.Users.id}.*`}});
    let userArticle = articles.find({uid: {$regex : `.*${Store.Users.id}.*`, $options: 'i'}}, { limit: 10 })
    return (
      <ScrollView style={css.container}>
        {
          Store.Users.loginWith != '' ? (
          <View>
            <Image
              source={this.state.bg}
              resizeMode="cover"
              style={css.backgroundImage}/>
            <View style={css.photoProfileContainer}>
              <View style={css.photoCircle}>
                <Image
                source={{uri: Store.Users.image}}
                resizeMode="cover"
                style={css.photo}/>
              </View>
            </View>
            <View style={css.generalContainer}>
              <Text style={css.name}>{Store.Users.name}</Text>
              <Text style={css.email}>{Store.Users.email}</Text>
              <Text style={css.bio}>{currentUser.description}</Text>
              <View style={css.containerStat}>
                <View style={css.containerSubStat}>
                  <View style={css.subStat}>
                    <Text style={css.numberStat}>{userArticle.length < 1 ? '-' : userArticle.length}</Text>
                    <Text style={css.textStat}>Post</Text>
                  </View>
                  <View style={css.subStat}>
                    <Text style={css.numberStat}>{currentUser.followers.length < 1 ? '-' : currentUser.followers.length}</Text>
                    <Text style={css.textStat}>Pengikut</Text>
                  </View>
                  <View style={css.subStat}>
                    <Text style={css.numberStat}>{currentUser.following.length < 1 ? '-' : currentUser.following.length}</Text>
                    <Text style={css.textStat}>Mengikuti</Text>
                  </View>
                </View>
              </View>
            </View>
            {userArticle.map((item, i) => {
              return (
                <View style={css.subGeneralContainer}>
                  <Text>{item.title}</Text>
                  <View style={css.webContainer}>
                    <WebViewAutoHeight
                      javaScriptEnabled
                      source={{html: Method.detailContainer(item.content)}}
                      style={css.isi}
                    />
                  </View>
                  <View style={{backgroundColor: 'red', marginTop: 30}}>
                    <Button 
                      primary
                      style={{container:{padding: 25, borderTopWidth: 1, borderTopColor: 'lightgrey' ,backgroundColor: 'white'}}}
                      icon={this.state.isLike ? 'favorite' : 'favorite-border'}
                      onPress={this.likeArticle.bind(this, Store.DetailLink)} 
                      text={"like "+item.like.length} />
                  </View>
                </View>
              )
            })}
          </View>
          ) : ( <Auth /> )
        }
      </ScrollView>
    );
  }
}
